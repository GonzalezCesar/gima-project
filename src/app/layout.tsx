import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const microgramma = localFont({
  src: "/fonts/font-microgramma.otf", 
  variable: "--font-microgramma",
  display: "swap",
});

const archivo = localFont({
  src: "/fonts/font-archivo.ttf", 
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GIMA Dashboard",
  description: "Gestión de Mantenimiento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${microgramma.variable} ${archivo.variable} antialiased flex h-screen bg-gima-light overflow-hidden`}
      >
        <Sidebar />

        <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}