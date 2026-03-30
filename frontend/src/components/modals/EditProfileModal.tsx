import { IoClose } from "react-icons/io5"
import { useEditProfileModal } from "../../store/useEditStore"
import AvatarUpload from "../AvatarUpload"
import { useState } from "react"
import { inputStyles } from "../../pages/LoginPage"

const EditProfileModal = () => {
    const {isOpen,closeModal}=useEditProfileModal()
    const [avatarPreview,setAvatarPreview]=useState<string | null>(null)
    
    if(!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={closeModal}/>
        
        {/* modal card */}
        <div className="relative w-full max-w-md bg-[#1e1932] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 to-indigo-500 rounded-t-3xl"></div>
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
              Edit Profile
            </h2>
            <button className="text-gray-400 hover:text-white transition-all hover:rotate-90 duration-300 cursor-pointer p-2 rounded-full hover:bg-white/10" onClick={closeModal}>
              <IoClose size={24}/>
            </button>
          </div>
          
          {/* avatar */}
          <div className="mb-8 flex justify-center">
            <AvatarUpload preview={avatarPreview} onFileSelect={(_file,preview)=>{
              // We could save the file if needed, but for now we only need preview
              setAvatarPreview(preview)
            }}/>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Bio</label>
            <textarea className={`${inputStyles} resize-none h-32 text-sm leading-relaxed`} placeholder="Write something about yourself..."/>
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <button className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 cursor-pointer" onClick={closeModal}>Cancel</button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">Save Changes</button>
          </div>
        </div>
    </div>
  )
}

export default EditProfileModal