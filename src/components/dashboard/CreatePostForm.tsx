
import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreatePostFormProps {
  onPostCreated: (post: any) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const { toast } = useToast();
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
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
    setNewPostContent('');
    
    toast({
      title: "Post Created",
      description: "Your post has been published successfully!",
    });
  };

  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-10 w-10">
        <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium">
          J
        </div>
      </Avatar>
      <div className="flex-1">
        <Textarea 
          placeholder="Share your coding journey or ask a question..."
          className="bg-codechatter-darker border-codechatter-blue/20 text-white min-h-[100px]"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <Button 
            onClick={handleCreatePost}
            className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
          >
            <Send size={16} className="mr-2" /> Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
