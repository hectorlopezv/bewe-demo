import { StateCreator } from "zustand";
import { FishSlice } from "./profile";

export interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}
const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
});

export default createBearSlice;
