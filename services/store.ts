import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { slidersSlice, flatsSlice } from './slices'

export const store = configureStore({
  reducer: {
    sliders: slidersSlice.reducer,
    flats: flatsSlice.reducer,
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
