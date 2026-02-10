"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebarContext";
import type React from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !pathname.startsWith('/auth');

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {showSidebar && <Sidebar />}
        <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
