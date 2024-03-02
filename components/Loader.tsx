import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../styles'
import { palette } from '../utils'

const LoaderContainer = styled(Container)`
  justify-content: center;
`

export const Loader: React.FC = () => (
  <LoaderContainer>
    <ActivityIndicator animating={true} color={palette.ORANGE} size='large' />
  </LoaderContainer>
)
