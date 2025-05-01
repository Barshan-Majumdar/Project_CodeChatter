
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProblemCardProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  tags: string[];
  solvedBy: number;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  title,
  difficulty,
  points,
  tags,
  solvedBy,
}) => {
  const difficultyColor = {
    Easy: 'bg-green-600/20 text-green-400 border-green-600/20',
    Medium: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/20',
    Hard: 'bg-red-600/20 text-red-400 border-red-600/20',
  }[difficulty];

  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20 hover:border-codechatter-purple/50 transition-all h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-white text-lg">{title}</CardTitle>
          <Badge className={`${difficultyColor} ml-2`}>{difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-transparent border-codechatter-blue/30 text-codechatter-blue">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-white/60 text-sm">
            <span className="text-codechatter-purple font-medium">{points}</span> points
          </div>
          <div className="text-white/60 text-sm">
            Solved by <span className="text-codechatter-blue font-medium">{solvedBy}</span> coders
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90">
          Solve Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
