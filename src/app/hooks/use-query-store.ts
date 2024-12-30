import { create } from "zustand";

interface QueryState {
  query: string;
  setQuery: (value: string) => void;
}

export const useQueryStore = create<QueryState>((set) => ({
  query: "",
  setQuery: (value) => set({ query: value }),
}));
