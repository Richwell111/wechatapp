import { IoLogoWechat } from "react-icons/io5"

const Logo = () => {
  return (
   <p className="flex items-center gap-1">
    <IoLogoWechat size={40} className="text-violet-500"/>
   
   <span className="text-gray-200 font-medium text-xl">ChatApp</span></p>
  )
}

export default Logo