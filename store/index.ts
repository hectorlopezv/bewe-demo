import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createGlobalSlice, { GlobalSlice } from "./globalslice";
import createUserSlice, { UserSlice } from "./user";

const useStoreZ = create<GlobalSlice & UserSlice>()(
  devtools(
    immer((...a) => ({
      ...createGlobalSlice(...a),
      ...createUserSlice(...a),
    }))
  )
);
export { useStoreZ };
