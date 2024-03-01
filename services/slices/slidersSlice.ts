import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  sliders: [] as ISlider[],
}

export const slidersSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSlidersList: (state, action: PayloadAction<ISlider[]>) => {
      const newSliderArr = state.sliders.concat(action.payload)

      return {
        ...state,
        sliders: newSliderArr.filter(
          (slider, index) => newSliderArr.indexOf(slider) === index,
        ),
      }
    },
  },
})

export const { setSlidersList } = slidersSlice.actions
