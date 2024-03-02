import React, { useState, FC } from 'react'
import {
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import styled from 'styled-components/native'
import { FieldError, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import TextInputMask from 'react-native-text-input-mask'
import { Container } from '../../styles'
import { palette } from '../../utils'
import { InputErrorField } from './components'

interface IInputProps {
  errorMessage?: FieldError
  errors: FieldErrors<IInputProps>
  fieldName: string
  isValid: boolean
  type: 'default' | 'flatsCount' | 'phone'
  onChange(e: NativeSyntheticEvent<TextInputChangeEventData> | string): void
  onBlur(): void
  onFocus(): void
}

type Props = IInputProps & TextInputProps

const getBorderColor = (errorMessage: boolean) => {
  if (errorMessage) return palette.ERROR_RED

  return palette.LIGHT_GREY
}

const CreateStyledInput = (
  Input: typeof TextInput | typeof TextInputMask,
) => styled<any>(Input)`
  background-color: ${({ isFocused }) =>
    isFocused ? palette.WHITE : palette.LIGHT_GREY};
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
  errors,
  fieldName,
  type = 'default',
  autoFocus,
  value,
  placeholder,
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
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

      {type === 'flatsCount' && (
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
          onChangeText={(_formatted: string, extracted: string) =>
            onChange(extracted)
          }
          onFocus={handleFocus}
        />
      )}

      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) => <InputErrorField errorMessage={message} />}
      />
    </Container>
  )
}

Input.defaultProps = {
  keyboardType: 'default',
  autoCapitalize: 'none',
  autoCorrect: false,
}
