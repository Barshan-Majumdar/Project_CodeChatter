
import React from 'react';
import PostComponent from './Post';

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
  isVerifying?: boolean;
  isVerified?: boolean;
  solutions?: string[];
}

interface SocialFeedProps {
  posts: Post[];
  newComments: Record<string, string>;
  onLikePost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
  onToggleComments: (postId: string) => void;
  onNewCommentChange: (postId: string, value: string) => void;
  onAddComment: (postId: string) => void;
  onDeletePost: (postId: string) => void;
  onEditPost: (postId: string, content: string, updatedComments?: Comment[]) => void;
  onSolveProblem?: (postId: string, solution?: string) => void;
  onToggleSolutionInput?: (postId: string) => void;
  onSolutionChange?: (postId: string, solution: string) => void;
  onVerifySolution?: (postId: string, solution: string) => void;
}

const SocialFeed: React.FC<SocialFeedProps> = ({
  posts,
  newComments,
  onLikePost,
  onBookmarkPost,
  onToggleComments,
  onNewCommentChange,
  onAddComment,
  onDeletePost,
  onEditPost,
  onSolveProblem,
  onToggleSolutionInput,
  onSolutionChange,
  onVerifySolution
}) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          newCommentValue={newComments[post.id] || ''}
          onLikePost={onLikePost}
          onBookmarkPost={onBookmarkPost}
          onToggleComments={onToggleComments}
          onNewCommentChange={onNewCommentChange}
          onAddComment={onAddComment}
          onDeletePost={onDeletePost}
          onEditPost={onEditPost}
          onSolveProblem={onSolveProblem}
          onToggleSolutionInput={onToggleSolutionInput}
          onSolutionChange={onSolutionChange}
          onVerifySolution={onVerifySolution}
        />
      ))}
    </div>
  );
};

export default SocialFeed;
