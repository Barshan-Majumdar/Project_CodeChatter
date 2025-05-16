
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Code } from 'lucide-react';
import UserStats from '@/components/dashboard/UserStats';
import CreatePostForm from '@/components/dashboard/CreatePostForm';
import SocialFeed from '@/components/dashboard/SocialFeed';
import SearchProblem from '@/components/dashboard/SearchProblem';
import { useOutletContext } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
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
// In a real implementation, this would call an API or an edge function with GPT/Gemini integration
const verifyCodeSolution = async (problemStatement: string, solution: string): Promise<boolean> => {
  // This is a placeholder for a real AI verification
  // In a real implementation, you would send the problem statement and solution to an AI model
  console.log("Verifying solution for problem:", problemStatement);
  console.log("Solution provided:", solution);
  
  // Simulate network delay for verification
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demo purposes, let's implement a basic check
  // In production, this would be replaced with a call to OpenAI/Gemini API
  
  // Simulate basic criteria check - real AI would do more comprehensive analysis
  const solutionLength = solution.length > 10; // Solution should be substantive
  const containsCodePatterns = /function|if|for|while|return|const|let|var|class|=>/i.test(solution); // Contains code keywords
  const matchesProblemContext = true; // In real AI check, it would verify solution against problem context
  
  return solutionLength && containsCodePatterns && matchesProblemContext;
};

const Home: React.FC = () => {
  const userData = useOutletContext<UserData>();
  const { toast } = useToast();
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

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

  const handleSolveProblem = (postId: string, solution?: string) => {
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
        <UserStats />

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
      </div>
    </div>
  );
};

export default Home;
