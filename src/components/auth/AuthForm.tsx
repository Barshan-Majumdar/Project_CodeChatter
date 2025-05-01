
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  onSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
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

    setIsLoading(true);
    
    // In a real app, this would call Supabase to create a new user
    // For now, we'll simulate a successful sign up
    setTimeout(() => {
      toast({
        title: "Account Created",
        description: "Welcome to CodeChatter! You have successfully created an account.",
      });
      
      // Navigate to dashboard or trigger success callback
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard/home');
      }
      
      setIsLoading(false);
    }, 1500);
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
    
    // In a real app, this would call Supabase to authenticate the user
    // For now, we'll simulate a successful sign in
    setTimeout(() => {
      toast({
        title: "Signed In",
        description: "Welcome back to CodeChatter!",
      });
      
      // Navigate to dashboard or trigger success callback
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard/home');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-[400px] bg-codechatter-dark border-codechatter-blue/20">
      <Tabs defaultValue="sign-in">
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
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
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
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
