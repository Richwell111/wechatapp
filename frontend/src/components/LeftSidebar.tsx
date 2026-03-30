import { BsThreeDotsVertical } from "react-icons/bs"
import { useChatStore } from "../store/useChatStore"
import Logo from "./Logo"
import { useState } from "react"
import { IoSearch } from "react-icons/io5"
import { dummyUsers } from "../assets/assets"
import ChatUser from "./ChatUser"
import { useEditProfileModal } from "../store/useEditStore"

const LeftSidebar = () => {
  const {selectedUser, setSelectedUser}=useChatStore()
  const [dropdownOpen,setDropdownOpen]=useState(false)
  const {openModal} = useEditProfileModal()
  return (
    <div className={`bg-[#818582]/10 h-full rounded-r-2xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className="py-6 px-4">
        <div className="flex justify-between items-center">
          {/* logo */}
          <Logo/>
          <div className="relative py-2">
            <BsThreeDotsVertical onClick={()=>setDropdownOpen(!dropdownOpen)} size={20} className="text-gray-200 cursor-pointer"/>
            {/* dropdown */}
            <div className={`absolute top-full right-0 z-20 w-40 p-2 mt-2 rounded-xl bg-[#282142]/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-200 origin-top-right ${dropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
              <button className="w-full text-left font-medium px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex items-center gap-2" onClick={()=> {
                openModal()
                setDropdownOpen(false)
              }}>
                Profile
              </button>
              <div className="my-1 h-px bg-white/10 mx-2" />
              <button className="w-full text-left font-medium px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer flex items-center gap-2">
                Logout
              </button>
            </div>
            
          </div>

        </div>
        {/* search input */}
            <div className="bg-[#282142]/50 rounded-full flex items-center gap-2 py-3 px-4 mt-5">
            <IoSearch/>
              <input type="text" placeholder="Search for users..." className="bg-transparent border-none text-white text-sm outline-none placeholder-[#c8c8c8] flex-1"/>
            </div>
            <div className="py-4">
              {dummyUsers.map((user)=>{
                return (
                  <ChatUser key={user.id} name={user.name} avatar={user.avatar} online={user.online} onClick={() => setSelectedUser()} />
                )
              })}
            </div>
       
      </div>
    </div>
  )
}

export default LeftSidebar