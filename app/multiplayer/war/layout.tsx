import Navbar from "@/components/Navbar";
import { SocketProvider } from "@/context/SocketProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      {children}
      </SocketProvider>
  );
}
