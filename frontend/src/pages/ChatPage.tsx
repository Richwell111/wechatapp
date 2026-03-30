import ChatContainer from "../components/ChatContainer"
import LeftSidebar from "../components/LeftSidebar"
import EditProfileModal from "../components/modals/EditProfileModal"
import RightSidebar from "../components/RightSidebar"
import { useChatStore } from "../store/useChatStore"

const ChatPage = () => {
    const { selectedUser } = useChatStore()
  return (
    <div className="w-full h-screen md:px-[1%] lg:px-[5%] xl:px-[15%] sm:py-[5%] text-white">
        <div className={`border-2 border-gray-600 rounded-2xl backdrop-blur-2xl overflow-hidden h-full grid grid-cols-1 relative ${selectedUser ? "md:grid-cols-[1fr_1.5fr_0fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"}`}>
            {/* left side */}
           <LeftSidebar/>
           {/* chat container */}
           <ChatContainer/>
            {/* right side */}
            <RightSidebar/>
        </div>
        
        <EditProfileModal/>
    </div>
  )
}

export default ChatPage