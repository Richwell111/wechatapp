import { Server as httpServer } from "http";
import { Server } from "socket.io";
import { auth } from "../lib/auth";

export let io: Server;

const onlineUsers = new Map<string, string>();

export function initSocket(server: httpServer) {
  io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    console.log("Socket connected", socket.id);

    try {
      const session = await auth.api.getSession({
        headers: socket.handshake.headers as any,
      });

      if (!session) {
        socket.disconnect();
        return;
      }

      const userId = session.user.id;

      onlineUsers.set(userId, socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));

      socket.on("disconnect", () => {
        onlineUsers.delete(userId);
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      });

      //joins a conversation room
      socket.on("conversation:join", (conversationId: string) => {
        socket.join(conversationId);
        console.log("User joined the room:", conversationId);
      });

      //leaves a conversation
      socket.on("conversation:leave", (conversationId: string) => {
        socket.leave(conversationId);
        console.log("User left the room:", conversationId);
      });
    } catch (error) {
      console.error("Socket auth error:", error);
      socket.disconnect();
    }
  });
}