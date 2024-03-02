import dayjs from 'dayjs'
import {
  IS_IOS,
  IPHONE_MEDIUM,
  ANDROID_MEDIUM,
  getFormattedString,
} from '../../utils'

export const getTitle = (): string => {
  const timeNow = dayjs().format('HH')

  if (timeNow >= '6' && timeNow < '12') return 'Доброе утро'
  if (timeNow >= '12' && timeNow < '18') return 'Добрый день'
  if (timeNow >= '18' && timeNow < '24') return 'Добрый вечер'
  if (timeNow >= '0' && timeNow < '6') return 'Доброй ночи'

  return ''
}

export const getButtonTitle = (flatValue: string): string => {
  if (!flatValue || flatValue === '1') return 'Забронировать помещение'

  return `Забронировать ${flatValue} ${getFormattedString(+flatValue, [
    'помещение',
    'помещения',
    'помещений',
  ])}`
}

export const getContainerPaddingBottom = (): number => {
  if (IS_IOS) {
    if (IPHONE_MEDIUM) {
      return 16
    } else {
      return 0
    }
  } else {
    if (ANDROID_MEDIUM) {
      return 24
    } else {
      return 0
    }
  }
}
