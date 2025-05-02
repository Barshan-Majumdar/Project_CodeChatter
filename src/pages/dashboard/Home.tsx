
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Code } from 'lucide-react';
import UserStats from '@/components/dashboard/UserStats';
import CreatePostForm from '@/components/dashboard/CreatePostForm';
import SocialFeed from '@/components/dashboard/SocialFeed';
import SearchProblem from '@/components/dashboard/SearchProblem';

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
  type: 'status' | 'challenge-completion' | 'blog';
  challengeDetails?: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
  blogTitle?: string;
  showComments?: boolean;
}

const Home: React.FC = () => {
  const { toast } = useToast();
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: { name: 'Alex Chen' },
      content: 'Just completed a 30-day coding challenge! Improved my skills in algorithmic thinking and problem-solving approaches.',
      timestamp: '2 hours ago',
      likes: 24,
      comments: [],
      isLiked: true,
      isBookmarked: false,
      type: 'status',
      showComments: false
    },
    {
      id: '2',
      user: { name: 'Sarah Kim' },
      content: 'Finally solved the "Dynamic Programming Challenge" after 3 days of effort! The key insight was optimizing the recursive solution with memoization.',
      timestamp: '5 hours ago',
      likes: 42,
      comments: [
        {
          id: 'c1',
          user: { name: 'Mike Johnson' },
          content: 'That\'s impressive! Did you use tabulation or memoization?',
          timestamp: '4 hours ago'
        }
      ],
      isLiked: false,
      isBookmarked: true,
      type: 'challenge-completion',
      challengeDetails: {
        title: 'Dynamic Programming Challenge',
        difficulty: 'Hard'
      },
      showComments: false
    },
    {
      id: '3',
      user: { name: 'Michael Wong' },
      content: 'I wrote a blog post about efficient tree traversal techniques that can improve your problem-solving speed. Check it out and let me know your thoughts!',
      timestamp: 'Yesterday',
      likes: 36,
      comments: [],
      isLiked: false,
      isBookmarked: false,
      type: 'blog',
      blogTitle: 'Efficient Tree Traversal Techniques for Coding Interviews',
      showComments: false
    },
    {
      id: '4',
      user: { name: 'Elena Rodriguez' },
      content: 'Just got a job offer from Google after practicing on CodeChatter for 3 months! The community here is amazing and all the practice problems helped me ace my technical interviews.',
      timestamp: '1 day ago',
      likes: 98,
      comments: [
        {
          id: 'c2',
          user: { name: 'John Smith' },
          content: 'Congratulations! That\'s amazing news!',
          timestamp: '20 hours ago'
        },
        {
          id: 'c3',
          user: { name: 'David Lee' },
          content: 'Would you mind sharing your study plan?',
          timestamp: '18 hours ago'
        }
      ],
      isLiked: true,
      isBookmarked: true,
      type: 'status',
      showComments: false
    },
    {
      id: '5',
      user: { name: 'Jessica Park' },
      content: 'I cracked the "Merge K Sorted Lists" problem using a priority queue. Key insight: always try to use appropriate data structures to simplify complex problems.',
      timestamp: '2 days ago',
      likes: 27,
      comments: [],
      isLiked: false,
      isBookmarked: false,
      type: 'challenge-completion',
      challengeDetails: {
        title: 'Merge K Sorted Lists',
        difficulty: 'Hard'
      },
      showComments: false
    },
  ]);

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
      user: { name: 'John Doe' },
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

  return (
    <div className="p-6">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome Home, John!</h1>
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
            <CreatePostForm onPostCreated={handleCreatePost} />
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
        />
      </div>
    </div>
  );
};

export default Home;
