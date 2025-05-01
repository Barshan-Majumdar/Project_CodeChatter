
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Check, X, UserPlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ConnectionRequest {
  id: string;
  name: string;
  title: string;
  points: number;
  problemsSolved: number;
  mutualConnections: number;
  avatar?: string;
}

interface Suggestion {
  id: string;
  name: string;
  title: string;
  points: number;
  problemsSolved: number;
  specialties: string[];
  avatar?: string;
}

const Network: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const connectionRequests: ConnectionRequest[] = [
    { id: '1', name: 'Emily Johnson', title: 'Front-end Developer', points: 450, problemsSolved: 42, mutualConnections: 3 },
    { id: '2', name: 'Ryan Lee', title: 'Software Engineer at TechCorp', points: 780, problemsSolved: 67, mutualConnections: 5 },
    { id: '3', name: 'Sophia Garcia', title: 'Computer Science Student', points: 320, problemsSolved: 28, mutualConnections: 2 },
  ];
  
  const suggestions: Suggestion[] = [
    { 
      id: '4', 
      name: 'Daniel Wilson', 
      title: 'Full Stack Developer', 
      points: 1200, 
      problemsSolved: 98, 
      specialties: ['React', 'Node.js', 'Algorithms'] 
    },
    { 
      id: '5', 
      name: 'Olivia Martinez', 
      title: 'Machine Learning Engineer', 
      points: 950, 
      problemsSolved: 73, 
      specialties: ['Python', 'Data Structures', 'Neural Networks'] 
    },
    { 
      id: '6', 
      name: 'James Smith', 
      title: 'Competitive Programmer', 
      points: 1450, 
      problemsSolved: 110, 
      specialties: ['C++', 'Dynamic Programming', 'Graphs'] 
    },
    { 
      id: '7', 
      name: 'Ava Brown', 
      title: 'Backend Developer', 
      points: 870, 
      problemsSolved: 64, 
      specialties: ['Java', 'Database Design', 'System Design'] 
    },
  ];

  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Your Network</h1>
        <p className="text-white/60">Connect with other coders and expand your professional network</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Connection Requests */}
          <Card className="bg-codechatter-dark border-codechatter-blue/20 mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Connection Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {connectionRequests.length === 0 ? (
                <div className="text-center py-6 text-white/60">
                  No pending connection requests
                </div>
              ) : (
                <div className="space-y-4">
                  {connectionRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-codechatter-darker rounded-lg">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium">
                            {request.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white">{request.name}</h3>
                          <p className="text-white/60 text-sm">{request.title}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-white/60">
                            <span>{request.points} points</span>
                            <span>{request.problemsSolved} problems solved</span>
                            <span>{request.mutualConnections} mutual connections</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-500/30 hover:border-red-500/60 hover:bg-red-500/10 text-red-400"
                        >
                          <X size={16} className="mr-1" /> Decline
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
                        >
                          <Check size={16} className="mr-1" /> Accept
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Suggested Connections */}
          <Card className="bg-codechatter-dark border-codechatter-blue/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Suggested Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Input
                    placeholder="Search for developers by name, title or skills..."
                    className="bg-codechatter-darker border-codechatter-blue/20 text-white pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                </div>
              </div>

              {filteredSuggestions.length === 0 ? (
                <div className="text-center py-6 text-white/60">
                  No matching suggestions found
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSuggestions.map(suggestion => (
                    <div key={suggestion.id} className="p-4 bg-codechatter-darker rounded-lg">
                      <div className="flex items-start">
                        <Avatar className="h-12 w-12 mr-4">
                          <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium">
                            {suggestion.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{suggestion.name}</h3>
                          <p className="text-white/60 text-sm mb-2">{suggestion.title}</p>
                          <div className="flex items-center gap-3 mb-3 text-xs text-white/60">
                            <span>{suggestion.points} points</span>
                            <span>{suggestion.problemsSolved} solved</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {suggestion.specialties.map((specialty, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="bg-transparent border-codechatter-blue/30 text-codechatter-blue text-xs"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full border-codechatter-blue/30 text-codechatter-blue hover:bg-codechatter-blue/10"
                          >
                            <UserPlus size={16} className="mr-1" /> Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Network Stats */}
        <div>
          <Card className="bg-codechatter-dark border-codechatter-blue/20 mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-white">Your Network Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-codechatter-darker rounded-lg p-4 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center mr-4">
                    <span className="text-white font-bold">42</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Connections</h3>
                    <p className="text-white/60 text-sm">Your professional network</p>
                  </div>
                </div>
                
                <div className="bg-codechatter-darker rounded-lg p-4 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center mr-4">
                    <span className="text-white font-bold">12</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Active Collaborations</h3>
                    <p className="text-white/60 text-sm">Ongoing coding projects</p>
                  </div>
                </div>
                
                <div className="bg-codechatter-darker rounded-lg p-4 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center mr-4">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">New Interactions</h3>
                    <p className="text-white/60 text-sm">In the last 7 days</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90">
                  Expand Your Network
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Network;
