import { assets } from "../assets/assets"
import { useChatStore } from "../store/useChatStore"

const RightSidebar = () => {
    const {selectedUser}=  useChatStore()
    if(selectedUser){
        return(
            <div className="bg-[#818582]/10 w-full relative overflow-y-scroll text-white">
                <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
                    <img src={assets.img1} className="w-20 aspect-square rounded-full object-cover"/>
                    <div className="flex items center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500 block"/>
                            <p className="text-xl font-medium">Sophia Brown</p>
                        
                    </div>
                    <p className="px-10 mx-auto text-sm">This is my bio</p>
                </div>
                <hr  className="border-gray-600 my-4"/>
                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-violet-500 to-indigo-500 text-white border-none text-sm font-light py-2 px-20 rounded-full  cursor-pointer">
Logout
                </button>
            </div>
        )
    }
  return null
}

export default RightSidebar