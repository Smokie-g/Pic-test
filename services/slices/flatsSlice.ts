import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  flats: {} as IFlat,
}

export const flatsSlice = createSlice({
  name: 'flat',
  initialState,
  reducers: {
    setFlatOrder: (state, action: PayloadAction<IFlat>) => {
      return {
        ...state,
        flats: action.payload,
      }
    },
  },
})

export const { setFlatOrder } = flatsSlice.actions
