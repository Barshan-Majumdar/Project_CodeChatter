
import React from 'react';
import Post from './Post';

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

interface SocialFeedProps {
  posts: Post[];
  newComments: Record<string, string>;
  onLikePost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
  onToggleComments: (postId: string) => void;
  onNewCommentChange: (postId: string, value: string) => void;
  onAddComment: (postId: string) => void;
}

const SocialFeed: React.FC<SocialFeedProps> = ({
  posts,
  newComments,
  onLikePost,
  onBookmarkPost,
  onToggleComments,
  onNewCommentChange,
  onAddComment
}) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          newCommentValue={newComments[post.id] || ''}
          onLikePost={onLikePost}
          onBookmarkPost={onBookmarkPost}
          onToggleComments={onToggleComments}
          onNewCommentChange={onNewCommentChange}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  );
};

export default SocialFeed;
