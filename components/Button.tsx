import React from 'react'
import styled from 'styled-components/native'

interface IProps {
  title: string
  onPress(): void
}

const ButtonContainer = styled.TouchableOpacity`
  background-color: #f94803;
  height: 56px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`
const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`

export const Button: React.FC<IProps> = ({ title, onPress }) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
)
