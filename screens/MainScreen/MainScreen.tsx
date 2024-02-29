import React, { FC } from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../../styles'
import { IS_IOS } from '../../utils'
import { RoomForm, Header } from './components'

export interface IFormInputs {
  firstName: string
  secondName: string
  email: string
  phone: string
  roomCount: string
}

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
  padding-horizontal: 16px;
`
const DisclaimerContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`
const DisclaimerText = styled.Text`
  font-size: 12px;
  color: #8f9094;
`

export const MainScreen: FC = () => {
  const onSubmit = (data: IFormInputs) => {
    console.log(data)
  }

  return (
    <Container color='white'>
      <Header />

      <StyledKeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <RoomForm onSubmit={onSubmit} />
          <DisclaimerContainer>
            <DisclaimerText>
              Это дисклеймер, который есть во всех формах
            </DisclaimerText>
          </DisclaimerContainer>
        </ScrollView>
      </StyledKeyboardAvoidingView>
    </Container>
  )
}
