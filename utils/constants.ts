import { Platform, Dimensions } from 'react-native'

export const IS_IOS = Platform.OS === 'ios'
export const IS_ANDROID = Platform.OS === 'android'

const { width, height } = Dimensions.get('window')
const screenHeight = Dimensions.get('screen').height

export const FULL_WIDTH = width
export const FULL_HEIGHT = height

export const IPHONE_MEDIUM = IS_IOS && FULL_HEIGHT > 568 && FULL_HEIGHT <= 768
export const ANDROID_MEDIUM = IS_ANDROID && screenHeight <= 768
export const SMALL_ANDROID = IS_ANDROID && FULL_HEIGHT <= 620
export const MEDIUM_DEVICE = IPHONE_MEDIUM || ANDROID_MEDIUM

export const REQUIRED_MESSAGE = 'Это обязательное поле'
export const WRONG_PHONE = 'Введите корректный номер'
export const WRONG_SYMBOLS_MESSAGE = 'Введены недопустимые символы'
export const MAX_SYMBOLS_USER_NAME =
  'Превышено допустимое количество символов: 32'
export const INCORRECT_EMAIL_MESSAGE = 'Некорректный email'

export const SLIDERS_GET_URL =
  'https://api.pik.ru/v2/offer/special?types=1,2&locations=2,3'
export const FLAT_DATA_POST_URL = 'https://strapi.pik.ru/front-tests'
