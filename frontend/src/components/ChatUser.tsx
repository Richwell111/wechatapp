import { assets } from "../assets/assets"

interface ChatUserProps{
    name:string,
    avatar?:string,
    selected?:boolean,
    onClick?:()=>void,
    online?:boolean,
   
}

const ChatUser = ({name,avatar,onClick,online}:ChatUserProps) => {
  return (
    <div className="p-3 rounded-lg cursor-pointer transition hover:bg-[#282142]/50" onClick={onClick}>
        <div className="flex items-center gap-3">
            <div className="relative">
                <img src={avatar  || assets.avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />

                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${online ? "bg-green-500" : "bg-zinc-500"} border-2 border-zinc-900`}></span>
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                    {name}
                </span>
                <span className="text-xs text-zinc-400">
                    {online ? "Online":"Offline"}

                </span>
               
            </div>
        </div>
        
    </div>
  )
}

export default ChatUser