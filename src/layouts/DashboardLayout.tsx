
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';

interface UserData {
  name: string;
  email: string;
}

const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Default user data instead of authentication
  const userData: UserData = { 
    name: 'Guest User', 
    email: 'guest@example.com' 
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSignOut = () => {
    // No-op function as we're removing authentication
    console.log('Sign out clicked - authentication removed');
  };

  return (
    <div className="flex h-screen bg-codechatter-darker text-white overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar}
        userData={userData}
        onSignOut={handleSignOut}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet context={userData} />
      </main>
    </div>
  );
};

export default DashboardLayout;
