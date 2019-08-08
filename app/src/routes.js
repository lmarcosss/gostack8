import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { LoginScreen, MainScreen } from './screens'

export default createAppContainer(
  createSwitchNavigator({
    LoginScreen,
    MainScreen
  })
)