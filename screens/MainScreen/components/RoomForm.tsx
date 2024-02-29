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
  getFormattedString,
} from '../../../utils'
import { IFormInputs } from '../MainScreen'

interface IProps {
  onSubmit(data: IFormInputs): void
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .matches(validation.nameValidation, WRONG_SYMBOLS_MESSAGE)
    .max(32, MAX_SYMBOLS_USER_NAME),
  secondName: yup
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
  roomCount: yup.string().required(REQUIRED_MESSAGE),
})

const InputContainer = styled.View`
  flex: 1;
  margin-top: 16px;
  margin-bottom: 24px;
  gap: 24px;
`

export const RoomForm: FC<IProps> = ({ onSubmit }) => {
  const [roomValue, setRoomValue] = useState<number>(0)

  const buttonTitle = `Забронировать ${roomValue} ${getFormattedString(
    roomValue,
    ['квартиру', 'квартиры', 'квартир'],
  )}`

  const {
    control,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    field: 'firstName' | 'secondName' | 'email' | 'phone' | 'roomCount',
  ) => {
    if (field === 'roomCount') {
      const rooms = e as unknown as number
      setRoomValue(rooms)
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
                errorMessage={errors.firstName}
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
          name='secondName'
          render={({ field }) => {
            const { onChange, onBlur, value } = field

            return (
              <Input
                autoCapitalize='words'
                errorMessage={errors.secondName}
                isValid={!errors.secondName}
                placeholder='Фамилия'
                type='default'
                value={value}
                onBlur={onBlur}
                onChange={e => handleChange(e, onChange, 'secondName')}
                onFocus={() => clearErrors('secondName')}
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
                errorMessage={errors.phone}
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
                errorMessage={errors.email}
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
          name='roomCount'
          render={({ field }) => {
            const { onChange, onBlur, value } = field

            return (
              <Input
                errorMessage={errors.roomCount}
                isValid={!errors.roomCount}
                placeholder='Количество помещений'
                type='roomCount'
                value={value}
                onBlur={onBlur}
                onChange={e => handleChange(e, onChange, 'roomCount')}
                onFocus={() => clearErrors('roomCount')}
              />
            )
          }}
          rules={{ required: true }}
        />
      </InputContainer>
      {Boolean(roomValue) && (
        <Button title={buttonTitle} onPress={handleSubmit(onSubmit)} />
      )}
    </>
  )
}
