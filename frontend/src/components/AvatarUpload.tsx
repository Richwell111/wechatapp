import { IoCamera } from "react-icons/io5"

interface AvatarUploadProps{
    preview:string | null,
    onFileSelect:(file:File,preview:string)=>void
}
const AvatarUpload = ({preview,onFileSelect}:AvatarUploadProps) => {
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        if(!file) return;
        const previewURL = URL.createObjectURL(file);
        onFileSelect(file,previewURL)
    }
  return (
    <label className="group relative flex flex-col items-center gap-3 cursor-pointer">
        <div className="relative w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        ) : (
            <div className="text-gray-400 flex flex-col items-center gap-2 transition-colors duration-300 group-hover:text-violet-400">
              <IoCamera size={28} />
            </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <IoCamera size={28} className="text-white drop-shadow-md" />
        </div>
        </div>
        <span className="text-xs font-medium text-gray-400 group-hover:text-violet-400 transition-colors duration-300">Change Avatar</span>
        <input type="file" accept="image/*" onChange={handleChange} className="hidden"/>
    </label>
  )
}

export default AvatarUpload