
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm your CodeChatter AI assistant. How can I help you with coding today?",
    sender: 'ai',
    timestamp: '12:01 PM',
  },
  {
    id: 2,
    text: "I'm stuck with a recursive function to solve the Tower of Hanoi problem. Can you help?",
    sender: 'user',
    timestamp: '12:02 PM',
  },
  {
    id: 3,
    text: "Absolutely! The Tower of Hanoi is a classic recursion problem. Let me break it down step by step...\n\nThe key insight is to break the problem into three steps:\n1. Move (n-1) disks from source to auxiliary peg\n2. Move the largest disk from source to target peg\n3. Move (n-1) disks from auxiliary to target peg\n\nHere's a Python implementation:",
    sender: 'ai',
    timestamp: '12:03 PM',
  },
  {
    id: 4,
    text: "```python\ndef tower_of_hanoi(n, source, target, auxiliary):\n    if n == 1:\n        print(f\"Move disk 1 from {source} to {target}\")\n        return\n    tower_of_hanoi(n-1, source, auxiliary, target)\n    print(f\"Move disk {n} from {source} to {target}\")\n    tower_of_hanoi(n-1, auxiliary, target, source)\n\n# Example usage\ntower_of_hanoi(3, 'A', 'C', 'B')\n```",
    sender: 'ai',
    timestamp: '12:03 PM',
  },
];

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate AI response (in a real app this would be an API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "I'll analyze your code and get back to you shortly! In the meantime, have you considered using memoization to optimize recursive solutions?",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-white text-lg">AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 
                ${message.sender === 'user' 
                  ? 'bg-codechatter-blue/20 text-white' 
                  : 'bg-codechatter-purple/20 text-white'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'ai' && (
                    <Avatar className="h-6 w-6 mt-0.5">
                      <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white font-bold text-xs">
                        AI
                      </div>
                    </Avatar>
                  )}
                  <div>
                    <div className="text-sm whitespace-pre-line">
                      {message.text.includes('```') 
                        ? (
                            <div className="font-mono bg-codechatter-darker rounded p-2 my-2 text-xs overflow-x-auto">
                              {message.text.replace(/```python|```/g, '')}
                            </div>
                          )
                        : message.text
                      }
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-xs text-white/50">{message.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4">
        <div className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any coding problem..."
            className="bg-codechatter-darker border-codechatter-blue/20 text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
          >
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
