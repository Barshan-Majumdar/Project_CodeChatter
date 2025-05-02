
import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, X, MessageSquare, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreatePostFormProps {
  onPostCreated: (post: any) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postType, setPostType] = useState<'normal' | 'problem'>('normal');
  const [newPostContent, setNewPostContent] = useState('');
  const [problemDetails, setProblemDetails] = useState({
    title: '',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    url: '',
  });

  const resetForm = () => {
    setNewPostContent('');
    setProblemDetails({
      title: '',
      difficulty: 'Easy',
      url: '',
    });
  };

  const handleCreateNormalPost = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Empty Post",
        description: "Please write something before posting.",
        variant: "destructive"
      });
      return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      user: { name: 'John Doe' },
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      isLiked: false,
      isBookmarked: false,
      type: 'status',
      showComments: false
    };

    onPostCreated(newPost);
    resetForm();
    setIsDialogOpen(false);
    
    toast({
      title: "Post Created",
      description: "Your post has been published successfully!",
    });
  };

  const handleCreateProblemPost = () => {
    if (!newPostContent.trim() || !problemDetails.title || !problemDetails.url) {
      toast({
        title: "Incomplete Post",
        description: "Please fill all required fields for the problem post.",
        variant: "destructive"
      });
      return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      user: { name: 'John Doe' },
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      isLiked: false,
      isBookmarked: false,
      type: 'challenge-completion',
      challengeDetails: {
        title: problemDetails.title,
        difficulty: problemDetails.difficulty
      },
      showComments: false
    };

    onPostCreated(newPost);
    resetForm();
    setIsDialogOpen(false);
    
    toast({
      title: "Problem Solution Posted",
      description: "Your solution has been shared successfully!",
    });
  };

  const handleCreatePost = () => {
    if (postType === 'normal') {
      handleCreateNormalPost();
    } else {
      handleCreateProblemPost();
    }
  };

  return (
    <div>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full bg-codechatter-dark border border-codechatter-blue/20 text-white hover:bg-codechatter-blue/10 justify-start p-4 h-auto"
      >
        <Avatar className="h-8 w-8 mr-3">
          <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium">
            J
          </div>
        </Avatar>
        <span className="text-white/60 text-base font-normal">Create New Post...</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-codechatter-dark border-codechatter-blue/20 sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-white">Create a New Post</DialogTitle>
          </DialogHeader>

          <div className="flex mb-4 gap-2 border-b border-codechatter-blue/20 pb-2">
            <Button
              variant="ghost"
              className={`flex-1 ${postType === 'normal' 
                ? 'bg-codechatter-blue/20 text-codechatter-blue' 
                : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              onClick={() => setPostType('normal')}
            >
              <MessageSquare size={16} className="mr-2" />
              Normal Post
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 ${postType === 'problem' 
                ? 'bg-codechatter-blue/20 text-codechatter-blue' 
                : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              onClick={() => setPostType('problem')}
            >
              <Code size={16} className="mr-2" />
              Problem Solution
            </Button>
          </div>

          {postType === 'problem' && (
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm text-white/60 block mb-1">Problem Title</label>
                <Input 
                  value={problemDetails.title}
                  onChange={(e) => setProblemDetails({...problemDetails, title: e.target.value})}
                  className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                  placeholder="e.g. Two Sum"
                />
              </div>
              
              <div>
                <label className="text-sm text-white/60 block mb-1">Difficulty</label>
                <Select 
                  value={problemDetails.difficulty}
                  onValueChange={(val: 'Easy' | 'Medium' | 'Hard') => 
                    setProblemDetails({...problemDetails, difficulty: val})
                  }
                >
                  <SelectTrigger className="bg-codechatter-darker border-codechatter-blue/20 text-white">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-codechatter-dark border-codechatter-blue/20">
                    <SelectItem value="Easy" className="text-green-400">Easy</SelectItem>
                    <SelectItem value="Medium" className="text-yellow-400">Medium</SelectItem>
                    <SelectItem value="Hard" className="text-red-400">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-white/60 block mb-1">Problem URL (optional)</label>
                <Input 
                  value={problemDetails.url}
                  onChange={(e) => setProblemDetails({...problemDetails, url: e.target.value})}
                  className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                  placeholder="https://leetcode.com/problems/..."
                />
              </div>
            </div>
          )}

          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium">
                J
              </div>
            </Avatar>
            <div className="flex-1">
              <Textarea 
                placeholder={postType === 'normal' 
                  ? "Share your coding journey or ask a question..." 
                  : "Share your solution approach and insights..."
                }
                className="bg-codechatter-darker border-codechatter-blue/20 text-white min-h-[100px]"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-3">
            <Button 
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-codechatter-blue/20 text-white hover:bg-white/10"
            >
              <X size={16} className="mr-1" /> Cancel
            </Button>
            <Button 
              onClick={handleCreatePost}
              className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
            >
              <Send size={16} className="mr-1" /> Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePostForm;
