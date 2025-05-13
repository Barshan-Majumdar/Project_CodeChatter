import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Home, BookOpen, MessageSquare, Users, Award, Settings, ChevronLeft, ChevronRight, Bell, User2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchProblem from './SearchProblem';

interface UserData {
  name: string;
  email: string;
}

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  userData: {
    name: string;
    email: string;
  };
  onSignOut?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar, userData, onSignOut }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  
  // Get first letter of user's name for avatar
  const userInitial = userData.name ? userData.name[0].toUpperCase() : '?';
  
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
  
  const handleLogoClick = () => {
    navigate('/');
  };

  // Simplified sign out handler
  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSignOut) {
      onSignOut();
    }
    // Just navigate to home since there's no auth now
    navigate('/');
  };

  return (
    <div
      className={cn(
        'h-screen bg-codechatter-dark border-r border-codechatter-blue/20 transition-all duration-300 flex flex-col',
        collapsed ? 'w-[80px]' : 'w-[250px]'
      )}
    >
      {/* Sidebar Header */}
      <div 
        className="flex items-center p-4 border-b border-codechatter-blue/20 cursor-pointer"
        onClick={handleLogoClick}
      >
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
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-codechatter-blue/20">
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
      <div className={`border-t border-codechatter-blue/20 p-4 ${collapsed ? 'text-center' : ''}`}>
        <div className="flex items-center">
          <div className={`bg-codechatter-blue/20 rounded-full h-10 w-10 flex items-center justify-center ${collapsed ? 'mx-auto' : 'mr-3'}`}>
            <User2 size={20} className="text-white/70" />
          </div>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white truncate">{userData.name}</h3>
              <p className="text-xs text-white/60 truncate">{userData.email}</p>
              <button 
                onClick={handleSignOut}
                className="text-xs text-codechatter-blue hover:underline mt-1"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
