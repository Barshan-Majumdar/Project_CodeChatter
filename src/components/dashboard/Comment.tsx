
import React from 'react';
import { Avatar } from '@/components/ui/avatar';

interface CommentProps {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

const Comment: React.FC<CommentProps> = ({ user, content, timestamp }) => {
  return (
    <div className="flex gap-3 bg-codechatter-darker p-3 rounded">
      <Avatar className="h-8 w-8">
        <div className="bg-gradient-to-br from-codechatter-purple to-codechatter-blue w-full h-full flex items-center justify-center text-white font-medium text-xs">
          {user.name.charAt(0)}
        </div>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">{user.name}</span>
          <span className="text-xs text-white/40">{timestamp}</span>
        </div>
        <p className="text-sm text-white/80 mt-1">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
