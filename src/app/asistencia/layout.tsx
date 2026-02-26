import { MainLayout } from "@/components/layout/MainLayout";
import SidebarProvider from "@/components/ui/sidebarContext";
import type React from "react";

export default function AsistenciaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <MainLayout>{children}</MainLayout>
        </SidebarProvider>
    );
}
