
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import ProblemCard from '@/components/dashboard/ProblemCard';

interface Problem {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  tags: string[];
  solvedBy: number;
  url: string;
}

interface RecommendedProblemsProps {
  problems: Problem[];
  onProblemClick: (url: string) => void;
}

const RecommendedProblems: React.FC<RecommendedProblemsProps> = ({ problems, onProblemClick }) => {
  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center">
          <BookOpen size={18} className="mr-2 text-codechatter-blue" />
          Recommended Problems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {problems.map((problem, index) => (
          <div 
            key={index} 
            className="cursor-pointer" 
            onClick={() => onProblemClick(problem.url)}
          >
            <ProblemCard 
              title={problem.title}
              difficulty={problem.difficulty}
              points={problem.points}
              tags={problem.tags}
              solvedBy={problem.solvedBy}
            />
          </div>
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
  );
};

export default RecommendedProblems;
