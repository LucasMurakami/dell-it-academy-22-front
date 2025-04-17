"use client";

import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";
import { menuItems } from "@/app/constants/menuItems";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Determinar a página ativa com base na URL
  const activePage = pathname?.split('/')?.[2] || "dashboard";
  
  const toggleSubmenu = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          menuItems={menuItems}
          activePage={activePage}
          activeSubmenu={activeSubmenu}
          toggleSubmenu={toggleSubmenu}
        />
        <div className={`flex-1 ${sidebarOpen ? 'ml-64' : ''} p-6 pt-20 transition-all duration-300`}>
          {children}
        </div>
      </div>
    </div>
  );
}