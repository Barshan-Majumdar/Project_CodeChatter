
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/auth/AuthForm';

const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if the user is authenticated
  // In a real app with Supabase, you would check the auth state here
  useEffect(() => {
    // For demo purposes, we'll assume the user is not authenticated initially
    const checkAuth = () => {
      // In a real app, check if there's a session token or similar
      const token = localStorage.getItem('auth-token');
      if (token) {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleAuthSuccess = () => {
    // Set authenticated and store a dummy token
    setIsAuthenticated(true);
    localStorage.setItem('auth-token', 'demo-token');
    
    toast({
      title: "Authentication Successful",
      description: "Welcome to your CodeChatter dashboard!",
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
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
