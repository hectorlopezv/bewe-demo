import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import createBearSlice, { BearSlice } from "./globalslice";
import createFishSlice, { FishSlice } from "./profile";

const useBoundStore = create<BearSlice & FishSlice>()(
  devtools(
    immer((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }))
  )
);
export { useBoundStore };
