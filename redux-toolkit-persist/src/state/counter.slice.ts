import { createSlice } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSeletor } from "./_store";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 0,
  },
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

export const useCounter = () => {
  const dispatch = useAppDispatch();
  const state = useAppSeletor((state) => state.counter);
  const actions = {
    increment: () => dispatch(counterSlice.actions.increment()),
    decrement: () => dispatch(counterSlice.actions.decrement()),
  };
  return [state, actions] as [typeof state, typeof actions];
};

export default counterSlice.reducer;
