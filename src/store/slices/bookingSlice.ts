import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
    id: string;
    date: Date;
    time: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    service: string;
    notes?: string;
  }



  interface BookingState {
    step: number;
    selectedDate: Date | null;
    selectedTime: string;
    appointment: Appointment | null;
  }
  
const initialState: BookingState = {
  step: 1,
  selectedDate: null,
  selectedTime: '',
  appointment: null,
};
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    incrementStep: (state)=>{
      state.step = state.step + 1
    },
    decrementStep: (state)=>{
      state.step = state.step - 1
    },
    setSelectedDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    setAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointment = action.payload;
    },
    resetBooking: (state) => {
      state.step = 1;
      state.selectedDate = null;
      state.selectedTime = '';
      state.appointment = null;
    },
  },
});
export const {
    setStep,
    incrementStep,
    decrementStep,
    setSelectedDate,
    setSelectedTime,
    setAppointment,
    resetBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;