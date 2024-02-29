import React, { FC } from 'react'
import styled from 'styled-components/native'
import { getTitle } from '../utils'

const HeaderWrapper = styled.View`
  padding-top: 16px;
  padding-bottom: 40px;
`
const TextWrapper = styled.View`
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 32px;
`
const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
`
const BaseText = styled.Text`
  font-size: 16px;
  text-align: center;
`

export const Header: FC = () => (
  <HeaderWrapper>
    <TextWrapper>
      <Title>{getTitle()}</Title>
      <BaseText>Для бронирования помещений заполните форму</BaseText>
    </TextWrapper>
  </HeaderWrapper>
)
