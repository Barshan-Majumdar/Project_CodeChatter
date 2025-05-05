
import React, { useEffect, useState } from 'react';
import { Code, AlertCircle } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'sign-in';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setAuthError('Unable to check authentication status. Please try again.');
          return;
        }
        
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
        setAuthError('There was an error checking your authentication status.');
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
      
      {authError && (
        <Alert variant="destructive" className="mb-4 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
      
      <AuthForm defaultTab={defaultTab} onSuccess={handleAuthSuccess} />
      
      <div className="mt-8 text-white/40 text-sm text-center max-w-md">
        <p className="mb-2">
          CodeChatter combines competitive coding with social networking to create a unique platform for developers to learn, share, and grow together.
        </p>
        <p className="text-xs text-white/30">
          Note: To use social login methods (GitHub, Google, Microsoft), 
          these providers must be configured in your Supabase project settings.
        </p>
      </div>
    </div>
  );
};

export default Login;
