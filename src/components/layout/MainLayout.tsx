"use client";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import type React from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen } = useSidebar();

    return (
        <div className={cn(
            "flex h-screen bg-gray-50 overflow-hidden transition-all duration-300",
        )}>
            <Sidebar />
            <div className={cn(
                "flex-1 flex flex-col h-full w-full overflow-hidden transition-all duration-300",
                isSidebarOpen ? "md:ml-64" : "ml-0"
            )}>
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
