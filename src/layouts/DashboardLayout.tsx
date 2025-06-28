import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  name: string;
  email: string;
  id?: string;
}

const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState<UserData>({ 
    name: 'Guest User', 
    email: 'guest@example.com' 
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status and get user data
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // No session, redirect to login
          navigate('/login');
          return;
        }

        // Get user profile data
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
        }

        // Set user data from profile or session
        const name = profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User';
        const email = session.user.email || 'user@example.com';

        setUserData({
          name,
          email,
          id: profile?.id || session.user.id
        });

      } catch (error) {
        console.error('Error checking auth:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/login');
        } else if (event === 'SIGNED_IN' && session) {
          // Refresh user data when signed in
          checkAuth();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex h-screen bg-codechatter-darker text-white items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-t-codechatter-purple border-codechatter-blue/30 rounded-full mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
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