import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ThumbsUp, 
  MessageSquare, 
  Star, 
  Code, 
  MoreHorizontal, 
  Trash2,
  Edit,
  Check,
  FileImage,
  FileVideo
} from 'lucide-react';
import CommentsSection from './CommentsSection';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
}

interface PostProps {
  post: Post;
  newCommentValue: string;
  onLikePost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
  onToggleComments: (postId: string) => void;
  onNewCommentChange: (postId: string, value: string) => void;
  onAddComment: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  onEditPost?: (postId: string, content: string) => void;
  onSolveProblem?: (postId: string, solution?: string) => void;
  onToggleSolutionInput?: (postId: string) => void;
  onSolutionChange?: (postId: string, solution: string) => void;
}

const PostComponent: React.FC<PostProps> = ({
  post,
  newCommentValue,
  onLikePost,
  onBookmarkPost,
  onToggleComments,
  onNewCommentChange,
  onAddComment,
  onDeletePost,
  onEditPost,
  onSolveProblem,
  onToggleSolutionInput,
  onSolutionChange
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [solution, setSolution] = useState(post.solution || '');

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(post.content);
  };

  const handleSaveEdit = () => {
    if (onEditPost && editContent.trim()) {
      onEditPost(post.id, editContent);
      setIsEditing(false);
      toast({
        title: "Post Updated",
        description: "Your post has been updated successfully!"
      });
    } else if (!editContent.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty.",
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(post.content);
  };

  const handleDelete = () => {
    if (onDeletePost) {
      onDeletePost(post.id);
    }
  };

  const handleSolveProblem = () => {
    if (onSolveProblem && solution.trim()) {
      onSolveProblem(post.id, solution);
      toast({
        title: "Problem Solved",
        description: "You've submitted a solution to this problem!"
      });
    } else if (!solution.trim() && post.showSolutionInput) {
      toast({
        title: "Error",
        description: "Please provide a solution before submitting.",
        variant: "destructive"
      });
    } else if (onToggleSolutionInput) {
      onToggleSolutionInput(post.id);
    }
  };

  const handleSolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSolution = e.target.value;
    setSolution(newSolution);
    if (onSolutionChange) {
      onSolutionChange(post.id, newSolution);
    }
  };

  // Helper function to determine if a URL is a video
  const isVideoUrl = (url: string) => {
    // Simple check based on common video extensions
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  return (
    <div className={`bg-codechatter-dark border-codechatter-blue/20 rounded-lg border p-6 ${post.backgroundColor || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium">
              {post.user.name.charAt(0)}
            </div>
          </Avatar>
          <div>
            <h3 className="font-medium text-white">{post.user.name}</h3>
            <div className="flex items-center text-white/40 text-xs">
              <span>{post.timestamp}</span>
              {post.type === 'challenge-completion' && (
                <>
                  <span className="mx-1">•</span>
                  <Badge 
                    className={`
                      text-xs ${
                        post.challengeDetails?.difficulty === 'Easy' ? 'bg-green-600/20 text-green-400' :
                        post.challengeDetails?.difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                        'bg-red-600/20 text-red-400'
                      }
                    `}
                  >
                    {post.challengeDetails?.difficulty} Challenge
                  </Badge>
                </>
              )}
              {post.type === 'blog' && (
                <>
                  <span className="mx-1">•</span>
                  <Badge className="bg-codechatter-blue/20 text-codechatter-blue text-xs">Blog Post</Badge>
                </>
              )}
              {post.type === 'problem' && (
                <>
                  <span className="mx-1">•</span>
                  <Badge className="bg-purple-600/20 text-purple-400 text-xs">Code Problem</Badge>
                </>
              )}
              {post.type === 'media' && post.mediaUrl && (
                <>
                  <span className="mx-1">•</span>
                  <Badge className="bg-green-600/20 text-green-400 text-xs">
                    {isVideoUrl(post.mediaUrl) ? 'Video Post' : 'Photo Post'}
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Post actions dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-codechatter-dark border-codechatter-blue/20">
            <DropdownMenuItem 
              onClick={handleEdit}
              className="text-white hover:bg-codechatter-blue/10 cursor-pointer"
            >
              <Edit size={16} className="mr-2" /> Edit Post
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete}
              className="text-red-400 hover:bg-red-600/10 hover:text-red-500 cursor-pointer"
            >
              <Trash2 size={16} className="mr-2" /> Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Tags display */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-0.5 bg-codechatter-blue/30 text-white/80 text-xs rounded-full"
            >
              @{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mb-4">
        {post.type === 'blog' && post.blogTitle && (
          <h4 className="font-medium text-white mb-2">{post.blogTitle}</h4>
        )}
        
        {isEditing ? (
          <div className="space-y-3">
            <Textarea 
              value={editContent} 
              onChange={(e) => setEditContent(e.target.value)}
              className="bg-codechatter-darker border-codechatter-blue/20 text-white min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-codechatter-blue/20 text-white hover:bg-white/10"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
                onClick={handleSaveEdit}
              >
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Show text content only if it's not empty */}
            {post.content && <p className="text-white/80 text-sm mb-4">{post.content}</p>}
            
            {/* Display media for all post types that have mediaUrl */}
            {post.mediaUrl && (
              <div className="mb-4 rounded-md overflow-hidden">
                {isVideoUrl(post.mediaUrl) ? (
                  <div className="aspect-video">
                    <video 
                      src={post.mediaUrl} 
                      controls 
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
                ) : (
                  <AspectRatio ratio={16/9} className="bg-black">
                    <img 
                      src={post.mediaUrl} 
                      alt="Post attachment" 
                      className="w-full h-full object-contain"
                    />
                  </AspectRatio>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
      {post.challengeDetails && !isEditing && (
        <div className="mb-4 p-3 rounded bg-codechatter-purple/10 border border-codechatter-purple/20">
          <div className="flex items-center">
            <Code size={16} className="text-codechatter-purple mr-2" />
            <span className="text-white text-sm font-medium">{post.challengeDetails.title}</span>
          </div>
        </div>
      )}

      {/* Solution Input Area for Code Problems */}
      {post.type === 'problem' && post.showSolutionInput && !isEditing && (
        <div className="mb-4 p-3 rounded bg-codechatter-darker border border-codechatter-blue/20">
          <h4 className="text-sm font-medium text-white mb-2">Your Solution</h4>
          <Textarea 
            value={solution}
            onChange={handleSolutionChange}
            placeholder="Write your solution code here..."
            className="bg-black/30 border-codechatter-blue/20 text-white min-h-[150px] font-mono"
          />
          <div className="flex justify-end mt-3">
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onSolveProblem && onSolveProblem(post.id, solution)}
            >
              <Check size={16} className="mr-1" /> Submit Solution
            </Button>
          </div>
        </div>
      )}

      {/* Show solved status for problem */}
      {post.type === 'problem' && post.isSolved && !isEditing && (
        <div className="mb-4 p-2 rounded bg-green-900/20 border border-green-500/20 flex items-center">
          <Check size={16} className="text-green-500 mr-2" />
          <span className="text-green-400 text-sm">Problem solved!</span>
        </div>
      )}
      
      {!isEditing && (
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center space-x-4 text-sm">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-white/60 hover:text-white ${post.isLiked ? 'text-codechatter-blue' : ''}`}
              onClick={() => onLikePost(post.id)}
            >
              <ThumbsUp size={16} className="mr-1" />
              <span>{post.likes}</span>
            </Button>
            
            {/* Show Comments button for all types except problem */}
            {post.type !== 'problem' && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/60 hover:text-white"
                onClick={() => onToggleComments(post.id)}
              >
                <MessageSquare size={16} className="mr-1" />
                <span>{post.comments.length}</span>
              </Button>
            )}
            
            {/* Show Solve button only for problem type posts */}
            {post.type === 'problem' && (
              <Button 
                variant="ghost" 
                size="sm" 
                className={post.isSolved 
                  ? "text-green-400 hover:text-green-300" 
                  : "text-white/60 hover:text-white hover:bg-green-400/10"}
                onClick={handleSolveProblem}
              >
                <Code size={16} className="mr-1" /> 
                {post.isSolved ? "Solved" : "Solve"}
              </Button>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-white/60 hover:text-white ${post.isBookmarked ? 'text-yellow-400' : ''}`}
            onClick={() => onBookmarkPost(post.id)}
          >
            <Star size={16} />
          </Button>
        </div>
      )}
      
      {/* Comments Section - only show for non-problem posts */}
      {post.showComments && post.type !== 'problem' && (
        <CommentsSection
          postId={post.id}
          comments={post.comments}
          newCommentValue={newCommentValue}
          onNewCommentChange={(postId, value) => onNewCommentChange(postId, value)}
          onAddComment={onAddComment}
          onDeleteComment={(commentId) => onDeletePost && onDeletePost(commentId)}
        />
      )}
    </div>
  );
};

export default PostComponent;
