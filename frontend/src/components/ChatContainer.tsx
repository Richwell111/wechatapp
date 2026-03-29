import { IoLogoWechat } from "react-icons/io5"
import { useChatStore } from "../store/useChatStore"

const ChatContainer = () => {
  const {selectedUser}=useChatStore()
  if(selectedUser){
    return(
      <p>User selected</p>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <IoLogoWechat size={60} className="text-violet-700"/>
      <p className="text-lg font-medium text-white">Select a user to start chatting</p>
    </div>
  )
}

export default ChatContainer