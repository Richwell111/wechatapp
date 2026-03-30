import { create } from "zustand"

interface EditProfileModalState{
    isOpen:boolean,
    openModal:()=>void,
    closeModal:()=>void,
}

export const useEditProfileModal = create<EditProfileModalState>((set)=>({
    isOpen:false,
    openModal:()=>set({isOpen:true}),
    closeModal:()=>set({isOpen:false}),
}))