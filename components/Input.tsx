import React, { useState, FC } from 'react'
import {
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import styled from 'styled-components/native'
import { FieldError } from 'react-hook-form'
import TextInputMask from 'react-native-text-input-mask'
import { Container } from '../styles'

interface IInputProps {
  errorMessage?: FieldError
  isValid: boolean
  type: 'default' | 'roomCount' | 'phone'
  onChange(e: NativeSyntheticEvent<TextInputChangeEventData>): void
  onBlur(): void
  onFocus(): void
}

type Props = IInputProps & TextInputProps

const getBorderColor = (errorMessage: boolean) => {
  if (errorMessage) return '#eb5757'

  return '#f7f4f4'
}

const CreateStyledInput = (
  Input: typeof TextInput | typeof TextInputMask,
) => styled<any>(Input)`
  background-color: ${({ isFocused }) => (isFocused ? '#ffffff' : '#f7f4f4')};
  height: 56px;
  padding-left: 16px;
  padding-right: 42px;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${({ errorMessage }) => getBorderColor(errorMessage)};
  font-size: 16px;
`

const StyledInput = CreateStyledInput(TextInput)
const StyledInputMask = CreateStyledInput(TextInputMask)

export const Input: FC<Props> = ({
  errorMessage,
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  type = 'default',
  autoFocus,
  value,
  placeholder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleBlur = () => {
    setIsFocused(false)
    onBlur()
  }

  const handleFocus = () => {
    onFocus && onFocus()
    setIsFocused(true)
  }

  return (
    <Container>
      {type === 'default' && (
        <StyledInput
          errorMessage={Boolean(errorMessage)}
          isFocused={isFocused}
          placeholder={placeholder}
          placeholderTextColor='black'
          value={value}
          onBlur={handleBlur}
          onChangeText={onChange}
          onFocus={handleFocus}
          {...props}
        />
      )}

      {type === 'roomCount' && (
        <StyledInput
          errorMessage={Boolean(errorMessage)}
          isFocused={isFocused}
          keyboardType='number-pad'
          returnKeyType='done'
          placeholder={placeholder}
          placeholderTextColor='black'
          value={value}
          onBlur={handleBlur}
          onChangeText={onChange}
          onFocus={handleFocus}
        />
      )}

      {type === 'phone' && (
        <StyledInputMask
          autocomplete={false}
          autoCompleteType='tel'
          autoCorrect={false}
          autoFocus={autoFocus}
          errorMessage={errorMessage}
          isFocused={isFocused}
          keyboardType='phone-pad'
          mask='+7 ([000]) [000]-[00]-[00]'
          placeholder={isFocused ? undefined : placeholder}
          placeholderTextColor='black'
          returnKeyType='done'
          textContentType='telephoneNumber'
          value={value}
          onBlur={handleBlur}
          onChangeText={(_formatted: any, extracted: any) =>
            onChange(extracted)
          }
          onFocus={handleFocus}
        />
      )}
    </Container>
  )
}

Input.defaultProps = {
  keyboardType: 'default',
  autoCapitalize: 'none',
  autoCorrect: false,
}
