
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Award } from 'lucide-react';

const TopPerformers: React.FC = () => {
  const performers = [
    {
      rank: 1,
      name: 'Alex Chen',
      points: '3850 points',
      initial: 'A'
    },
    {
      rank: 2, 
      name: 'Sarah Kim',
      points: '3720 points',
      initial: 'S'
    },
    {
      rank: 3,
      name: 'Michael Wong',
      points: '3540 points',
      initial: 'M'
    }
  ];

  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center">
          <Award size={18} className="mr-2 text-yellow-400" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {performers.map((performer) => (
          <div key={performer.rank} className="flex items-center p-2 rounded-lg hover:bg-codechatter-darker">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center mr-3 text-xs font-bold text-white">
              {performer.rank}
            </div>
            <Avatar className="h-8 w-8 mr-3">
              <div className="bg-gradient-to-br from-codechatter-purple to-codechatter-blue w-full h-full flex items-center justify-center text-white font-medium">
                {performer.initial}
              </div>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {performer.name}
              </p>
              <p className="text-white/60 text-xs">
                {performer.points}
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
  );
};

export default TopPerformers;
