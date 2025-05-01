
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Code, ThumbsUp, MessageSquare, Star, BookOpen, Calendar, Award } from 'lucide-react';
import ProblemCard from '@/components/dashboard/ProblemCard';

interface Post {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  type: 'status' | 'challenge-completion' | 'blog';
  challengeDetails?: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
  blogTitle?: string;
}

const Home: React.FC = () => {
  const recentProblems = [
    {
      title: "Two Sum",
      difficulty: "Easy" as const,
      points: 20,
      tags: ["Arrays", "Hash Table"],
      solvedBy: 1204
    },
    {
      title: "Binary Search Tree Validator",
      difficulty: "Medium" as const,
      points: 50,
      tags: ["Data Structure", "Trees", "Recursion"],
      solvedBy: 245
    },
  ];
  
  const posts: Post[] = [
    {
      id: '1',
      user: { name: 'Alex Chen' },
      content: 'Just completed a 30-day coding challenge! Improved my skills in algorithmic thinking and problem-solving approaches.',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 5,
      isLiked: true,
      isBookmarked: false,
      type: 'status'
    },
    {
      id: '2',
      user: { name: 'Sarah Kim' },
      content: 'Finally solved the "Dynamic Programming Challenge" after 3 days of effort! The key insight was optimizing the recursive solution with memoization.',
      timestamp: '5 hours ago',
      likes: 42,
      comments: 8,
      isLiked: false,
      isBookmarked: true,
      type: 'challenge-completion',
      challengeDetails: {
        title: 'Dynamic Programming Challenge',
        difficulty: 'Hard'
      }
    },
    {
      id: '3',
      user: { name: 'Michael Wong' },
      content: 'I wrote a blog post about efficient tree traversal techniques that can improve your problem-solving speed. Check it out and let me know your thoughts!',
      timestamp: 'Yesterday',
      likes: 36,
      comments: 12,
      isLiked: false,
      isBookmarked: false,
      type: 'blog',
      blogTitle: 'Efficient Tree Traversal Techniques for Coding Interviews'
    },
  ];

  const upcomingEvents = [
    { name: 'Weekly Coding Contest', date: 'Saturday, 10:00 AM' },
    { name: 'Algorithms Study Group', date: 'Wednesday, 7:00 PM' },
    { name: 'System Design Workshop', date: 'Next Monday, 6:30 PM' }
  ];

  return (
    <div className="p-6">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome Home, John!</h1>
          <Button
            className="bg-codechatter-dark hover:bg-codechatter-purple/20 border border-codechatter-blue/20"
          >
            <Code size={18} className="mr-2" /> New Challenge
          </Button>
        </div>
        <p className="text-white/60">Your coding community updates</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* User Stats */}
          <div className="bg-codechatter-dark rounded-lg border border-codechatter-blue/20 p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <p className="text-white/60 text-sm">Problems Solved</p>
                <p className="text-2xl font-bold text-codechatter-blue mt-1">37</p>
              </div>
              <div className="p-3 border-l border-codechatter-blue/20">
                <p className="text-white/60 text-sm">Current Streak</p>
                <p className="text-2xl font-bold text-codechatter-purple mt-1">5 days</p>
              </div>
              <div className="p-3 border-l border-codechatter-blue/20">
                <p className="text-white/60 text-sm">Total Points</p>
                <p className="text-2xl font-bold text-green-400 mt-1">920</p>
              </div>
              <div className="p-3 border-l border-codechatter-blue/20">
                <p className="text-white/60 text-sm">Global Rank</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">#125</p>
              </div>
            </div>
          </div>

          {/* Social Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-codechatter-dark border-codechatter-blue/20">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium">
                        {post.user.name.charAt(0)}
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-white">{post.user.name}</h3>
                      <div className="flex items-center text-white/40 text-xs">
                        <span>{post.timestamp}</span>
                        {post.type === 'challenge-completion' && (
                          <>
                            <span className="mx-1">•</span>
                            <Badge 
                              className={`
                                text-xs ${
                                  post.challengeDetails?.difficulty === 'Easy' ? 'bg-green-600/20 text-green-400' :
                                  post.challengeDetails?.difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                                  'bg-red-600/20 text-red-400'
                                }
                              `}
                            >
                              {post.challengeDetails?.difficulty} Challenge
                            </Badge>
                          </>
                        )}
                        {post.type === 'blog' && (
                          <>
                            <span className="mx-1">•</span>
                            <Badge className="bg-codechatter-blue/20 text-codechatter-blue text-xs">Blog Post</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    {post.type === 'blog' && post.blogTitle && (
                      <h4 className="font-medium text-white mb-2">{post.blogTitle}</h4>
                    )}
                    <p className="text-white/80 text-sm">{post.content}</p>
                  </div>
                  
                  {post.challengeDetails && (
                    <div className="mb-4 p-3 rounded bg-codechatter-purple/10 border border-codechatter-purple/20">
                      <div className="flex items-center">
                        <Code size={16} className="text-codechatter-purple mr-2" />
                        <span className="text-white text-sm font-medium">{post.challengeDetails.title}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center space-x-4 text-sm">
                      <Button variant="ghost" size="sm" className={`text-white/60 hover:text-white ${post.isLiked ? 'text-codechatter-blue' : ''}`}>
                        <ThumbsUp size={16} className="mr-1" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                        <MessageSquare size={16} className="mr-1" />
                        <span>{post.comments}</span>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className={`text-white/60 hover:text-white ${post.isBookmarked ? 'text-yellow-400' : ''}`}>
                      <Star size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Recommended Problems */}
          <Card className="bg-codechatter-dark border-codechatter-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <BookOpen size={18} className="mr-2 text-codechatter-blue" />
                Recommended Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentProblems.map((problem, index) => (
                <ProblemCard 
                  key={index} 
                  title={problem.title}
                  difficulty={problem.difficulty}
                  points={problem.points}
                  tags={problem.tags}
                  solvedBy={problem.solvedBy}
                />
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                className="w-full border-codechatter-blue/20 text-codechatter-blue hover:bg-codechatter-blue/10"
              >
                View All Problems
              </Button>
            </CardFooter>
          </Card>
          
          {/* Upcoming Events */}
          <Card className="bg-codechatter-dark border-codechatter-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <Calendar size={18} className="mr-2 text-codechatter-purple" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg bg-codechatter-darker border border-codechatter-blue/10 hover:border-codechatter-purple/30 transition-colors"
                >
                  <h4 className="font-medium text-white text-sm">{event.name}</h4>
                  <p className="text-white/60 text-xs mt-1 flex items-center">
                    <Calendar size={12} className="mr-1" /> {event.date}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                className="w-full border-codechatter-purple/20 text-codechatter-purple hover:bg-codechatter-purple/10"
              >
                View Calendar
              </Button>
            </CardFooter>
          </Card>
          
          {/* Top Performers */}
          <Card className="bg-codechatter-dark border-codechatter-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <Award size={18} className="mr-2 text-yellow-400" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center p-2 rounded-lg hover:bg-codechatter-darker">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center mr-3 text-xs font-bold text-white">
                    {rank}
                  </div>
                  <Avatar className="h-8 w-8 mr-3">
                    <div className="bg-gradient-to-br from-codechatter-purple to-codechatter-blue w-full h-full flex items-center justify-center text-white font-medium">
                      {rank === 1 ? 'A' : rank === 2 ? 'S' : 'M'}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {rank === 1 ? 'Alex Chen' : rank === 2 ? 'Sarah Kim' : 'Michael Wong'}
                    </p>
                    <p className="text-white/60 text-xs">
                      {rank === 1 ? '3850 points' : rank === 2 ? '3720 points' : '3540 points'}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                className="w-full border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10"
              >
                View Leaderboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
