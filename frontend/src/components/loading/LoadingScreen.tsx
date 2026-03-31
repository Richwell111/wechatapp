import { IoLogoWechat } from "react-icons/io5";


export default function LoadingScreen() {
  return (
      <div className="h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-xl rounded-2xl">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="relative">
          <IoLogoWechat size={72} className="text-violet-500" />

          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full animate-ping bg-violet-500/30" />
        </div>

        {/* Text */}
        <p className="text-sm text-gray-300 tracking-wide">
          Connecting to chat…
        </p>

        {/* Dots loader */}
        <div className="flex gap-1 mt-1">
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}