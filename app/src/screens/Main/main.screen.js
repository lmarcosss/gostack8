import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Image, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { logo, like, dislike } from '../../assets'

import { DevService } from '../../services'

import style from './main.style'
import { TouchableOpacity } from 'react-native-gesture-handler';

export function MainScreen({ navigation }) {
  const loggedUser = navigation.getParam('user')
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {

      const data = await DevService.getDevs(loggedUser)

      setUsers(data)
    }

    loadUsers()
  }, [loggedUser])


  async function handleLike() {
    const [{ _id }, ...rest] = users
    debugger
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



  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={style.logo} source={logo} />
      </TouchableOpacity>
      <View style={style.cardContainer}>
        {users.length > 0 ? renderCards() : <Text style={style.empty}>Acabou :(</Text>}
      </View>

      <View style={style.actionsContainer}>
        <TouchableOpacity onPress={handleDislike} style={style.button}>
          <Image source={dislike} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike} style={style.button}>
          <Image source={like} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
