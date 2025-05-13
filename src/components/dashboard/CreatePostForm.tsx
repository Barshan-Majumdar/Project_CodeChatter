
import React, { useState, useRef, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Image, Code as CodeIcon, Tag, PaintBucket, Upload } from 'lucide-react';
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
  };
  blogTitle?: string;
  mediaUrl?: string;
  backgroundColor?: string;
  tags?: string[];
  attachments?: File[];
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
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [isDraggingProblem, setIsDraggingProblem] = useState(false);
  const [isDraggingMedia, setIsDraggingMedia] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const codeFileInputRef = useRef<HTMLInputElement>(null);
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
            postTab === "media" ? 'media' : 'status',
      tags: tags.length > 0 ? tags : undefined,
      backgroundColor: backgroundColor || undefined,
      attachments: selectedFiles.length > 0 ? selectedFiles : undefined
    };

    // Add challenge details if it's a problem post
    if (postTab === "problem" && problemTitle) {
      newPost.challengeDetails = {
        title: problemTitle
      };
    }
    
    // Add media URL if it's a media post or problem post and there's a selected file
    if ((postTab === "media" || postTab === "problem") && selectedFiles.length > 0) {
      // In a real implementation, this would be the URL after upload
      newPost.mediaUrl = URL.createObjectURL(selectedFiles[0]);
    }
    
    // Simulate a delay for the post creation
    setTimeout(() => {
      onPostCreated(newPost);
      setContent('');
      setProblemTitle('');
      setBackgroundColor("");
      setTags([]);
      setTagInput("");
      setSelectedFiles([]);
      setFilePreview(null);
      setIsLoading(false);
      
      toast({
        title: "Post Created",
        description: `Your ${postTab === "problem" ? "problem" : postTab === "media" ? "media" : ""} post has been shared with the community!`
      });
    }, 500);
  };

  const handleTabChange = (value: string) => {
    setPostTab(value);
    setFilePreview(null);
    setSelectedFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFiles([file]);
      
      // Create a preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setFilePreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }

      toast({
        title: "File Selected",
        description: `${file.name} has been selected for upload.`
      });
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, area: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Reset all drag states
    setIsDraggingText(false);
    setIsDraggingProblem(false);
    setIsDraggingMedia(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFiles([file]);
      
      // Create a preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setFilePreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
        
        // Switch to appropriate tab based on where the file was dropped
        if (area !== postTab) {
          setPostTab(area);
        }
      } else {
        setFilePreview(null);
      }

      toast({
        title: "File Selected",
        description: `${file.name} has been added to your post.`
      });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, area: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Set the appropriate dragging state based on area
    if (area === 'text') {
      setIsDraggingText(true);
    } else if (area === 'problem') {
      setIsDraggingProblem(true);
    } else if (area === 'media') {
      setIsDraggingMedia(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>, area: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Reset the appropriate dragging state based on area
    if (area === 'text') {
      setIsDraggingText(false);
    } else if (area === 'problem') {
      setIsDraggingProblem(false);
    } else if (area === 'media') {
      setIsDraggingMedia(false);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const backgroundOptions = [
    { value: "", label: "No Background", color: "transparent" },
    { value: "bg-blue-500 bg-opacity-20", label: "Blue", color: "#3b82f6" },
    { value: "bg-green-500 bg-opacity-20", label: "Green", color: "#22c55e" },
    { value: "bg-yellow-500 bg-opacity-20", label: "Yellow", color: "#eab308" },
    { value: "bg-red-500 bg-opacity-20", label: "Red", color: "#ef4444" },
    { value: "bg-purple-500 bg-opacity-20", label: "Purple", color: "#a855f7" },
    { value: "bg-pink-500 bg-opacity-20", label: "Pink", color: "#ec4899" },
    { value: "bg-gradient-to-r from-blue-500 to-purple-500 bg-opacity-20", label: "Blue to Purple", color: "linear-gradient" },
    { value: "bg-gradient-to-r from-green-500 to-blue-500 bg-opacity-20", label: "Green to Blue", color: "linear-gradient" },
    { value: "bg-gradient-to-r from-yellow-500 to-red-500 bg-opacity-20", label: "Yellow to Red", color: "linear-gradient" },
  ];
  
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
              <div 
                className={`rounded-md overflow-hidden ${backgroundColor} ${isDraggingText ? 'border-2 border-dashed border-codechatter-blue/60' : ''}`}
                onDragOver={(e) => handleDragOver(e, 'text')}
                onDrop={(e) => handleDrop(e, 'text')}
                onDragLeave={(e) => handleDragLeave(e, 'text')}
              >
                <Textarea
                  placeholder="Share what you're working on or thinking about..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`min-h-[100px] bg-codechatter-darker border-codechatter-blue/20 resize-none ${backgroundColor && 'bg-opacity-50'}`}
                />
              </div>

              {/* Background Selector */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-white/60">
                  <PaintBucket size={16} />
                  <span className="text-sm">Background:</span>
                </div>
                <div className="flex gap-1">
                  {backgroundOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`w-6 h-6 rounded-full ${option.value === backgroundColor ? 'ring-2 ring-white ring-offset-2 ring-offset-codechatter-dark' : ''}`}
                      style={{ 
                        background: option.color,
                        border: option.value === "" ? '1px solid rgba(255,255,255,0.2)' : 'none' 
                      }}
                      onClick={() => setBackgroundColor(option.value)}
                      title={option.label}
                    />
                  ))}
                </div>
              </div>

              {/* Tag People Section */}
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <Tag size={16} className="text-white/60" />
                  <span className="text-sm text-white/60">Tag People:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {tags.map((tag) => (
                    <div 
                      key={tag}
                      className="px-2 py-1 bg-codechatter-blue/30 rounded-full flex items-center gap-1"
                    >
                      <span className="text-sm">{tag}</span>
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        className="text-white/60 hover:text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Type a name and press Enter"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="bg-transparent border-none outline-none text-sm flex-1 min-w-[150px] text-white"
                  />
                </div>
              </div>
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
              </div>
              <div
                className={`rounded-md overflow-hidden ${isDraggingProblem ? 'border-2 border-dashed border-codechatter-blue/60' : ''}`}
                onDragOver={(e) => handleDragOver(e, 'problem')}
                onDrop={(e) => handleDrop(e, 'problem')}
                onDragLeave={(e) => handleDragLeave(e, 'problem')}
              >
                <Textarea
                  placeholder="Share your code problem or challenge..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] bg-codechatter-darker border-codechatter-blue/20 resize-none font-mono"
                />
              </div>
              
              {/* File attachment for code problem */}
              <div>
                <button 
                  type="button"
                  onClick={() => codeFileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-codechatter-darker border border-codechatter-blue/20 text-white/80 hover:bg-codechatter-blue/20 transition-colors"
                >
                  <Upload size={16} />
                  {selectedFiles.length > 0 ? selectedFiles[0].name : "Attach Image/Video"}
                </button>
                <input
                  ref={codeFileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              
              {/* Preview for image attachments */}
              {filePreview && postTab === "problem" && (
                <div className="mt-2 max-w-xs">
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    className="rounded-md max-h-36 object-contain bg-black/30"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="media" className="mt-0 space-y-3">
              <div 
                className={`p-6 border-2 border-dashed ${isDraggingMedia ? 'border-codechatter-blue border-solid' : 'border-codechatter-blue/20'} rounded-md flex flex-col items-center justify-center bg-codechatter-darker cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => handleDragOver(e, 'media')}
                onDrop={(e) => handleDrop(e, 'media')}
                onDragLeave={(e) => handleDragLeave(e, 'media')}
              >
                {filePreview ? (
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    className="max-h-48 object-contain mb-2"
                  />
                ) : (
                  <Image className="h-10 w-10 mb-2 text-white/60" />
                )}
                <p className="text-white/60">
                  {selectedFiles.length > 0 
                    ? `Selected: ${selectedFiles[0].name}` 
                    : 'Drag and drop a photo or video, or click to browse'}
                </p>
                <Button variant="ghost" className="mt-2 text-codechatter-blue">
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
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

export default CreatePostForm;
