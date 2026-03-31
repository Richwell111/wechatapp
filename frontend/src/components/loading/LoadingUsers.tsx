

export default function LoadingUsers() {
  return (
    <div className="space-y-4 mt-4">
        {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          {/* Avatar Skeleton */}
          <div className="w-10 h-10 rounded-full bg-[#2f2a4a]" />

          {/* Text Skeleton */}
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 bg-[#2f2a4a] rounded" />
            <div className="h-2 w-20 bg-[#2f2a4a] rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}