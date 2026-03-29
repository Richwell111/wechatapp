import { BsThreeDotsVertical } from "react-icons/bs"
import { useChatStore } from "../store/useChatStore"
import Logo from "./Logo"
import { useState } from "react"
import { IoSearch } from "react-icons/io5"
import { dummyUsers } from "../assets/assets"
import ChatUser from "./ChatUser"

const LeftSidebar = () => {
  const {selectedUser, setSelectedUser}=useChatStore()
  const [dropdownOpen,setDropdownOpen]=useState(false)
  return (
    <div className={`bg-[#818582]/10 h-full rounded-r-2xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className="py-6 px-4">
        <div className="flex justify-between items-center">
          {/* logo */}
          <Logo/>
          <div className="relative py-2">
            <BsThreeDotsVertical onClick={()=>setDropdownOpen(!dropdownOpen)} size={20} className="text-gray-200 cursor-pointer"/>
            {/* dropdown */}
            <div className={`absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 ${dropdownOpen ? "block" : "hidden"}`}>
              <button className="cursor-pointer text-sm ">Profile</button>
    <hr className="my-2 border-t border-gray-500" />
    <button className="cursor-pointer text-sm ">Logout</button>

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