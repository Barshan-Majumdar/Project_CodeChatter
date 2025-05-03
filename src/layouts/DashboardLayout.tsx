
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/auth/AuthForm';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  name: string;
  email: string;
}

const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log('Auth event:', event);
          
          if (event === 'SIGNED_IN' && session) {
            const fullName = session.user.user_metadata?.full_name || 
              session.user.email?.split('@')[0] || '';
            
            const newUserData = { 
              name: fullName,
              email: session.user.email || ''
            };
            
            setUserData(newUserData);
            setIsAuthenticated(true);
            
            // Store user data
            localStorage.setItem('user-data', JSON.stringify(newUserData));
            localStorage.setItem('auth-token', session.access_token);
            
            // Only show toast for sign in events
            toast({
              title: "Authentication Successful",
              description: `Welcome to your CodeChatter dashboard, ${fullName}!`,
            });
          } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
            setIsAuthenticated(false);
            setUserData({ name: '', email: '' });
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-data');
            
            if (event === 'SIGNED_OUT') {
              toast({
                title: "Signed Out",
                description: "You have been signed out of CodeChatter.",
              });
              navigate('/login');
            }
          }
        }
      );

      // THEN check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const fullName = session.user.user_metadata?.full_name || 
          session.user.email?.split('@')[0] || '';
        
        const newUserData = { 
          name: fullName,
          email: session.user.email || ''
        };
        
        setUserData(newUserData);
        setIsAuthenticated(true);
        
        // Update stored user data if needed
        localStorage.setItem('user-data', JSON.stringify(newUserData));
        localStorage.setItem('auth-token', session.access_token);
      } else {
        // Clear any potentially stale data
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    checkAuth();
  }, [toast, navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleAuthSuccess = (name: string, email: string) => {
    // This is called after manual sign in success in AuthForm
    const newUserData = { name, email };
    
    setIsAuthenticated(true);
    setUserData(newUserData);
    
    navigate('/dashboard/home');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // The onAuthStateChange listener will handle the rest
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-codechatter-darker min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin h-8 w-8 border-4 border-t-codechatter-purple border-codechatter-blue/30 rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-codechatter-darker min-h-screen flex flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <h2 className="text-white text-xl mb-2">Login Required</h2>
          <p className="text-white/60 mb-4">Please sign in to access your dashboard</p>
        </div>
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
        onSignOut={handleSignOut}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet context={userData} />
      </main>
    </div>
  );
};

export default DashboardLayout;
