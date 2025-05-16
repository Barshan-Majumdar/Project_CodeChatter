
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Code } from 'lucide-react';
import UserStats from '@/components/dashboard/UserStats';
import CreatePostForm from '@/components/dashboard/CreatePostForm';
import SocialFeed from '@/components/dashboard/SocialFeed';
import SearchProblem from '@/components/dashboard/SearchProblem';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  name: string;
  email: string;
  id?: string;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isBookmarked: boolean;
  type: 'status' | 'challenge-completion' | 'blog' | 'problem' | 'media';
  challengeDetails?: {
    title: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
  };
  blogTitle?: string;
  mediaUrl?: string;
  showComments?: boolean;
  backgroundColor?: string;
  tags?: string[];
  attachments?: File[];
  isSolved?: boolean;
  solution?: string;
  showSolutionInput?: boolean;
  isVerifying?: boolean;
  isVerified?: boolean;
  solutions?: string[];
}

// Improved function to simulate AI verification of code solution against the problem statement
const verifyCodeSolution = async (problemStatement: string, solution: string): Promise<boolean> => {
  // In a real implementation, this would call an API with OpenAI or Gemini integration
  console.log("Verifying solution for problem:", problemStatement);
  console.log("Solution provided:", solution);
  
  try {
    // Simulate API call to AI model
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, implement basic checks (in production use a real AI API)
    const solutionLength = solution.length > 10; // Solution should be substantive
    const containsCodePatterns = /function|if|for|while|return|const|let|var|class|=>/i.test(solution); // Contains code keywords
    
    // Check if solution matches problem context
    // This would be replaced with actual AI verification against the problem statement
    const problemKeywords = problemStatement.toLowerCase().match(/\b\w{4,}\b/g) || [];
    let matchCount = 0;
    
    for (const keyword of problemKeywords) {
      if (solution.toLowerCase().includes(keyword)) {
        matchCount++;
      }
    }
    
    const hasContextMatch = matchCount > 0;
    
    return solutionLength && containsCodePatterns && hasContextMatch;
  } catch (error) {
    console.error("AI verification error:", error);
    return false;
  }
};

// Function to update user stats when they solve a problem
const updateUserStats = async (userId: string, difficulty: string) => {
  try {
    // Calculate points based on difficulty
    let points = 0;
    switch (difficulty.toLowerCase()) {
      case 'easy':
        points = 10;
        break;
      case 'medium':
        points = 20;
        break;
      case 'hard':
        points = 40;
        break;
      default:
        points = 5;
    }
    
    // Record the solved problem
    const { error } = await supabase
      .from('solved_problems')
      .insert({
        user_id: userId,
        difficulty: difficulty.toLowerCase(),
        points,
        problem_url: window.location.href
      });
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error updating user stats:", error);
    return false;
  }
};

// Generate random posts for infinite scrolling
const generateRandomPosts = (count: number, startIndex: number): Post[] => {
  const postTypes = ['status', 'problem', 'media', 'blog', 'challenge-completion'];
  const users = ['Sarah Kim', 'Michael Wong', 'David Johnson', 'Emma Davis', 'Alex Chen'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const now = new Date();
  
  return Array(count).fill(null).map((_, idx) => {
    const type = postTypes[Math.floor(Math.random() * postTypes.length)] as Post['type'];
    const user = users[Math.floor(Math.random() * users.length)];
    const hoursAgo = Math.floor(Math.random() * 48);
    const timestamp = `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    const likes = Math.floor(Math.random() * 50);
    const id = `post-${startIndex + idx}-${Date.now()}`;
    
    const basePost: Post = {
      id,
      user: { name: user },
      content: `This is a sample ${type} post #${startIndex + idx}`,
      timestamp,
      likes,
      comments: [],
      isLiked: false,
      isBookmarked: false,
      type,
      showComments: false,
    };
    
    // Add type-specific properties
    if (type === 'problem') {
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      basePost.content = `Write a function to ${Math.random() > 0.5 ? 'calculate the fibonacci sequence' : 'find the maximum subarray sum'} with optimal time complexity.`;
      basePost.challengeDetails = {
        title: `Algorithm Challenge #${startIndex + idx}`,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard'
      };
      basePost.tags = ['algorithms', 'coding-challenge', difficulty.toLowerCase()];
    } else if (type === 'media') {
      basePost.mediaUrl = `https://picsum.photos/seed/${id}/800/450`;
    } else if (type === 'blog') {
      basePost.blogTitle = `How I solved the ${Math.random() > 0.5 ? 'binary tree traversal' : 'dynamic programming'} problem`;
      basePost.content = 'In this post I explain my approach to a difficult coding interview question...';
      basePost.tags = ['career', 'interview-prep', 'tutorial'];
    } else if (type === 'challenge-completion') {
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      basePost.content = `Just completed the "${Math.random() > 0.5 ? 'Two Sum' : 'Merge Sort'}" challenge!`;
      basePost.challengeDetails = {
        title: `${difficulty} Challenge Completed`,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard'
      };
      basePost.tags = ['achievement', difficulty.toLowerCase()];
    } else {
      // Regular status post
      basePost.content = `Working on a new project using ${Math.random() > 0.5 ? 'React and TypeScript' : 'Python and FastAPI'}. Making good progress! #coding #${Math.random() > 0.5 ? 'webdev' : 'machinelearning'}`;
      basePost.tags = ['project-update', Math.random() > 0.5 ? 'frontend' : 'backend'];
    }
    
    return basePost;
  });
};

const Home: React.FC = () => {
  const userData = useOutletContext<UserData>();
  const { toast } = useToast();
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Infinite scroll implementation
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  
  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  
  // Load initial posts
  useEffect(() => {
    loadMorePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const loadMorePosts = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const newPosts = generateRandomPosts(5, posts.length);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
      // For demo, we'll always have more posts
      setHasMore(true);
    }, 1000);
  };

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleBookmarkPost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  const handleToggleComments = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          showComments: !post.showComments
        };
      }
      return post;
    }));
  };

  const handleNewCommentChange = (postId: string, value: string) => {
    setNewComments({
      ...newComments,
      [postId]: value
    });
  };

  const handleAddComment = (postId: string) => {
    const commentContent = newComments[postId];
    if (!commentContent || !commentContent.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please write something before commenting.",
        variant: "destructive"
      });
      return;
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: { name: userData.name },
      content: commentContent,
      timestamp: 'Just now'
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    // Clear the comment input for this post
    setNewComments({
      ...newComments,
      [postId]: ''
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "Post Deleted",
      description: "Your post has been removed successfully."
    });
  };

  const handleEditPost = (postId: string, content: string, updatedComments?: Comment[]) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          content,
          comments: updatedComments || post.comments
        };
      }
      return post;
    }));
  };

  const handleToggleSolutionInput = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          showSolutionInput: !post.showSolutionInput,
          // Reset verification status when opening/closing the solution input
          isVerified: false,
          isVerifying: false
        };
      }
      return post;
    }));
  };

  const handleSolutionChange = (postId: string, solution: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          solution,
          // Reset verification status when the solution changes
          isVerified: false
        };
      }
      return post;
    }));
  };

  const handleVerifySolution = async (postId: string, solution: string) => {
    // Set the post to verifying state
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isVerifying: true,
          isVerified: false
        };
      }
      return post;
    }));
    
    try {
      // Get the problem post
      const post = posts.find(p => p.id === postId);
      if (!post) return;
      
      // Verify the solution using our AI verification function, passing both problem statement and solution
      const isValid = await verifyCodeSolution(post.content, solution);
      
      // Update the post with verification result
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            isVerifying: false,
            isVerified: isValid
          };
        }
        return p;
      }));
      
      // Show appropriate toast message
      if (isValid) {
        toast({
          title: "Solution Verified",
          description: "Your solution has been verified by AI. You can now submit it!"
        });
      } else {
        toast({
          title: "Verification Failed",
          description: "Your solution could not be verified against the problem statement. Please review and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error verifying solution:", error);
      
      // Update the post state on error
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            isVerifying: false,
            isVerified: false
          };
        }
        return p;
      }));
      
      // Show error toast
      toast({
        title: "Verification Error",
        description: "An error occurred while verifying your solution. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleSolveProblem = async (postId: string, solution?: string) => {
    if (solution) {
      // Find the post
      const post = posts.find(p => p.id === postId);
      if (!post) return;
      
      // If the solution isn't verified, we shouldn't allow submission
      if (!post.isVerified) {
        toast({
          title: "Solution Not Verified",
          description: "Please verify your solution before submitting.",
          variant: "destructive"
        });
        return;
      }
      
      // Update user stats for the solved problem
      if (userData.id) {
        const difficulty = post.challengeDetails?.difficulty || 'Easy';
        const statsUpdated = await updateUserStats(userData.id, difficulty);
        
        if (!statsUpdated) {
          toast({
            title: "Stats Update Failed",
            description: "We couldn't update your stats. Please try again.",
            variant: "destructive"
          });
          return;
        }
      }
      
      // Submit solution
      setPosts(posts.map(post => {
        if (post.id === postId) {
          // Store the current solution in the solutions array
          const existingSolutions = post.solutions || [];
          const newSolutions = [...existingSolutions, solution];
          
          return {
            ...post,
            isSolved: true,
            solutions: newSolutions,
            // Keep the solution input open for potential additional solutions
            showSolutionInput: true,
            // Reset the current solution after adding it to the solutions array
            solution: '',
            // Reset verification after submission
            isVerified: false,
            isVerifying: false
          };
        }
        return post;
      }));
      
      toast({
        title: "Solution Submitted",
        description: "You've successfully submitted your solution! You can add more solutions if you'd like."
      });
    } else {
      // Toggle solution input area
      handleToggleSolutionInput(postId);
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome Home, {userData.name}!</h1>
          <Button
            className="bg-codechatter-dark hover:bg-codechatter-purple/20 border border-codechatter-blue/20"
            onClick={() => setIsSearchDialogOpen(true)}
          >
            <Code size={18} className="mr-2" /> New Challenge
          </Button>
        </div>
        <p className="text-white/60">Your coding community updates</p>
      </header>

      {/* Search Problem Dialog */}
      <SearchProblem 
        open={isSearchDialogOpen} 
        onOpenChange={setIsSearchDialogOpen} 
      />

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {/* User Stats */}
        <UserStats userId={userData.id} />

        {/* Create Post */}
        <Card className="bg-codechatter-dark border-codechatter-blue/20">
          <CardContent className="pt-6">
            <CreatePostForm onPostCreated={handleCreatePost} userName={userData.name} />
          </CardContent>
        </Card>

        {/* Social Feed */}
        <SocialFeed 
          posts={posts}
          newComments={newComments}
          onLikePost={handleLikePost}
          onBookmarkPost={handleBookmarkPost}
          onToggleComments={handleToggleComments}
          onNewCommentChange={handleNewCommentChange}
          onAddComment={handleAddComment}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
          onSolveProblem={handleSolveProblem}
          onToggleSolutionInput={handleToggleSolutionInput}
          onSolutionChange={handleSolutionChange}
          onVerifySolution={handleVerifySolution}
        />
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-codechatter-blue"></div>
          </div>
        )}
        
        {/* Invisible element for intersection observer */}
        <div ref={lastPostRef} className="h-4"></div>
      </div>
    </div>
  );
};

export default Home;
