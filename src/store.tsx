import { create } from "zustand";
import Player from "./classes/Player";
import Deck from "./classes/Deck";

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

interface TargetStore {
  targetPlayer: Player;
  setTargetPlayer: (newPlayer: Player) => void;
}

export const useTargetStore = create<TargetStore>((set) => {
  return {
    targetPlayer: new Player(-1, "<Please Select Player>", new Deck()),
    setTargetPlayer: (player: Player) => set({ targetPlayer: player })
  };
});

interface TurnStore {
  turnIndex: number;
  subTurnIndex: number;
  incrementTurn: () => void;
  incrementSubTurn: () => void;
}

export const useTurnStore = create<TurnStore>((set) => {
  return {
    turnIndex: 0,
    subTurnIndex: 0,
    incrementTurn: () => set((state: TurnStore) => ({turnIndex: state.turnIndex + 1})),
    incrementSubTurn: () => set((state: TurnStore) => ({subTurnIndex: state.subTurnIndex + 1}))
  }
})