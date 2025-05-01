
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Mail, UserCog } from 'lucide-react';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [name, setName] = useState('John Doe');
  const [userId, setUserId] = useState('johndoe');
  const [email, setEmail] = useState('john@example.com');
  const [bio, setBio] = useState('Full Stack Developer passionate about coding challenges and algorithms.');
  
  // Password change fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user's profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "New passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to change the password
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-white/60">Manage your account preferences and profile</p>
      </header>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-codechatter-dark">
          <TabsTrigger value="profile" className="data-[state=active]:bg-codechatter-purple/30">
            <User size={16} className="mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-codechatter-purple/30">
            <Lock size={16} className="mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-codechatter-purple/30">
            <Mail size={16} className="mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-codechatter-purple/30">
            <UserCog size={16} className="mr-2" /> Account
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-codechatter-dark border-codechatter-blue/20">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input 
                      id="userId" 
                      value={userId} 
                      onChange={(e) => setUserId(e.target.value)} 
                      className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="bg-codechatter-dark border-codechatter-blue/20">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90">
                    Change Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="bg-codechatter-dark border-codechatter-blue/20">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/60">Notification settings coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <Card className="bg-codechatter-dark border-codechatter-blue/20">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/60">Account settings coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
