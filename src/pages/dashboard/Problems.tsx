
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProblemCard from '@/components/dashboard/ProblemCard';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
const topics = ['All', 'Arrays', 'Strings', 'Dynamic Programming', 'Graphs', 'Trees', 'Hash Tables'];

interface ProblemType {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  tags: string[];
  solvedBy: number;
}

const Problems: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const problems: ProblemType[] = [
    {
      title: "Binary Search Tree Validator",
      difficulty: "Medium",
      points: 50,
      tags: ["Data Structure", "Trees", "Recursion"],
      solvedBy: 245
    },
    {
      title: "Two Sum",
      difficulty: "Easy",
      points: 20,
      tags: ["Arrays", "Hash Table"],
      solvedBy: 1204
    },
    {
      title: "Dynamic Programming Challenge",
      difficulty: "Hard",
      points: 100,
      tags: ["DP", "Algorithms", "Optimization"],
      solvedBy: 128
    },
    {
      title: "Linked List Cycle Detection",
      difficulty: "Medium",
      points: 45,
      tags: ["Data Structure", "Linked Lists", "Two Pointers"],
      solvedBy: 387
    },
    {
      title: "Valid Parentheses",
      difficulty: "Easy",
      points: 25,
      tags: ["Stack", "Strings"],
      solvedBy: 876
    },
    {
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      points: 90,
      tags: ["Linked Lists", "Heap", "Divide and Conquer"],
      solvedBy: 157
    },
    {
      title: "Maximum Subarray",
      difficulty: "Medium",
      points: 40,
      tags: ["Arrays", "DP", "Divide and Conquer"],
      solvedBy: 542
    },
    {
      title: "LRU Cache Implementation",
      difficulty: "Medium",
      points: 55,
      tags: ["Hash Table", "Linked Lists", "Design"],
      solvedBy: 211
    }
  ];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || problem.tags.some(tag => 
      tag.toLowerCase().includes(selectedTopic.toLowerCase())
    );
    
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Problems Library</h1>
        <p className="text-white/60">Practice your coding skills with these challenges</p>
      </header>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search problems..."
            className="bg-codechatter-dark border-codechatter-blue/20 text-white pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-white/60" />
          <div className="flex flex-wrap gap-2 items-center">
            {difficulties.map(difficulty => (
              <Button 
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                className={`text-xs h-8 px-3 ${
                  selectedDifficulty === difficulty 
                    ? 'bg-codechatter-purple' 
                    : 'bg-codechatter-dark border-codechatter-blue/20'
                }`}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {topics.map(topic => (
          <Button 
            key={topic}
            variant={selectedTopic === topic ? "default" : "outline"}
            size="sm"
            className={`text-xs ${
              selectedTopic === topic 
                ? 'bg-codechatter-blue' 
                : 'bg-codechatter-dark border-codechatter-blue/20'
            }`}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProblems.map((problem, index) => (
          <ProblemCard 
            key={index} 
            title={problem.title}
            difficulty={problem.difficulty}
            points={problem.points}
            tags={problem.tags}
            solvedBy={problem.solvedBy}
          />
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <Card className="bg-codechatter-dark border-codechatter-blue/20">
          <CardContent className="flex items-center justify-center h-32 text-white/60">
            No problems match your current filters. Try adjusting your search.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Problems;
