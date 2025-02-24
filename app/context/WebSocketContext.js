"use client";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userId } = useSelector((state) => state.auth.user) || {};

  useEffect(() => {
    const socketUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}?userId=${userId}`;

    if (userId && !socket) {
      console.log("Connecting to WebSocket:", socketUrl);
      const newSocket = io(socketUrl);

      newSocket.on("connect", () => {
        // console.log(`Connected: ${newSocket.id}`);
        setSocket(newSocket);
      });

      newSocket.on("disconnect", () => {
        // console.log(`Disconnected: ${newSocket.id}`);
        setSocket(null); 
      });

      newSocket.on("error", (error) => {
        // console.error("WebSocket error:", error);
      });

      return () => {
        newSocket.disconnect();
        setSocket(null); 
      };
    } else if (!userId) {
      console.warn("userId is not defined");
    }
  }, [userId]);

  console.log("Current Socket:", socket?.id);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
