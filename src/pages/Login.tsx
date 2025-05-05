
import React, { useEffect, useState } from 'react';
import { Code } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'sign-in';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // If user is already logged in, redirect to dashboard
          toast({
            title: "Already Authenticated",
            description: "You are already logged in. Redirecting to dashboard...",
          });
          navigate('/dashboard/home');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        toast({
          title: "Authentication Error",
          description: "There was an error checking your authentication status.",
          variant: "destructive"
        });
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleAuthSuccess = (name: string, email: string) => {
    navigate('/dashboard/home');
  };

  if (isCheckingAuth) {
    return (
      <div className="bg-codechatter-darker min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin h-8 w-8 border-4 border-t-codechatter-purple border-codechatter-blue/30 rounded-full mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-codechatter-darker min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <Code size={32} className="text-codechatter-blue mr-2" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-codechatter-blue to-codechatter-purple bg-clip-text text-transparent">
            CodeChatter
          </h1>
        </div>
        <p className="text-white/60">Code. Connect. Compete.</p>
      </div>
      
      <AuthForm defaultTab={defaultTab} onSuccess={handleAuthSuccess} />
      
      <p className="mt-8 text-white/40 text-sm text-center max-w-md">
        CodeChatter combines competitive coding with social networking to create a unique platform for developers to learn, share, and grow together.
      </p>
    </div>
  );
};

export default Login;
