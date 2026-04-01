import { useEffect, useState } from "react";
import { useSocketStore } from "../store/useSocketStore";

export function useSocketForOnlineUsers(userId: string | undefined) {
  const { socket } = useSocketStore();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;
    if (!userId) return;

    const handleOnlineUsers = (users: string[]) => {
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [socket, userId]);

  return { onlineUsers };
}