import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import io from 'socket.io-client'

import { logo, like, dislike, itsamatch } from '../../assets'

import { DevService } from '../../services'

import style from './main.style'

export function MainScreen({ navigation }) {
  const loggedUser = navigation.getParam('user')
  const [users, setUsers] = useState([])
  const [matchDev, setMatchDev] = useState(null)

  useEffect(() => {
    async function loadUsers() {

      const data = await DevService.getDevs(loggedUser)

      setUsers(data)
    }

    loadUsers()
  }, [loggedUser])


  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: loggedUser }
    })

    socket.on('match', dev => {
      setMatchDev(dev)
    })

  }, [loggedUser])


  async function handleLike() {
    const [{ _id }, ...rest] = users
    await DevService.likeDev(_id, loggedUser)

    setUsers(rest)
  }

  async function handleDislike() {
    const [{ _id }, ...rest] = users

    await DevService.dislikeDev(_id, loggedUser)

    setUsers(rest)
  }

  async function handleLogout() {
    await AsyncStorage.clear()

    navigation.navigate('LoginScreen')
  }

  function renderCards() {
    return users.map((user, index) => {
      return (
        <View key={user._id} style={[style.card, { zIndex: users.length - index }]}>
          <Image style={style.avatar} source={{ uri: user.avatar }} />
          <View style={style.footer}>
            <Text style={style.name}>
              {user.name}
            </Text>
            <Text style={style.bio} numberOfLines={3}>{user.bio}</Text>
          </View>
        </View>
      )
    })
  }

  function renderActions() {
    return (
      <View style={style.actionsContainer}>
        <TouchableOpacity onPress={handleDislike} style={style.button}>
          <Image source={dislike} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike} style={style.button}>
          <Image source={like} />
        </TouchableOpacity>
      </View>
    )
  }

  function renderMatch() {
    return (
      <View style={style.matchContainer}>
        <Image style={style.matchImage} source={itsamatch} />
        <Image style={style.matchAvatar} source={{ uri: matchDev.avatar }} />
        <Text style={style.matchName} >{matchDev.name}</Text>
        <Text style={style.matchBio} >{matchDev.bio}</Text>
        <TouchableOpacity onPress={() => setMatchDev(null)}>
          <Text style={style.buttonClose}>FECHAR</Text>
        </TouchableOpacity>
      </View>
    )
  }



  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={style.logo} source={logo} />
      </TouchableOpacity>
      <View style={style.cardContainer}>
        {users.length > 0 ? renderCards() : <Text style={style.empty}>Acabou :(</Text>}
      </View>

      {renderActions()}

      {matchDev && renderMatch()}

    </SafeAreaView>
  )
}
