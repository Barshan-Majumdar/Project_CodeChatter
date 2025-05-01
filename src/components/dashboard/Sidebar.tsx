
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, Home, Users, MessageSquare, Star, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Code, label: 'Problems', path: '/dashboard/problems' },
    { icon: MessageSquare, label: 'Chat', path: '/dashboard/chat' },
    { icon: Users, label: 'Network', path: '/dashboard/network' },
    { icon: Star, label: 'Leaderboard', path: '/dashboard/leaderboard' },
  ];

  return (
    <div className={`h-screen bg-codechatter-dark border-r border-codechatter-blue/20 transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between border-b border-codechatter-blue/20">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <Code size={24} className="text-codechatter-blue" />
            <span className="text-lg font-bold bg-gradient-to-r from-codechatter-blue to-codechatter-purple bg-clip-text text-transparent">
              CodeChatter
            </span>
          </Link>
        )}
        {collapsed && (
          <Code size={24} className="text-codechatter-blue mx-auto" />
        )}
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-white/70 hover:text-white"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        )}
        {collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-white/70 hover:text-white mx-auto"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        )}
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-codechatter-blue/10 transition-colors
                    ${item.path === '/dashboard' ? 'bg-codechatter-blue/10 text-white' : ''}
                  `}
                >
                  <Icon size={20} className="min-w-5" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-codechatter-blue/20">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-codechatter-blue to-codechatter-purple flex items-center justify-center text-white font-bold">
            J
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm text-white font-medium">John Doe</p>
              <p className="text-xs text-white/60">900 points</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
