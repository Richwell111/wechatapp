import { IoClose } from "react-icons/io5"
import { useEditProfileModal } from "../../store/useEditStore"
import AvatarUpload from "../AvatarUpload"

import { inputStyles } from "../../pages/LoginPage"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const EditProfileModal = () => {
    const {isOpen,closeModal}=useEditProfileModal()
    const [avatarPreview,setAvatarPreview]=useState<string | null>(null)
    
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
 
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleProfileSetup = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      if (bio.trim()) {
        formData.append("bio", bio);
      }
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      if(name){
        formData.append("name",name);
      }

      await api.put("/profile", formData);
      toast("Profile updated successfully", {
        style: {
          background: "#4f39f6",
          color: "white",
        },
      });
      closeModal();
    } catch (error) {
      console.error("Profile update error:", error);
      toast("Failed to update profile", {
        style: {
          background: "#4f39f6",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");
        setBio(data.user.bio || "");
        setAvatarPreview(data.user.avatar || null);
        setName(data.user.name || "");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={closeModal} />

      {/* modal card */}
      <div className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-[#1e1932] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 to-indigo-500 z-10"></div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
              Edit Profile
            </h2>
            <button className="text-gray-400 hover:text-white transition-all hover:rotate-90 duration-300 cursor-pointer p-2 rounded-full hover:bg-white/10" onClick={closeModal}>
              <IoClose size={24} />
            </button>
          </div>

          <form onSubmit={handleProfileSetup} className="space-y-6">
            <div className="mb-6">
              <AvatarUpload
                preview={avatarPreview}
                onFileSelect={(file, preview) => {
                  setAvatarFile(file);
                  setAvatarPreview(preview);
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
              <input
                type="text"
                className={inputStyles}
                placeholder="Full Name"
                name="fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Bio</label>
              <textarea
                className={`${inputStyles} resize-none h-28 sm:h-32 text-sm leading-relaxed`}
                rows={3}
                placeholder="Update your bio..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6 sm:mt-8">
              <button type="button" className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 cursor-pointer" onClick={closeModal}>Cancel</button>
              <button disabled={loading} className="px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">{loading ? "Saving..." : "Save Changes"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;