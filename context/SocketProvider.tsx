'use client'

import { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

type SocketType = Socket | null;

const SocketContext = createContext<SocketType>(null);

export const useSocket = () => {
    const socket=useContext(SocketContext)
    return socket
};

export const SocketProvider=({children}:{children:React.ReactNode})=>{
        const socket = useMemo(
          () => io("https://dmloop-server.onrender.com"),
          []
        );
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
