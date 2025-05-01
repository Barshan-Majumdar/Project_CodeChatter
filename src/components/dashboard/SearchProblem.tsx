
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProblemType {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  tags: string[];
}

interface SearchProblemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchProblem: React.FC<SearchProblemProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProblemType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // This is a mock database of problems
  // In a real app, you might fetch this from an API or Supabase
  const problemsDatabase: ProblemType[] = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/two-sum/",
      tags: ["Array", "Hash Table"]
    },
    {
      title: "Add Two Numbers",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/add-two-numbers/",
      tags: ["Linked List", "Math", "Recursion"]
    },
    {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      tags: ["Hash Table", "String", "Sliding Window"]
    },
    {
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      tags: ["Array", "Binary Search", "Divide and Conquer"]
    },
    {
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/longest-palindromic-substring/",
      tags: ["String", "Dynamic Programming"]
    },
    {
      title: "Regular Expression Matching",
      difficulty: "Hard",
      url: "https://leetcode.com/problems/regular-expression-matching/",
      tags: ["String", "Dynamic Programming", "Recursion"]
    },
    {
      title: "Container With Most Water",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/container-with-most-water/",
      tags: ["Array", "Two Pointers", "Greedy"]
    },
    {
      title: "3Sum",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/3sum/",
      tags: ["Array", "Two Pointers", "Sorting"]
    },
    {
      title: "Letter Combinations of a Phone Number",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
      tags: ["Hash Table", "String", "Backtracking"]
    },
    {
      title: "Remove Nth Node From End of List",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      tags: ["Linked List", "Two Pointers"]
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulating an API call with setTimeout
    setTimeout(() => {
      const results = problemsDatabase.filter(problem => 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleProblemClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Redirecting to LeetCode",
      description: "Opening problem in a new tab.",
    });

    onOpenChange(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-codechatter-dark border-codechatter-blue/20">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Search Problems</DialogTitle>
          <DialogDescription className="text-white/60">
            Search for a specific problem by title or tag
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems..."
              className="bg-codechatter-dark border-codechatter-blue/20 text-white pr-10"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            className="bg-codechatter-purple hover:bg-codechatter-purple/90"
            disabled={isSearching}
          >
            <Search size={18} className="mr-1" />
            Search
          </Button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {isSearching ? (
            <div className="text-center text-white/60 py-8">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((problem, index) => (
                <Card 
                  key={index} 
                  className="bg-codechatter-dark border-codechatter-blue/20 hover:border-codechatter-purple/50 transition-all cursor-pointer"
                  onClick={() => handleProblemClick(problem.url)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-medium">{problem.title}</h3>
                      <span className={`${getDifficultyColor(problem.difficulty)} text-sm`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="bg-codechatter-blue/20 text-codechatter-blue text-xs px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center text-white/60 py-8">No problems found</div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchProblem;
