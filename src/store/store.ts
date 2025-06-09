import { configureStore } from '@reduxjs/toolkit';
import  bookingReducer  from './slices/bookingSlice';
export const store = configureStore({
  reducer: { booking: bookingReducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['booking/setSelectedDate', 'booking/setAppointment'],
        ignoredPaths: ['booking.selectedDate', 'booking.appointment'],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;