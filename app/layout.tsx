import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "KeyboardWars",
  description: "Automate DMs and comment on instagram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Navbar/>
        <Toaster/>
        {children}
        </body>
    </html>
  );
}
