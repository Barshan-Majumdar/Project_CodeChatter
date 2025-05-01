
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Award, Medal, ChevronUp, ChevronDown, Filter } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  username: string;
  points: number;
  problemsSolved: number;
  level: string;
  change: 'up' | 'down' | 'none';
  changeAmount?: number;
  isConnected: boolean;
}

type SortKey = 'rank' | 'points' | 'problemsSolved';
type TimeFrame = 'all-time' | 'monthly' | 'weekly' | 'daily';

const Leaderboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortKey>('rank');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('all-time');
  
  const timeFrameOptions: {value: TimeFrame, label: string}[] = [
    { value: 'all-time', label: 'All Time' },
    { value: 'monthly', label: 'This Month' },
    { value: 'weekly', label: 'This Week' },
    { value: 'daily', label: 'Today' }
  ];
  
  const leaderboardData: LeaderboardUser[] = [
    { 
      id: '1', 
      rank: 1, 
      name: 'Alex Chen', 
      username: 'alexc', 
      points: 3850, 
      problemsSolved: 145, 
      level: 'Master', 
      change: 'none',
      isConnected: true
    },
    { 
      id: '2', 
      rank: 2, 
      name: 'Sarah Kim', 
      username: 'sarahk', 
      points: 3720, 
      problemsSolved: 138, 
      level: 'Master', 
      change: 'up',
      changeAmount: 1,
      isConnected: false
    },
    { 
      id: '3', 
      rank: 3, 
      name: 'Michael Wong', 
      username: 'mikew', 
      points: 3540, 
      problemsSolved: 132, 
      level: 'Expert', 
      change: 'down',
      changeAmount: 1,
      isConnected: true
    },
    { 
      id: '4', 
      rank: 4, 
      name: 'David Johnson', 
      username: 'davidj', 
      points: 3210, 
      problemsSolved: 120, 
      level: 'Expert', 
      change: 'up',
      changeAmount: 2,
      isConnected: false
    },
    { 
      id: '5', 
      rank: 5, 
      name: 'Emma Davis', 
      username: 'emmad', 
      points: 2950, 
      problemsSolved: 112, 
      level: 'Advanced', 
      change: 'none',
      isConnected: false
    },
    { 
      id: '6', 
      rank: 6, 
      name: 'James Wilson', 
      username: 'jamesw', 
      points: 2840, 
      problemsSolved: 105, 
      level: 'Advanced', 
      change: 'down',
      changeAmount: 3,
      isConnected: false
    },
    { 
      id: '7', 
      rank: 7, 
      name: 'Sophia Garcia', 
      username: 'sophiag', 
      points: 2780, 
      problemsSolved: 98, 
      level: 'Advanced', 
      change: 'up',
      changeAmount: 1,
      isConnected: true
    },
    { 
      id: '8', 
      rank: 8, 
      name: 'Daniel Lee', 
      username: 'daniell', 
      points: 2640, 
      problemsSolved: 92, 
      level: 'Advanced', 
      change: 'none',
      isConnected: false
    },
    { 
      id: '9', 
      rank: 9, 
      name: 'Olivia Brown', 
      username: 'oliviab', 
      points: 2570, 
      problemsSolved: 89, 
      level: 'Advanced', 
      change: 'down',
      changeAmount: 2,
      isConnected: false
    },
    { 
      id: '10', 
      rank: 10, 
      name: 'Ethan Smith', 
      username: 'ethans', 
      points: 2490, 
      problemsSolved: 87, 
      level: 'Advanced', 
      change: 'up',
      changeAmount: 3,
      isConnected: false
    },
  ];

  // Sort function based on selected criteria
  const sortedData = [...leaderboardData].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    if (sortBy === 'points') return b.points - a.points;
    return b.problemsSolved - a.problemsSolved;
  });
  
  // Get the ranking badge for top 3
  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Award size={16} className="text-yellow-400" />;
    if (rank === 2) return <Award size={16} className="text-gray-300" />;
    if (rank === 3) return <Award size={16} className="text-amber-700" />;
    return null;
  };

  // Get the user's current rank info
  const userRank = {
    rank: 25,
    points: 920,
    problemsSolved: 37,
    level: 'Intermediate'
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Global Leaderboard</h1>
        <p className="text-white/60">See how you compare with coders worldwide</p>
      </header>

      {/* User's own ranking */}
      <Card className="bg-codechatter-blue/20 border-codechatter-blue/40 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="bg-codechatter-purple/30 rounded-full h-10 w-10 flex items-center justify-center mr-4">
              <span className="font-bold text-white">#{userRank.rank}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">Your Current Ranking</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-white/70">
                <span>{userRank.points} points</span>
                <span>{userRank.problemsSolved} problems solved</span>
                <Badge className="bg-codechatter-purple/30 text-codechatter-purple">{userRank.level}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-white/60" />
          <span className="text-white font-medium">Time Frame:</span>
          <div className="flex flex-wrap gap-2">
            {timeFrameOptions.map(option => (
              <Button 
                key={option.value}
                size="sm"
                variant={timeFrame === option.value ? "default" : "outline"}
                className={`h-8 ${
                  timeFrame === option.value 
                    ? 'bg-codechatter-blue' 
                    : 'bg-codechatter-dark border-codechatter-blue/20'
                }`}
                onClick={() => setTimeFrame(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Sort By:</span>
          <Button 
            size="sm"
            variant={sortBy === 'rank' ? "default" : "outline"}
            className={`h-8 ${sortBy === 'rank' ? 'bg-codechatter-purple' : 'bg-codechatter-dark border-codechatter-blue/20'}`}
            onClick={() => setSortBy('rank')}
          >
            Rank
          </Button>
          <Button 
            size="sm"
            variant={sortBy === 'points' ? "default" : "outline"}
            className={`h-8 ${sortBy === 'points' ? 'bg-codechatter-purple' : 'bg-codechatter-dark border-codechatter-blue/20'}`}
            onClick={() => setSortBy('points')}
          >
            Points
          </Button>
          <Button 
            size="sm"
            variant={sortBy === 'problemsSolved' ? "default" : "outline"}
            className={`h-8 ${sortBy === 'problemsSolved' ? 'bg-codechatter-purple' : 'bg-codechatter-dark border-codechatter-blue/20'}`}
            onClick={() => setSortBy('problemsSolved')}
          >
            Problems Solved
          </Button>
        </div>
      </div>

      {/* Leaderboard table */}
      <Card className="bg-codechatter-dark border-codechatter-blue/20">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg text-white">Top Coders {timeFrame !== 'all-time' && `- ${timeFrameOptions.find(o => o.value === timeFrame)?.label}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 text-xs text-white/70 py-3 border-b border-white/10">
              <div className="col-span-1 pl-2">#</div>
              <div className="col-span-5">Coder</div>
              <div className="col-span-2 text-center">Points</div>
              <div className="col-span-2 text-center">Solved</div>
              <div className="col-span-1 text-center">Level</div>
              <div className="col-span-1"></div>
            </div>
            
            {/* Leaderboard rows */}
            {sortedData.map((user) => (
              <div 
                key={user.id} 
                className={`grid grid-cols-12 items-center py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${
                  user.rank <= 3 ? 'bg-codechatter-darker' : ''
                }`}
              >
                <div className="col-span-1 pl-2 flex items-center text-white/70 text-sm">
                  {getRankBadge(user.rank) || user.rank}
                  {user.change !== 'none' && (
                    <span className={`ml-1 text-xs ${
                      user.change === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {user.change === 'up' ? 
                        <ChevronUp size={14} /> : 
                        <ChevronDown size={14} />
                      }
                    </span>
                  )}
                </div>
                <div className="col-span-5 flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium text-xs">
                      {user.name.charAt(0)}
                    </div>
                  </Avatar>
                  <div>
                    <span className="text-white text-sm truncate block">{user.name}</span>
                    <span className="text-white/50 text-xs">@{user.username}</span>
                  </div>
                </div>
                <div className="col-span-2 text-center font-medium text-sm text-codechatter-purple">
                  {user.points}
                </div>
                <div className="col-span-2 text-center text-white/70 text-sm">
                  {user.problemsSolved}
                </div>
                <div className="col-span-1 text-center">
                  <Badge variant="outline" className={`
                    ${user.level === 'Master' ? 'border-codechatter-purple/30 text-codechatter-purple' : ''}
                    ${user.level === 'Expert' ? 'border-codechatter-blue/30 text-codechatter-blue' : ''}
                    ${user.level === 'Advanced' ? 'border-yellow-500/30 text-yellow-400' : ''}
                  `}>
                    {user.level}
                  </Badge>
                </div>
                <div className="col-span-1 text-right pr-2">
                  {!user.isConnected && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <UserPlus size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 bg-codechatter-dark border-codechatter-blue/20"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 bg-codechatter-blue border-codechatter-blue"
              >
                1
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 bg-codechatter-dark border-codechatter-blue/20"
              >
                2
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 bg-codechatter-dark border-codechatter-blue/20"
              >
                3
              </Button>
              <span className="text-white/60">...</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 bg-codechatter-dark border-codechatter-blue/20"
              >
                10
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 bg-codechatter-dark border-codechatter-blue/20"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
