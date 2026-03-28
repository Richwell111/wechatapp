// client/src/store/authStore.ts
import { create } from "zustand"

interface ChatStore {
  selectedUser: boolean,
  setSelectedUser: () => void,
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedUser: false,

  setSelectedUser: () => set((state) => ({ selectedUser: !state.selectedUser })),
}))