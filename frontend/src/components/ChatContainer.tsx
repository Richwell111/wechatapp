import { IoLogoWechat } from "react-icons/io5"
import { useChatStore } from "../store/useChatStore"
import { RiArrowLeftLine } from "react-icons/ri"
import { assets, dummyMessages } from "../assets/assets"
import { IoIosSend } from "react-icons/io"

const ChatContainer = () => {
  const {selectedUser}=useChatStore()
  if(selectedUser){
    return(
     <div className="h-full overflow-scroll background-blur-lg relative"> 
     {/* Chat header */}
     <div className="flex items-center gap-3 py-3 max-4 border-b border-stone-500">
      <RiArrowLeftLine size={20} className="cursor-pointer"
      />
      <img src={assets.img1} alt="" className="w-8 h-8 rounded-full object-cover"/>
      <p className="flex-1 flex items-center gap-2 text-lg text-white">Alex Johnson
        <span className="w-2 h-2 rounded-full bg-green-500"/>
      </p>

     </div>
     {/* chat window
      */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {dummyMessages.map((message)=>{
          const isMe=message.senderId==="u1"
          return(
            <div key={message.id} className={`flex items-center gap-2 justify-end ${isMe ? "" : "flex-row-reverse"}`}>
              <p className={`p-2 max-w-50 text-sm font-light rounded-lg mb-8 break-all text-gray-100 ${isMe ? "bg-violet-500/50 text-white rounded-br-none" : "bg-gray-700/50 rounded-bl-none text-gray-100"}`}>{message.content}</p>
              <div className="text-center text-xs">
                <img src={isMe ? assets.img1:assets.img2} alt="" className="h-7 w-7 rounded-full object-cover" />
                <p className="mt-1 text-gray-500">
                  {new Date(message.createdAt).toLocaleTimeString("en-US", {hour:"2-digit",minute:"2-digit",
                    hour12:false
                  })}
                </p>
              </div>
            </div>
          )
        })}
        
      </div>
      {/* chat input */}
      <div className="p-3">
        <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">
          <input type="text" placeholder="Write a message..." className="w-full text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"/>
          <button className="h-7 w-7  bg-linear-to-r from-violet-500 to-indigo-500 text-white border-none text-sm font-light py-2 px-20 rounded-full  cursor-pointer shrink-0 grid place-items-center">
<IoIosSend className="text-white text-sm"/>
          </button>

        </div>

      </div>
     </div>
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