import React, { FC, useEffect, useCallback, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import styled from 'styled-components/native'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { Loader } from '../../components'
import { RootState, setSlidersList, setFlatOrder } from '../../services'
import { Container } from '../../styles'
import {
  IS_IOS,
  SLIDERS_GET_URL,
  FLAT_DATA_POST_URL,
  palette,
} from '../../utils'
import { FlatForm, Header } from './components'
import { getContainerPaddingBottom } from './utils'

export interface IFormInputs {
  firstName: string
  lastName: string
  email: string
  phone: string
  flatsCount: string
}

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
  padding-horizontal: 16px;
`
const DisclaimerContainer = styled.View`
  align-items: center;
  justify-content: center;
`
const DisclaimerText = styled.Text`
  font-size: 12px;
  color: ${palette.GREY};
`
const CUSTOM_CONTAINER_STYLE = `padding-top: ${IS_IOS ? '56px' : '24px'}`

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
        Alert.alert('Ваша заявка отправлена')
      }
    } catch (error) {
      Alert.alert('Ошибка.', 'Попробуйте позже')
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
    <Container color={palette.WHITE} customStyle={CUSTOM_CONTAINER_STYLE}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <StyledSafeAreaView>
            <StyledKeyboardAvoidingView
              behavior={IS_IOS ? 'padding' : 'height'}
            >
              <ScrollView
                automaticallyAdjustKeyboardInsets
                contentContainerStyle={{
                  paddingBottom: getContainerPaddingBottom(),
                }}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
              >
                <FlatForm isSending={isSending} onSubmit={onSubmit} />
                <DisclaimerContainer>
                  <DisclaimerText>
                    Это дисклеймер, который есть во всех формах
                  </DisclaimerText>
                </DisclaimerContainer>
              </ScrollView>
            </StyledKeyboardAvoidingView>
          </StyledSafeAreaView>
        </>
      )}
    </Container>
  )
}
