import { Platform } from 'react-native'

export const IS_IOS = Platform.OS === 'ios'

export const REQUIRED_MESSAGE = 'Это обязательное поле'
export const WRONG_PHONE = 'Введите корректный номер'
export const WRONG_SYMBOLS_MESSAGE = 'Введены недопустимые символы'
export const MAX_SYMBOLS_USER_NAME =
  'Превышено допустимое количество символов: 32'
export const INCORRECT_EMAIL_MESSAGE = 'Некорректный email'
