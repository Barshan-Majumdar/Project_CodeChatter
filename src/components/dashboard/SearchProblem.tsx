
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // In a production app, we would call a Supabase Edge Function that interfaces with LeetCode API
      // For demo purposes, we'll simulate the API call with our local database
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter the problems based on the search query
      const filteredProblems = problemsDatabase.filter(problem => 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      // Log successful search
      console.log(`Search for "${searchQuery}" returned ${filteredProblems.length} results`);
      
      setSearchResults(filteredProblems);
    } catch (error) {
      console.error('Error searching problems:', error);
      toast({
        title: "Search failed",
        description: "There was an error searching for problems. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleProblemClick = (url: string) => {
    // Track problem click in analytics (would be implemented with Supabase in a real app)
    console.log(`Opening problem: ${url}`);
    
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

  // This is a mock database of problems
  // In a real app, this would be fetched from the LeetCode API via a Supabase Edge Function
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
    },
    {
      title: "Valid Parentheses",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/valid-parentheses/",
      tags: ["String", "Stack"]
    },
    {
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/merge-two-sorted-lists/",
      tags: ["Linked List", "Recursion"]
    },
    {
      title: "Generate Parentheses",
      difficulty: "Medium",
      url: "https://leetcode.com/problems/generate-parentheses/",
      tags: ["String", "Backtracking", "Dynamic Programming"]
    },
    {
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      url: "https://leetcode.com/problems/merge-k-sorted-lists/",
      tags: ["Linked List", "Heap", "Divide and Conquer"]
    },
    {
      title: "Trapping Rain Water",
      difficulty: "Hard",
      url: "https://leetcode.com/problems/trapping-rain-water/",
      tags: ["Array", "Two Pointers", "Stack", "Dynamic Programming"]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-codechatter-dark border-codechatter-blue/20">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Search LeetCode Problems</DialogTitle>
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
            {isSearching ? (
              <Loader2 size={18} className="mr-1 animate-spin" />
            ) : (
              <Search size={18} className="mr-1" />
            )}
            Search
          </Button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {isSearching ? (
            <div className="text-center text-white/60 py-8">Searching LeetCode problems...</div>
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
