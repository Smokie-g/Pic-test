import React, { FC } from 'react'
import styled from 'styled-components/native'
import { palette } from '../../../utils'

interface IProps {
  errorMessage: string
}

const Container = styled.View`
  padding-top: 2px;
`
const ErrorText = styled.Text`
  color: ${palette.ERROR_RED};
`

export const InputErrorField: FC<IProps> = ({ errorMessage }) => (
  <Container>
    <ErrorText>{errorMessage}</ErrorText>
  </Container>
)
