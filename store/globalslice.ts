import { StateCreator } from "zustand";
export type Link = {
  name: string;
  url: string;
};
export interface GlobalSlice {
  isAuth: boolean;
  updateAuth: (isAuth: boolean) => void;
  addLink: (link: Link) => void;
  links: Link[];
  deleteLink: (url: string) => void;
}
const createBearSlice: StateCreator<GlobalSlice, [], [], GlobalSlice> = (
  set,
  get
) => ({
  links: [],
  isAuth: false,
  deleteLink: (url: string) =>
    set({ links: [...get().links].filter((link) => link.url !== url) }),
  updateAuth: (isAuth) => set({ isAuth }),
  addLink: (link) => set({ links: [...get().links, link] }),
});

export default createBearSlice;
