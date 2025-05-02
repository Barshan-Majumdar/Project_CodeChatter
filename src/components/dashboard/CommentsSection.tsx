
import React from 'react';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

interface CommentsSectionProps {
  postId: string;
  comments: Comment[];
  newCommentValue: string;
  onNewCommentChange: (postId: string, value: string) => void;
  onAddComment: (postId: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ 
  postId, 
  comments, 
  newCommentValue, 
  onNewCommentChange, 
  onAddComment,
  onDeleteComment
}) => {
  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      {comments.length > 0 && (
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium text-white">Comments</h4>
          {comments.map(comment => (
            <Comment 
              key={comment.id} 
              id={comment.id}
              user={comment.user}
              content={comment.content}
              timestamp={comment.timestamp}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
      
      <AddCommentForm 
        postId={postId}
        value={newCommentValue}
        onChange={onNewCommentChange}
        onAddComment={onAddComment}
      />
    </div>
  );
};

export default CommentsSection;
