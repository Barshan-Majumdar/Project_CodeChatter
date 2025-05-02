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
  Edit
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
  onEditPost
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

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

  return (
    <div className="bg-codechatter-dark border-codechatter-blue/20 rounded-lg border p-6">
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
          <p className="text-white/80 text-sm">{post.content}</p>
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/60 hover:text-white"
              onClick={() => onToggleComments(post.id)}
            >
              <MessageSquare size={16} className="mr-1" />
              <span>{post.comments.length}</span>
            </Button>
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
      
      {/* Comments Section */}
      {post.showComments && (
        <CommentsSection
          postId={post.id}
          comments={post.comments}
          newCommentValue={newCommentValue}
          onNewCommentChange={(postId, value) => onNewCommentChange(postId, value)}
          onAddComment={onAddComment}
          onDeleteComment={(commentId) => onDeletePost(commentId)}
        />
      )}
    </div>
  );
};

export default PostComponent;
