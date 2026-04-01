import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
};

export type Conversation = {
  id: string;
  createdAt: string;
};

export type Message = {
  id:string,
  content:string,
  createdAt:string,
  conversationId:string,
  sender:User
}

interface ChatStore {
  selectedUser: User | null;
  activeConversation: Conversation | null;
  isConversationLoading: boolean;
  messages:Message[];
  isMessagesLoading:boolean

  setSelectedUser: (user: User | null) => void;
  setActiveConversation: (conversation: Conversation | null) => void;
  setConversationLoading: (loading: boolean) => void;
  setMessages:(messages:Message[]) => void;
  setMessagesLoading:(loading:boolean) => void,
  addMessage:(message:Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedUser: null,
  activeConversation: null,
  isConversationLoading: false,
  isMessagesLoading:false,
  messages:[],

  setActiveConversation: (conversation) =>
    set({ activeConversation: conversation }),
  setConversationLoading: (loading) => set({ isConversationLoading: loading }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setMessages:(messages) => set({messages}),
  setMessagesLoading:(loading) => set({isMessagesLoading:loading}),
  addMessage:(message) => set((state) => ({
    messages:[...state.messages,message]
  }))
}));