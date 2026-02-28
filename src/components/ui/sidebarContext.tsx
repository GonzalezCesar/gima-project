"use client";
import { createContext, useState, useMemo, ReactNode } from 'react';

export const sidebarContext = createContext({
    isSidebarOpen: false,
    toggleSidebar: () => {},
});

export default function SidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const value = useMemo(
        () => ({
            isSidebarOpen,
            toggleSidebar,
        }),
        [isSidebarOpen]
    );

    return (
        <sidebarContext.Provider value={value}>
            {children}
        </sidebarContext.Provider>
    );
}