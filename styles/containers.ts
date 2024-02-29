import styled from 'styled-components/native'

export const Container = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${({ color }) => (color ? color : 'transparent')};
`
