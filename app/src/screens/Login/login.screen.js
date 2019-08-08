import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

import { logo } from '../../assets'

import { DevService } from '../../services'

import style from './login.style'

const IS_IOS_DEVICE = Platform.OS === 'ios'

export function LoginScreen({ navigation }) {

  const [user, setUser] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        navigation.navigate('MainScreen', user)
      }
    })
  }, [])

  async function handleLogin() {
    const { _id } = await DevService.createDev(user)

    await AsyncStorage.setItem('user', _id)

    navigation.navigate('MainScreen', { user: _id })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={IS_IOS_DEVICE}
      style={style.container}
    >
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        style={style.input}
        placeholderTextColor="#999"
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity onPress={handleLogin} style={style.button}>
        <Text style={style.buttonText}> Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}
