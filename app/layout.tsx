import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "KeysWar - Unrelase your keyboard",
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
        {children}
      </body>
    </html>
  );
}
