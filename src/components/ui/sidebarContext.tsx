"use client";
import { createContext, useState, useMemo, ReactNode, useCallback } from 'react';

export const sidebarContext = createContext({
    isSidebarOpen: false,
    toggleSidebar: () => {},
});

export default function SidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    const value = useMemo(
        () => ({
            isSidebarOpen,
            toggleSidebar,
        }),
        [isSidebarOpen, toggleSidebar]
    );

    return (
        <sidebarContext.Provider value={value}>
            {children}
        </sidebarContext.Provider>
    );
}