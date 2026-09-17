import { useState } from "react";
import { Menu } from "lucide-react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gray-950 text-white">

      <Navbar
        onMenuClick={() =>
          setSidebarOpen(true)
        }
      />

      <div className="flex h-[calc(100vh-4rem)]">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;