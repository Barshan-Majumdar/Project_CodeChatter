
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Image, Code as CodeIcon } from 'lucide-react';

interface Post {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: any[];
  isLiked: boolean;
  isBookmarked: boolean;
  type: 'status' | 'challenge-completion' | 'blog';
  challengeDetails?: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
  blogTitle?: string;
}

interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
  userName: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated, userName }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Empty Post",
        description: "Please write something to share with the community.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Create a new post
    const newPost: Post = {
      id: `post-${Date.now()}`,
      user: {
        name: userName || 'Anonymous User'
      },
      content: content,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      isLiked: false,
      isBookmarked: false,
      type: 'status'
    };
    
    // Simulate a delay for the post creation
    setTimeout(() => {
      onPostCreated(newPost);
      setContent('');
      setIsLoading(false);
      
      toast({
        title: "Post Created",
        description: "Your post has been shared with the community!"
      });
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center text-white font-medium">
          {userName ? userName[0].toUpperCase() : 'A'}
        </div>
        <Textarea
          placeholder="Share what you're working on or thinking about..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 min-h-[100px] bg-codechatter-darker border-codechatter-blue/20 resize-none"
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="ghost" 
            className="text-white/60 hover:text-white hover:bg-white/10"
            disabled={isLoading}
          >
            <Image size={18} className="mr-1" /> Photo
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            className="text-white/60 hover:text-white hover:bg-white/10"
            disabled={isLoading}
          >
            <CodeIcon size={18} className="mr-1" /> Code
          </Button>
        </div>
        <Button 
          type="submit"
          className="bg-codechatter-blue hover:bg-codechatter-blue/90"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post"} <Send size={16} className="ml-2" />
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
