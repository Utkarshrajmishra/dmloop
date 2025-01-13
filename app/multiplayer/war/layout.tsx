import { SocketProvider } from "@/context/SocketProvider";
import { SessionProvider } from "next-auth/react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <SessionProvider>{children}</SessionProvider>
    </SocketProvider>
  );
}
