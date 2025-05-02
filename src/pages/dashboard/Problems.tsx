
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProblemCard from '@/components/dashboard/ProblemCard';
import { Button } from '@/components/ui/button';
import { Search, Filter, Loader2, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchProblem from '@/components/dashboard/SearchProblem';

const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Mixed'];
const topics = ['All', 'Arrays', 'Strings', 'Dynamic Programming', 'Graphs', 'Trees', 'Hash Tables', 'Math', 'Greedy', 'Binary Search'];

interface ProblemType {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  tags: string[];
  solvedBy: number;
  url: string;
}

const Problems: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const itemsPerPage = 6;

  // Extended problem dataset
  const allProblems: ProblemType[] = [
    {
      title: "Binary Search Tree Validator",
      difficulty: "Medium",
      points: 50,
      tags: ["Data Structure", "Trees", "Recursion"],
      solvedBy: 245,
      url: "https://leetcode.com/problems/validate-binary-search-tree/"
    },
    {
      title: "Two Sum",
      difficulty: "Easy",
      points: 20,
      tags: ["Arrays", "Hash Table"],
      solvedBy: 1204,
      url: "https://leetcode.com/problems/two-sum/"
    },
    {
      title: "Dynamic Programming Challenge",
      difficulty: "Hard",
      points: 100,
      tags: ["DP", "Algorithms", "Optimization"],
      solvedBy: 128,
      url: "https://leetcode.com/problems/unique-paths/"
    },
    {
      title: "Linked List Cycle Detection",
      difficulty: "Medium",
      points: 45,
      tags: ["Data Structure", "Linked Lists", "Two Pointers"],
      solvedBy: 387,
      url: "https://leetcode.com/problems/linked-list-cycle/"
    },
    {
      title: "Valid Parentheses",
      difficulty: "Easy",
      points: 25,
      tags: ["Stack", "Strings"],
      solvedBy: 876,
      url: "https://leetcode.com/problems/valid-parentheses/"
    },
    {
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      points: 90,
      tags: ["Linked Lists", "Heap", "Divide and Conquer"],
      solvedBy: 157,
      url: "https://leetcode.com/problems/merge-k-sorted-lists/"
    },
    {
      title: "Maximum Subarray",
      difficulty: "Medium",
      points: 40,
      tags: ["Arrays", "DP", "Divide and Conquer"],
      solvedBy: 542,
      url: "https://leetcode.com/problems/maximum-subarray/"
    },
    {
      title: "LRU Cache Implementation",
      difficulty: "Medium",
      points: 55,
      tags: ["Hash Table", "Linked Lists", "Design"],
      solvedBy: 211,
      url: "https://leetcode.com/problems/lru-cache/"
    },
    // Additional problems
    {
      title: "Add Two Numbers",
      difficulty: "Medium",
      points: 35,
      tags: ["Linked Lists", "Math", "Recursion"],
      solvedBy: 723,
      url: "https://leetcode.com/problems/add-two-numbers/"
    },
    {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      points: 45,
      tags: ["Hash Table", "Strings", "Sliding Window"],
      solvedBy: 891,
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
    },
    {
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      points: 110,
      tags: ["Arrays", "Binary Search", "Divide and Conquer"],
      solvedBy: 102,
      url: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
    },
    {
      title: "Container With Most Water",
      difficulty: "Medium",
      points: 50,
      tags: ["Arrays", "Two Pointers", "Greedy"],
      solvedBy: 421,
      url: "https://leetcode.com/problems/container-with-most-water/"
    },
    {
      title: "3Sum",
      difficulty: "Medium",
      points: 55,
      tags: ["Arrays", "Two Pointers", "Sorting"],
      solvedBy: 378,
      url: "https://leetcode.com/problems/3sum/"
    },
    {
      title: "Reverse Integer",
      difficulty: "Easy",
      points: 15,
      tags: ["Math", "Bit Manipulation"],
      solvedBy: 967,
      url: "https://leetcode.com/problems/reverse-integer/"
    },
    {
      title: "Palindrome Number",
      difficulty: "Easy",
      points: 10,
      tags: ["Math"],
      solvedBy: 1156,
      url: "https://leetcode.com/problems/palindrome-number/"
    },
    {
      title: "Roman to Integer",
      difficulty: "Easy",
      points: 15,
      tags: ["Math", "String"],
      solvedBy: 1043,
      url: "https://leetcode.com/problems/roman-to-integer/"
    }
  ];

  const loadMoreProblems = () => {
    setLoading(true);
    setIsShowingMore(true);
    
    // Simulate network delay for loading more problems
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const filteredProblems = allProblems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = 
      selectedDifficulty === 'All' || 
      selectedDifficulty === 'Mixed' ||
      problem.difficulty === selectedDifficulty;
    
    const matchesTopic = selectedTopic === 'All' || problem.tags.some(tag => 
      tag.toLowerCase().includes(selectedTopic.toLowerCase())
    );
    
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  
  const currentProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProblemClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Redirecting to LeetCode",
      description: "Opening problem in a new tab.",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Problems Library</h1>
          <Button
            onClick={() => setIsSearchDialogOpen(true)}
            className="bg-codechatter-purple hover:bg-codechatter-purple/90"
          >
            <Search size={18} className="mr-2" /> New Challenge
          </Button>
        </div>
        <p className="text-white/60">Practice your coding skills with these challenges</p>
      </header>

      <SearchProblem 
        open={isSearchDialogOpen} 
        onOpenChange={setIsSearchDialogOpen} 
      />

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
        {currentProblems.map((problem, index) => (
          <div 
            key={index} 
            className="cursor-pointer" 
            onClick={() => handleProblemClick(problem.url)}
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
      </div>

      {filteredProblems.length === 0 && (
        <Card className="bg-codechatter-dark border-codechatter-blue/20">
          <CardContent className="flex items-center justify-center h-32 text-white/60">
            No problems match your current filters. Try adjusting your search.
          </CardContent>
        </Card>
      )}

      {filteredProblems.length > 0 && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink 
                      isActive={currentPage === pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {totalPages > 5 && (
                <PaginationItem>
                  <span className="flex items-center justify-center h-9 w-9">
                    ...
                  </span>
                </PaginationItem>
              )}
              
              {totalPages > 5 && (
                <PaginationItem>
                  <PaginationLink 
                    onClick={() => handlePageChange(totalPages)}
                    className="cursor-pointer"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <Button 
            variant="outline" 
            className="border-codechatter-blue/20 text-codechatter-blue hover:bg-codechatter-blue/10"
            onClick={loadMoreProblems}
            disabled={loading || isShowingMore}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" /> 
                Loading more problems...
              </>
            ) : isShowingMore ? (
              "All problems loaded"
            ) : (
              <>
                <ChevronDown size={16} className="mr-2" /> 
                Load More Problems from LeetCode
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Problems;
