
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, Star, Code } from 'lucide-react';
import CommentsSection from './CommentsSection';

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
}

const Post: React.FC<PostProps> = ({
  post,
  newCommentValue,
  onLikePost,
  onBookmarkPost,
  onToggleComments,
  onNewCommentChange,
  onAddComment
}) => {
  return (
    <div className="bg-codechatter-dark border-codechatter-blue/20 rounded-lg border p-6">
      <div className="flex items-center mb-4">
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
      
      <div className="mb-4">
        {post.type === 'blog' && post.blogTitle && (
          <h4 className="font-medium text-white mb-2">{post.blogTitle}</h4>
        )}
        <p className="text-white/80 text-sm">{post.content}</p>
      </div>
      
      {post.challengeDetails && (
        <div className="mb-4 p-3 rounded bg-codechatter-purple/10 border border-codechatter-purple/20">
          <div className="flex items-center">
            <Code size={16} className="text-codechatter-purple mr-2" />
            <span className="text-white text-sm font-medium">{post.challengeDetails.title}</span>
          </div>
        </div>
      )}
      
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
      
      {/* Comments Section */}
      {post.showComments && (
        <CommentsSection 
          postId={post.id}
          comments={post.comments}
          newCommentValue={newCommentValue}
          onNewCommentChange={onNewCommentChange}
          onAddComment={onAddComment}
        />
      )}
    </div>
  );
};

export default Post;
