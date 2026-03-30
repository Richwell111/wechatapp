import { IoLogoWechat } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

export const inputStyles = "w-full py-3 px-4 border border-white/10 rounded-lg outline-none text-white placeholder-gray-400 bg-black/20 focus:border-violet-500 focus:bg-black/40 transition-all duration-300"

const LoginPage = () => {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-black/40 backdrop-blur-2xl flex items-center justify-center px-4 sm:px-6 lg:px-8">
       <div className="w-full max-w-5xl flex items-center justify-between gap-12 lg:gap-24 max-md:flex-col">
        {/* left side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 flex-1">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
              <IoLogoWechat size={80} className="text-violet-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"/>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400 tracking-tight">
                Welcome to ChatApp
              </h2>
              <p className="text-gray-400 text-lg lg:text-xl max-w-md font-light leading-relaxed">
                  Sign in to your account and start chatting in real time with friends and family.
              </p>
            </div>
        </div>
        {/* right side */}
        <div className="w-full max-w-md flex-1">
          <form className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col gap-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 to-indigo-500"></div>
            <div className="space-y-1 mb-2">
              <h2 className="text-3xl font-semibold text-white tracking-tight">
                Login
              </h2>
              <p className="text-sm text-gray-400">Welcome back! Please enter your details.</p>
            </div>
            
            <div className="space-y-4">
              <input type="email" name="email" placeholder="Email Address" required className={inputStyles}/>
              <input type="password" name="password" placeholder="Password" required className={inputStyles}/>
            </div>
            
            <button type="submit" className="mt-4 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 rounded-lg py-3.5 font-semibold text-white cursor-pointer shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transform hover:-translate-y-0.5">
              Sign In
            </button>
            
            <p className="text-center text-gray-400 text-sm mt-2">
              Don't have an account?{' '}
              <span onClick={() => navigate("/register")} className="text-violet-400 hover:text-violet-300 font-medium cursor-pointer transition-colors underline-offset-4 hover:underline">
                Register
              </span>
            </p>
          </form>
        </div>
       </div>
    </div>
  )
}

export default LoginPage