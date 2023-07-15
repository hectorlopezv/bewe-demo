import { StateCreator } from "zustand";
type User = {
  email: string;
  image: string;
  name: string;
  password: string;
  location: string;
};
export interface UserSlice {
  user: User;
  updateUser: (user: User) => void;
}
const createUserSlice: StateCreator<UserSlice, [], []> = (set, get) => ({
  user: {
    email: "",
    image: "",
    name: "",
    password: "",
    location: "",
  },
  updateUser: (user) => set({ user }),
});
export default createUserSlice;
