
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface TestimonialCardProps {
  content: string;
  name: string;
  title: string;
  avatar?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ content, name, title, avatar }) => {
  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20 overflow-hidden h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <svg 
            className="w-8 h-8 text-codechatter-purple opacity-40 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" 
            />
          </svg>
          <p className="text-white/80 text-sm leading-relaxed italic mb-6">{content}</p>
        </div>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4 bg-codechatter-blue">
            <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-medium">
              {name.charAt(0)}
            </div>
          </Avatar>
          <div>
            <h4 className="text-white font-medium text-sm">{name}</h4>
            <p className="text-white/60 text-xs">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
