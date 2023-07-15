import { StateCreator } from "zustand";

export interface GlobalSlice {
  isAuth: boolean;
  updateAuth: (isAuth: boolean) => void;
}
const createBearSlice: StateCreator<GlobalSlice, [], [], GlobalSlice> = (
  set,
  get
) => ({
  isAuth: false,
  updateAuth: (isAuth) => set({ isAuth }),
});

export default createBearSlice;
