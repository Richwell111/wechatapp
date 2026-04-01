import { BsThreeDotsVertical } from "react-icons/bs"
import { useChatStore, type User } from "../store/useChatStore"
import Logo from "./Logo"
import { useState } from "react"
import { IoSearch } from "react-icons/io5"
import ChatUser from "./ChatUser"
import { useEditProfileModal } from "../store/useEditStore"
import { useNavigate } from "react-router-dom"
import { authClient } from "../lib/auth-client"
import { useUsers } from "../custom-hooks/useUsers"
import { useSocketForOnlineUsers } from "../custom-hooks/useOnlineUsers"
import LoadingUsers from "./loading/LoadingUsers"
import api from "../lib/axios"

const LeftSidebar = () => {
  const {
    selectedUser,
    setConversationLoading,
    isConversationLoading,
    setSelectedUser,
    setActiveConversation,
  } = useChatStore();
  const { openModal } = useEditProfileModal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { users, loading } = useUsers(searchQuery);
  const { data: session } = authClient.useSession();
  const { onlineUsers } = useSocketForOnlineUsers(session?.user.id);
  const navigate = useNavigate();

       const handleSignout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      throw error;
    }

    navigate("/");
  };
   const handleStartConversation = async (user: User) => {
    if(isConversationLoading) return;
    if(selectedUser?.id === user.id) return;

    setConversationLoading(true)

    try {
      const res = await api.post(`/conversations/${user.id}`);
      
      setSelectedUser(user);
      setActiveConversation(res.data);
    } catch (error) {
        console.error("Start conversation error:", error);      
    } finally {
      setConversationLoading(false);
    }
  };
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
              <button   className="cursor-pointer text-sm" onClick={()=> {
                openModal()
                setDropdownOpen(false)
              }}>
                Profile
              </button>
              <div className="my-1 h-px bg-white/10 mx-2" />
              <button onClick={() => handleSignout()} className="w-full text-left font-medium px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer flex items-center gap-2">
                Logout
              </button>
            </div>
            
          </div>

        </div>
        {/* search input */}
            <div className="bg-[#282142]/50 rounded-full flex items-center gap-2 py-3 px-4 mt-5">
            <IoSearch/>
              <input type="text" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}placeholder="Search for users..." className="bg-transparent border-none text-white text-sm outline-none placeholder-[#c8c8c8] flex-1"/>
            </div>
            {loading && <LoadingUsers />}
        {!loading && users.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16 text-center px-4 text-gray-400">
            <div className="w-16 h-16 rounded-full bg-[#2a2443] flex items-center justify-center mb-4">
              <IoSearch size={28} className="opacity-60" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300">
                No users found
              </p>
              <p className="mt-1 text-xs opacity-70">
                No results for "{searchQuery}"
              </p>
            </div>
          </div>
        )}
             {!loading && users.length !== 0 && ( <div className="py-4">
              {users.map((user)=>{
              const onlineSet = new Set(onlineUsers);
              const online = onlineSet.has(user.id);
              const activeUser = user.id === selectedUser?.id
                return (
                  <ChatUser key={user.id} name={user.name} avatar={user.avatar} online={online} onClick={() => handleStartConversation(user)}
                  selected={activeUser} />
                )
              })}
            </div>)}
           
       
      </div>
    </div>
  )
}

export default LeftSidebar