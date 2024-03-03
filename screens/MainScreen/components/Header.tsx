import React, { FC } from 'react'
import styled from 'styled-components/native'
import { MEDIUM_DEVICE } from '../../../utils'
import { getTitle } from '../utils'

const DESCRIPTION = 'Для бронирования помещений\nзаполните форму'

const HeaderWrapper = styled.View`
  margin-top: ${MEDIUM_DEVICE ? '8px' : '16px'};
`
const TextWrapper = styled.View`
  gap: ${MEDIUM_DEVICE ? '8px' : '16px'};
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
      <BaseText>{DESCRIPTION}</BaseText>
    </TextWrapper>
  </HeaderWrapper>
)
