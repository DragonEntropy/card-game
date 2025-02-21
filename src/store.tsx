import { create } from "zustand";

interface UpdateStore {
  state: boolean;
  setState: (value: boolean) => void;
}

export const useUpdateStore = create<UpdateStore>((set) => {
  return {
    state: false,
    setState: (value: boolean) => set({ state: value })
  };
});
