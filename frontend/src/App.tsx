import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";
import { authClient } from "./lib/auth-client";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import { useSocketStore } from "./store/useSocketStore";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useChatStore } from "./store/useChatStore";

function App() {
  const { data: session } = authClient.useSession();
  const { socket, setSocket } = useSocketStore();
  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return;
    //development
    // const socket = io("http://localhost:3000", {
    //   withCredentials: true,
    // });

    const socket = io();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [user?.id,setSocket]);

  //rejoin the chatroom on reconnect
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      const { activeConversation } = useChatStore.getState();

      if (activeConversation) {
        socket.emit("conversation:join", activeConversation.id);
      }
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [socket]);
  return (
    <div className="bg-[url('./assets/images/background.png')] bg-cover bg-no-repeat bg-center">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to="/chat" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={session ? <Navigate to="/chat" /> : <RegisterPage />}
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoutes>
              <ChatPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;