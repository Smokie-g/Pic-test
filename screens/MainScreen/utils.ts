import dayjs from 'dayjs'

export const getTitle = () => {
  const timeNow = dayjs().format('HH')
  if (timeNow >= '6' && timeNow < '12') return 'Доброе утро'
  if (timeNow >= '12' && timeNow < '18') return 'Добрый день'
  if (timeNow >= '18' && timeNow < '24') return 'Добрый вечер'
  if (timeNow >= '0' && timeNow < '6') return 'Доброй ночи"'
}
