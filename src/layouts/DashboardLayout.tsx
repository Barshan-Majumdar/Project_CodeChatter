
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/auth/AuthForm';

interface UserData {
  name: string;
  email: string;
}

const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth-token');
      const storedUserData = localStorage.getItem('user-data');
      
      if (token && storedUserData) {
        setIsAuthenticated(true);
        setUserData(JSON.parse(storedUserData));
      }
    };
    
    checkAuth();
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleAuthSuccess = (name: string, email: string) => {
    // Set authenticated and store a dummy token
    const newUserData = { name, email };
    
    setIsAuthenticated(true);
    setUserData(newUserData);
    
    localStorage.setItem('auth-token', 'demo-token');
    localStorage.setItem('user-data', JSON.stringify(newUserData));
    
    toast({
      title: "Authentication Successful",
      description: `Welcome to your CodeChatter dashboard, ${name}!`,
    });
    
    navigate('/dashboard/home');
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-codechatter-darker min-h-screen flex flex-col items-center justify-center p-4">
        <AuthForm onSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-codechatter-darker text-white overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar}
        userData={userData}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet context={userData} />
      </main>
    </div>
  );
};

export default DashboardLayout;
