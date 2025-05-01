
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  problemsSolved: number;
  level: string;
}

const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: 'Alex Chen', points: 3850, problemsSolved: 145, level: 'Master' },
  { rank: 2, name: 'Sarah Kim', points: 3720, problemsSolved: 138, level: 'Master' },
  { rank: 3, name: 'Michael Wong', points: 3540, problemsSolved: 132, level: 'Expert' },
  { rank: 4, name: 'David Johnson', points: 3210, problemsSolved: 120, level: 'Expert' },
  { rank: 5, name: 'Emma Davis', points: 2950, problemsSolved: 112, level: 'Advanced' },
];

const LeaderboardTable: React.FC = () => {
  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20 h-full">
      <CardHeader>
        <CardTitle className="text-white text-lg">Top Coders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 text-xs text-white/70 py-2 border-b border-white/10">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Coder</div>
            <div className="col-span-2 text-center">Points</div>
            <div className="col-span-2 text-center">Solved</div>
            <div className="col-span-2 text-right">Level</div>
          </div>

          {leaderboardData.map((user) => (
            <div key={user.rank} className="grid grid-cols-12 items-center py-3 border-b border-white/5 hover:bg-white/5 transition-colors">
              <div className="col-span-1 text-white/70 text-sm">{user.rank}</div>
              <div className="col-span-5 flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium text-xs">
                    {user.name.charAt(0)}
                  </div>
                </Avatar>
                <span className="text-white text-sm truncate">{user.name}</span>
              </div>
              <div className="col-span-2 text-center font-medium text-sm text-codechatter-purple">
                {user.points}
              </div>
              <div className="col-span-2 text-center text-white/70 text-sm">
                {user.problemsSolved}
              </div>
              <div className="col-span-2 text-right">
                <Badge variant="outline" className={`
                  ${user.level === 'Master' ? 'border-codechatter-purple/30 text-codechatter-purple' : ''}
                  ${user.level === 'Expert' ? 'border-codechatter-blue/30 text-codechatter-blue' : ''}
                  ${user.level === 'Advanced' ? 'border-yellow-500/30 text-yellow-500' : ''}
                `}>
                  {user.level}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTable;
