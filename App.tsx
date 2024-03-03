import React, { FC, createRef } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'
import { Portal } from 'react-native-paper'
import { Provider } from 'react-redux'
import { Routes } from './navigation'
import { store } from './services'

const navigationRef = createRef<NavigationContainerRef<IRootStackList>>()

export const App: FC = () => (
  <Provider store={store}>
    <Portal.Host>
      <Routes navigationRef={navigationRef} />
    </Portal.Host>
  </Provider>
)
