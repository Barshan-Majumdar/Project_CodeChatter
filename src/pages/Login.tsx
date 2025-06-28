import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Code } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import CodeRain from '@/components/CodeRain';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the default tab from URL params (for sign-up links)
  const defaultTab = searchParams.get('tab') === 'sign-up' ? 'sign-up' : 'sign-in';

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // User is already logged in, redirect to dashboard
          navigate('/dashboard/home');
          return;
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // User successfully signed in
          navigate('/dashboard/home');
        } else if (event === 'SIGNED_OUT') {
          // User signed out, stay on login page
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuthSuccess = (name: string, email: string) => {
    toast({
      title: "Welcome to CodeChatter!",
      description: `Hello ${name}, you're now part of our coding community.`,
    });
    navigate('/dashboard/home');
  };

  // Show loading spinner while checking auth
  if (isLoading) {
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
        
        <div className="text-white text-center">
          <div className="animate-spin h-8 w-8 border-4 border-t-codechatter-purple border-codechatter-blue/30 rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-codechatter-darker min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Code Rain Effect */}
      <CodeRain className="opacity-10" />
      
      {/* Header */}
      <div className="mb-8 text-center relative z-10">
        <div className="flex items-center justify-center mb-2">
          <Code size={32} className="text-codechatter-blue mr-2" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-codechatter-blue to-codechatter-purple bg-clip-text text-transparent">
            CodeChatter
          </h1>
        </div>
        <p className="text-white/60">Code. Connect. Compete.</p>
        <p className="text-white/40 text-sm mt-2">Join the community of passionate coders</p>
      </div>
      
      {/* Auth Form */}
      <div className="relative z-10">
        <AuthForm onSuccess={handleAuthSuccess} defaultTab={defaultTab} />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-white/40 text-xs relative z-10">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
        <p className="mt-2">
          Need help? <a href="/contact" className="text-codechatter-blue hover:underline">Contact Support</a>
        </p>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-codechatter-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-codechatter-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-codechatter-neon-green/3 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Login;