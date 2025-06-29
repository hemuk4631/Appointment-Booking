import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface User {
  id: string;
  name: string;
  username: Date;
  role: string;
  email: string;
}
const initialState: User = {
  id: null,
  name: null,
  username: null,
  email: null,
  role: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return initialState;
    },
  },
});
export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;