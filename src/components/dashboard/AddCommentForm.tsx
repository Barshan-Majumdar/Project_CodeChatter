
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface AddCommentFormProps {
  postId: string;
  value: string;
  onChange: (postId: string, value: string) => void;
  onAddComment: (postId: string) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, value, onChange, onAddComment }) => {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium text-xs">
          J
        </div>
      </Avatar>
      <div className="flex-1 flex">
        <Textarea 
          placeholder="Add a comment..."
          className="bg-codechatter-darker border-codechatter-blue/20 text-white min-h-[60px] text-sm flex-1 mr-2"
          value={value || ''}
          onChange={(e) => onChange(postId, e.target.value)}
        />
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90 h-8 self-end"
          onClick={() => onAddComment(postId)}
        >
          <Send size={14} />
        </Button>
      </div>
    </div>
  );
};

export default AddCommentForm;
