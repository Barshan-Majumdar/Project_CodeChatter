
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Image, Code as CodeIcon, Circle, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  type: 'status' | 'challenge-completion' | 'blog' | 'problem' | 'media';
  challengeDetails?: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
  blogTitle?: string;
  mediaUrl?: string;
}

interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
  userName: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated, userName }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [postTab, setPostTab] = useState("text");
  const [problemTitle, setProblemTitle] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
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
    
    // Create a new post based on the selected tab
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
      type: postTab === "problem" ? 'problem' : 
            postTab === "media" ? 'media' : 'status'
    };

    // Add challenge details if it's a problem post
    if (postTab === "problem" && problemTitle) {
      newPost.challengeDetails = {
        title: problemTitle,
        difficulty: difficulty
      };
    }
    
    // Simulate a delay for the post creation
    setTimeout(() => {
      onPostCreated(newPost);
      setContent('');
      setProblemTitle('');
      setIsLoading(false);
      
      toast({
        title: "Post Created",
        description: `Your ${postTab === "problem" ? "problem" : postTab === "media" ? "media" : ""} post has been shared with the community!`
      });
    }, 500);
  };

  const handleTabChange = (value: string) => {
    setPostTab(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center text-white font-medium">
          {userName ? userName[0].toUpperCase() : 'A'}
        </div>
        <div className="flex-1">
          <Tabs defaultValue="text" value={postTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-codechatter-darker">
              <TabsTrigger value="text">Text Post</TabsTrigger>
              <TabsTrigger value="problem">Code Problem</TabsTrigger>
              <TabsTrigger value="media">Photo/Video</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-0">
              <Textarea
                placeholder="Share what you're working on or thinking about..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] bg-codechatter-darker border-codechatter-blue/20 resize-none"
              />
            </TabsContent>

            <TabsContent value="problem" className="mt-0 space-y-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Problem Title"
                  value={problemTitle}
                  onChange={(e) => setProblemTitle(e.target.value)}
                  className="flex-1 h-10 px-3 rounded-md bg-codechatter-darker border border-codechatter-blue/20 text-white"
                />
                <div className="flex items-center gap-2">
                  <DifficultySelector
                    difficulty={difficulty}
                    onChange={setDifficulty}
                  />
                </div>
              </div>
              <Textarea
                placeholder="Share your code problem or challenge..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] bg-codechatter-darker border-codechatter-blue/20 resize-none font-mono"
              />
            </TabsContent>

            <TabsContent value="media" className="mt-0 space-y-3">
              <div className="p-6 border-2 border-dashed border-codechatter-blue/20 rounded-md flex flex-col items-center justify-center bg-codechatter-darker">
                <Image className="h-10 w-10 mb-2 text-white/60" />
                <p className="text-white/60">Drag and drop a photo or video, or click to browse</p>
                <Button variant="ghost" className="mt-2 text-codechatter-blue">
                  Choose File
                </Button>
              </div>
              <Textarea
                placeholder="Add a caption for your photo or video..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[80px] bg-codechatter-darker border-codechatter-blue/20 resize-none"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {postTab === "text" && (
            <>
              <Button 
                type="button" 
                variant="ghost" 
                className="text-white/60 hover:text-white hover:bg-white/10"
                disabled={isLoading}
                onClick={() => setPostTab("media")}
              >
                <Image size={18} className="mr-1" /> Add Photo
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="text-white/60 hover:text-white hover:bg-white/10"
                disabled={isLoading}
                onClick={() => setPostTab("problem")}
              >
                <CodeIcon size={18} className="mr-1" /> Add Code
              </Button>
            </>
          )}
        </div>
        <Button 
          type="submit"
          className="bg-codechatter-blue hover:bg-codechatter-blue/90"
          disabled={isLoading || (postTab === "problem" && !problemTitle)}
        >
          {isLoading ? "Posting..." : "Post"} <Send size={16} className="ml-2" />
        </Button>
      </div>
    </form>
  );
};

// Difficulty selector component
const DifficultySelector = ({ 
  difficulty, 
  onChange 
}: { 
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onChange: (value: 'Easy' | 'Medium' | 'Hard') => void;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-white/60">Difficulty:</span>
      <Button 
        type="button"
        variant="ghost" 
        onClick={() => onChange('Easy')}
        className={`h-8 px-2 ${difficulty === 'Easy' ? 'bg-green-600/20 text-green-400' : 'text-white/60'}`}
      >
        <Circle size={14} className={`mr-1 ${difficulty === 'Easy' ? 'text-green-400' : 'text-white/40'}`} fill={difficulty === 'Easy' ? 'currentColor' : 'none'} />
        Easy
      </Button>
      <Button 
        type="button"
        variant="ghost" 
        onClick={() => onChange('Medium')}
        className={`h-8 px-2 ${difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' : 'text-white/60'}`}
      >
        <Circle size={14} className={`mr-1 ${difficulty === 'Medium' ? 'text-yellow-400' : 'text-white/40'}`} fill={difficulty === 'Medium' ? 'currentColor' : 'none'} />
        Medium
      </Button>
      <Button 
        type="button"
        variant="ghost" 
        onClick={() => onChange('Hard')}
        className={`h-8 px-2 ${difficulty === 'Hard' ? 'bg-red-600/20 text-red-400' : 'text-white/60'}`}
      >
        <Circle size={14} className={`mr-1 ${difficulty === 'Hard' ? 'text-red-400' : 'text-white/40'}`} fill={difficulty === 'Hard' ? 'currentColor' : 'none'} />
        Hard
      </Button>
    </div>
  );
};

export default CreatePostForm;
