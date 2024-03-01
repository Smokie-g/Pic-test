import React, { FC, useEffect, useCallback, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import styled from 'styled-components/native'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { Loader } from '../../components'
import { RootState, setSlidersList, setFlatOrder } from '../../services'
import { Container } from '../../styles'
import { IS_IOS, SLIDERS_GET_URL, FLAT_DATA_POST_URL } from '../../utils'
import { FlatForm, Header } from './components'

export interface IFormInputs {
  firstName: string
  lastName: string
  email: string
  phone: string
  flatsCount: string
}

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
  padding-horizontal: 16px;
`
const DisclaimerContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`
const DisclaimerText = styled.Text`
  font-size: 12px;
  color: #8f9094;
`

export const MainScreen: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)

  const dispatch = useDispatch()

  const sliders = useSelector((state: RootState) => state.sliders.sliders)

  const fetchSlidersData = useCallback(async () => {
    setIsLoading(true)

    try {
      const res = await fetch(SLIDERS_GET_URL)

      const jsonRes = (await res.json()) as ISlider[]

      if (res.status === 200) {
        dispatch(setSlidersList(jsonRes))
      }
    } catch (error) {
      console.error(error)
      // Alert.alert('При загрузке данных произошла ошибка')
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  const sendFlatData = async (flatData: IFlat) => {
    setIsSending(true)

    try {
      const res = await fetch(FLAT_DATA_POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flatData),
      })

      if (res.status === 200) {
        dispatch(setFlatOrder(flatData))
        Alert.alert(
          'Данные успешно отправлены!',
          'В ближайшее время с Вами свяжутся',
        )
      }
    } catch (error) {
      Alert.alert(
        'Во время отправки произошла ошибка',
        'Повторите попытку позже',
      )
    } finally {
      setIsSending(false)
    }
  }

  const onSubmit = (data: IFormInputs) => {
    const { firstName, lastName, email, phone, flatsCount } = data
    const user: User = {
      firstName,
      lastName,
      mail: email,
      phone,
    }
    const order: Order = {
      flatsCount: +flatsCount,
      time: dayjs().format('DD.MM.YYYY.HH:mm'),
    }
    const flatData: IFlat = {
      user,
      order,
    }

    console.log(flatData)

    sendFlatData(flatData)
  }

  useEffect(() => {
    fetchSlidersData()
  }, [fetchSlidersData])

  useEffect(() => {
    console.log(sliders.find(el => el.id === 42))
  }, [sliders])

  return (
    <Container color='white'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <StyledKeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
            <ScrollView keyboardShouldPersistTaps='handled'>
              <FlatForm isSending={isSending} onSubmit={onSubmit} />
              <DisclaimerContainer>
                <DisclaimerText>
                  Это дисклеймер, который есть во всех формах
                </DisclaimerText>
              </DisclaimerContainer>
            </ScrollView>
          </StyledKeyboardAvoidingView>
        </>
      )}
    </Container>
  )
}
