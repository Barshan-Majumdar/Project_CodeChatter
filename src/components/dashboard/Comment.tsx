
import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';

interface CommentProps {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  onDeleteComment?: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({ id, user, content, timestamp, onDeleteComment }) => {
  const handleDelete = () => {
    if (onDeleteComment) {
      onDeleteComment(id);
    }
  };

  return (
    <div className="flex gap-3 bg-codechatter-darker p-3 rounded">
      <Avatar className="h-8 w-8">
        <div className="bg-gradient-to-br from-codechatter-purple to-codechatter-blue w-full h-full flex items-center justify-center text-white font-medium text-xs">
          {user.name.charAt(0)}
        </div>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{user.name}</span>
            <span className="text-xs text-white/40">{timestamp}</span>
          </div>
          {onDeleteComment && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/40 hover:text-white">
                  <MoreHorizontal size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-codechatter-dark border-codechatter-blue/20">
                <DropdownMenuItem 
                  onClick={handleDelete}
                  className="text-red-400 hover:bg-red-600/10 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 size={14} className="mr-2" /> Delete Comment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className="text-sm text-white/80 mt-1">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
