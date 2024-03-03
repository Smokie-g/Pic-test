import React, { FC, useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import styled from 'styled-components/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input, Button } from '../../../components'
import {
  REQUIRED_MESSAGE,
  INCORRECT_EMAIL_MESSAGE,
  MAX_SYMBOLS_USER_NAME,
  WRONG_PHONE,
  WRONG_SYMBOLS_MESSAGE,
  validation,
  MEDIUM_DEVICE,
} from '../../../utils'
import { IFormInputs } from '../MainScreen'
import { getButtonTitle } from '../utils'

interface IProps {
  isSending: boolean
  onSubmit(data: IFormInputs): void
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .matches(validation.nameValidation, WRONG_SYMBOLS_MESSAGE)
    .max(32, MAX_SYMBOLS_USER_NAME),
  lastName: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .matches(validation.nameValidation, WRONG_SYMBOLS_MESSAGE)
    .max(32, MAX_SYMBOLS_USER_NAME),
  email: yup
    .string()
    .trim()
    .required(REQUIRED_MESSAGE)
    .test('email', WRONG_SYMBOLS_MESSAGE, value => {
      if (!value) return true

      const wrong = validation.specSymbols.test(value)

      return !wrong
    })
    .email(INCORRECT_EMAIL_MESSAGE),
  phone: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .matches(validation.phoneValidation, WRONG_PHONE)
    .min(10, WRONG_PHONE),
  flatsCount: yup.string().required(REQUIRED_MESSAGE),
})

const InputContainer = styled.View`
  flex: 1;
  margin-top: ${MEDIUM_DEVICE ? '16px' : '56px'};
  margin-bottom: 24px;
  gap: 24px;
`
const ButtonWrapper = styled.View`
  margin-bottom: ${MEDIUM_DEVICE ? '8px' : '16px'};
`

export const FlatForm: FC<IProps> = ({ isSending, onSubmit }) => {
  const [flatValue, setflatValue] = useState<string>('')

  const {
    control,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData> | string,
    onChange: (
      e: NativeSyntheticEvent<TextInputChangeEventData> | string,
    ) => void,
    field: 'firstName' | 'lastName' | 'email' | 'phone' | 'flatsCount',
  ) => {
    if (field === 'flatsCount') {
      setflatValue(e.toString())
    }

    onChange(e)
    clearErrors(field)
  }

  return (
    <>
      <InputContainer>
        <Controller
          control={control}
          name='firstName'
          render={({ field }) => {
            const { onChange, onBlur, value } = field

            return (
              <Input
                autoCapitalize='words'
                errors={errors}
                errorMessage={errors.firstName}
                fieldName='firstName'
                isValid={!errors.firstName}
                placeholder='Ваше имя'
                type='default'
                value={value}
                onBlur={onBlur}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  handleChange(e, onChange, 'firstName')
                }
                onFocus={() => clearErrors('firstName')}
              />
            )
          }}
          rules={{ required: true }}
        />

        <Controller
          control={control}
          name='lastName'
          render={({ field }) => {
            const { onChange, onBlur, value } = field

            return (
              <Input
                autoCapitalize='words'
                errors={errors}
                errorMessage={errors.lastName}
                fieldName='lastName'
                isValid={!errors.lastName}
                placeholder='Фамилия'
                type='default'
                value={value}
                onBlur={onBlur}
                onChange={e => handleChange(e, onChange, 'lastName')}
                onFocus={() => clearErrors('lastName')}
              />
            )
          }}
          rules={{ required: true }}
        />

        <Controller
          control={control}
          name='phone'
          render={({ field }) => {
            const { onChange, onBlur, value } = field

            return (
              <Input
                errors={errors}
                errorMessage={errors.phone}
                fieldName='phone'
                isValid={!errors.phone}
                // isValid={validPhone(value)}
                placeholder='Телефон'
                type='phone'
                value={value}
                onBlur={onBlur}
                onChange={e => handleChange(e, onChange, 'phone')}
                onFocus={() => clearErrors('phone')}
              />
            )
          }}
          rules={{ required: true }}
        />

        <Controller
          control={control}
          name='email'
          render={({ field }) => {
            const { onChange, onBlur, value } = field

            return (
              <Input
                errors={errors}
                errorMessage={errors.email}
                fieldName='email'
                isValid={!errors.email}
                placeholder='E-mail'
                type='default'
                value={value}
                onBlur={onBlur}
                onChange={e => handleChange(e, onChange, 'email')}
                onFocus={() => clearErrors('email')}
              />
            )
          }}
          rules={{ required: true }}
        />

        <Controller
          control={control}
          name='flatsCount'
          render={({ field }) => {
            const { onChange, onBlur, value } = field

            return (
              <Input
                errors={errors}
                errorMessage={errors.flatsCount}
                fieldName='flatsCount'
                isValid={!errors.flatsCount}
                placeholder='Количество помещений'
                type='flatsCount'
                value={value}
                onBlur={onBlur}
                onChange={e => handleChange(e, onChange, 'flatsCount')}
                onFocus={() => clearErrors('flatsCount')}
              />
            )
          }}
          rules={{ required: true }}
        />
      </InputContainer>
      {/* {Boolean(flatValue) && ( */}
      <ButtonWrapper>
        <Button
          disable={isSending}
          isLoading={isSending}
          title={getButtonTitle(flatValue)}
          onPress={handleSubmit(onSubmit)}
        />
      </ButtonWrapper>
      {/* )} */}
    </>
  )
}
