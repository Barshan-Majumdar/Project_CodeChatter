
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Home, BookOpen, MessageSquare, Users, Award, Settings, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchProblem from './SearchProblem';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  
  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/dashboard/home'
    },
    {
      icon: BookOpen,
      label: 'Problems',
      path: '/dashboard/problems'
    },
    {
      icon: MessageSquare,
      label: 'Chat',
      path: '/dashboard/chat'
    },
    {
      icon: Users,
      label: 'Network',
      path: '/dashboard/network'
    },
    {
      icon: Award,
      label: 'Leaderboard',
      path: '/dashboard/leaderboard'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/dashboard/settings'
    },
  ];

  return (
    <div
      className={cn(
        'h-screen bg-codechatter-dark border-r border-codechatter-blue/20 transition-all duration-300 flex flex-col',
        collapsed ? 'w-[70px]' : 'w-[240px]'
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center p-4 border-b border-codechatter-blue/20">
        <Code size={24} className="text-codechatter-blue" />
        {!collapsed && (
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-codechatter-blue to-codechatter-purple bg-clip-text text-transparent">
            CodeChatter
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-white/60 hover:text-white hover:bg-white/10"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto pt-4">
        <div className="px-3">
          <Button
            className="w-full mb-4 bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
            onClick={() => setIsSearchDialogOpen(true)}
          >
            <Code size={collapsed ? 18 : 16} />
            {!collapsed && <span className="ml-2">New Challenge</span>}
          </Button>
          
          <SearchProblem 
            open={isSearchDialogOpen} 
            onOpenChange={setIsSearchDialogOpen} 
          />
        </div>
        <div className="space-y-1 px-3">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.path || (item.path === '/dashboard/home' && currentPath === '/dashboard');
            return (
              <Link key={index} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start',
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <item.icon size={collapsed ? 18 : 16} />
                  {!collapsed && <span className="ml-2">{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-codechatter-blue/20">
        <div className="flex items-center p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center text-white font-medium">
            J
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-white/60 truncate">john@example.com</p>
            </div>
          )}
          {!collapsed && (
            <div className="ml-auto relative">
              <Bell size={16} className="text-white/60" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
