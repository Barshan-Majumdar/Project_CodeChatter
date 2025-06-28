import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LogIn, UserPlus, Mail, Lock, User, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  onSuccess?: (name: string, email: string) => void;
  defaultTab?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess, defaultTab = 'sign-in' }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  
  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoginInProgress, setSocialLoginInProgress] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      toast({
        title: "Error",
        description: "All fields are required.",
        variant: "destructive"
      });
      return;
    }
    
    if (signUpPassword !== signUpConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (signUpPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create a new user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          data: {
            full_name: signUpName,
            username: signUpEmail.split('@')[0], // Default username from email
          },
        },
      });

      if (error) {
        throw error;
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        toast({
          title: "Verification Required",
          description: "Please check your email for a verification link to complete your registration.",
        });
        return;
      }

      toast({
        title: "Account Created",
        description: "Welcome to CodeChatter!",
      });
      
      // Pass user name and email to the onSuccess callback
      if (onSuccess && data.user) {
        onSuccess(signUpName, signUpEmail);
      } else {
        navigate('/dashboard/home');
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Error",
        description: error.error_description || error.message || "Failed to create account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!signInEmail || !signInPassword) {
      toast({
        title: "Error",
        description: "Email and password are required.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Get user data from metadata or profile
        const fullName = data.user.user_metadata?.full_name || signInEmail.split('@')[0];
        
        toast({
          title: "Signed In",
          description: "Welcome back to CodeChatter!",
        });
        
        // Pass user name and email to the onSuccess callback
        if (onSuccess) {
          onSuccess(fullName, signInEmail);
        } else {
          navigate('/dashboard/home');
        }
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Authentication Failed",
        description: error.error_description || error.message || "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'github' | 'google' | 'azure') => {
    // Prevent multiple clicks while processing
    if (socialLoginInProgress) {
      return;
    }
    
    setSocialLoginInProgress(provider);
    setIsLoading(true);
    
    try {
      const redirectURL = `${window.location.origin}/dashboard/home`;
      
      toast({
        title: `Signing in with ${provider === 'azure' ? 'Microsoft' : provider}`,
        description: "Redirecting to authentication provider...",
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: redirectURL,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) {
        throw error;
      }
      
      // The OAuth flow will redirect the user away from the application
      // No need to clear states as the page will redirect
    } catch (error: any) {
      console.error("OAuth error:", error);
      
      let errorMessage = `Failed to sign in with ${provider === 'azure' ? 'Microsoft' : provider}.`;
      
      if (error.message?.includes('provider is not enabled')) {
        errorMessage = `${provider === 'azure' ? 'Microsoft' : provider} authentication is not enabled. Please contact support.`;
      } else if (error.message?.includes('Invalid login credentials')) {
        errorMessage = "Authentication was cancelled or failed. Please try again.";
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      setIsLoading(false);
      setSocialLoginInProgress('');
    }
  };

  return (
    <Card className="w-[400px] bg-codechatter-dark border-codechatter-blue/20">
      <Tabs defaultValue={defaultTab}>
        <TabsList className="grid grid-cols-2 bg-codechatter-darker">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        
        {/* Sign In Tab */}
        <TabsContent value="sign-in">
          <form onSubmit={handleSignIn}>
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LogIn className="mr-2" size={20} /> Sign In
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sign-in-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-white/60" size={16} />
                  <Input
                    id="sign-in-email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white pl-10"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sign-in-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white/60" size={16} />
                  <Input
                    id="sign-in-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white pl-10"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading && !socialLoginInProgress ? "Signing In..." : "Sign In"}
              </Button>

              <div className="w-full">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-codechatter-blue/20"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-codechatter-dark px-2 text-white/40">Or continue with</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-codechatter-darker border-codechatter-blue/20 hover:bg-codechatter-blue/10"
                  onClick={() => handleSocialSignIn("github")}
                  disabled={isLoading}
                >
                  <Github className="mr-2" size={16} />
                  {socialLoginInProgress === 'github' ? '...' : 'GitHub'}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-codechatter-darker border-codechatter-blue/20 hover:bg-codechatter-blue/10"
                  onClick={() => handleSocialSignIn("google")}
                  disabled={isLoading}
                >
                  <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {socialLoginInProgress === 'google' ? '...' : 'Google'}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-codechatter-darker border-codechatter-blue/20 hover:bg-codechatter-blue/10"
                  onClick={() => handleSocialSignIn("azure")}
                  disabled={isLoading}
                >
                  <svg className="mr-2" width="16" height="16" viewBox="0 0 23 23">
                    <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  {socialLoginInProgress === 'azure' ? '...' : 'MS'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
        
        {/* Sign Up Tab */}
        <TabsContent value="sign-up">
          <form onSubmit={handleSignUp}>
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <UserPlus className="mr-2" size={20} /> Sign Up
              </CardTitle>
              <CardDescription>
                Create a new account to join the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sign-up-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-white/60" size={16} />
                  <Input
                    id="sign-up-name"
                    placeholder="John Doe"
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white pl-10"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sign-up-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-white/60" size={16} />
                  <Input
                    id="sign-up-email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white pl-10"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sign-up-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white/60" size={16} />
                  <Input
                    id="sign-up-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white pl-10"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sign-up-confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white/60" size={16} />
                  <Input
                    id="sign-up-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white pl-10"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading && !socialLoginInProgress ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="w-full">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-codechatter-blue/20"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-codechatter-dark px-2 text-white/40">Or continue with</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-codechatter-darker border-codechatter-blue/20 hover:bg-codechatter-blue/10"
                  onClick={() => handleSocialSignIn("github")}
                  disabled={isLoading}
                >
                  <Github className="mr-2" size={16} />
                  {socialLoginInProgress === 'github' ? '...' : 'GitHub'}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-codechatter-darker border-codechatter-blue/20 hover:bg-codechatter-blue/10"
                  onClick={() => handleSocialSignIn("google")}
                  disabled={isLoading}
                >
                  <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {socialLoginInProgress === 'google' ? '...' : 'Google'}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-codechatter-darker border-codechatter-blue/20 hover:bg-codechatter-blue/10"
                  onClick={() => handleSocialSignIn("azure")}
                  disabled={isLoading}
                >
                  <svg className="mr-2" width="16" height="16" viewBox="0 0 23 23">
                    <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  {socialLoginInProgress === 'azure' ? '...' : 'MS'}
                </Button>
              </div>
              
              <div className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <button 
                  type="button" 
                  className="text-codechatter-blue hover:underline"
                  onClick={() => document.querySelector('[value="sign-in"]')?.dispatchEvent(new MouseEvent('click'))}
                >
                  Sign In
                </button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;