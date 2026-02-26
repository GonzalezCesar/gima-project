import { useContext } from 'react';
import { sidebarContext } from '@/components/ui/sidebarContext';

export const useSidebar = () => {
    const context = useContext(sidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
