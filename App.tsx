import React, { FC, createRef } from 'react'
import { StatusBar, Platform } from 'react-native'
import { NavigationContainerRef } from '@react-navigation/native'
import { Portal } from 'react-native-paper'
import { Routes } from './navigation'

const navigationRef = createRef<NavigationContainerRef<IRootStackList>>()

export const App: FC = () => (
  <Portal.Host>
    {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
    <Routes navigationRef={navigationRef} />
  </Portal.Host>
)
