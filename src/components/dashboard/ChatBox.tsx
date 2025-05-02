
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Image, Paperclip, Mic, Send } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isCode?: boolean;
  isImage?: boolean;
  imageUrl?: string;
  isAttachment?: boolean;
  attachmentName?: string;
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
    text: "Absolutely! The Tower of Hanoi is a classic recursion problem. Let me break it down step by step...\n\nThe key insight is to break the problem into three steps:\n1. Move (n-1) disks from source to auxiliary peg\n2. Move the largest disk from source to target peg\n3. Move (n-1) disks from auxiliary to target peg",
    sender: 'ai',
    timestamp: '12:03 PM',
  },
  {
    id: 4,
    text: "```python\ndef tower_of_hanoi(n, source, target, auxiliary):\n    if n == 1:\n        print(f\"Move disk 1 from {source} to {target}\")\n        return\n    tower_of_hanoi(n-1, source, auxiliary, target)\n    print(f\"Move disk {n} from {source} to {target}\")\n    tower_of_hanoi(n-1, auxiliary, target, source)\n\n# Example usage\ntower_of_hanoi(3, 'A', 'C', 'B')\n```",
    sender: 'ai',
    timestamp: '12:03 PM',
    isCode: true,
  },
];

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    
    // Create image message
    const imageMessage: Message = {
      id: messages.length + 1,
      text: "I've shared an image",
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isImage: true,
      imageUrl: imageUrl
    };
    setMessages([...messages, imageMessage]);
    
    // Clear the file input
    event.target.value = '';
    
    toast({
      title: "Image uploaded",
      description: "Your image has been shared successfully",
    });
  };

  const handleAttachmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    
    // Create attachment message
    const attachmentMessage: Message = {
      id: messages.length + 1,
      text: "I've shared a file",
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAttachment: true,
      attachmentName: file.name
    };
    setMessages([...messages, attachmentMessage]);
    
    // Clear the file input
    event.target.value = '';
    
    toast({
      title: "File uploaded",
      description: "Your file has been shared successfully",
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate starting voice recording
      toast({
        title: "Recording started",
        description: "Recording voice message...",
      });
    } else {
      // Simulate stopping voice recording and sending
      toast({
        title: "Voice message sent",
        description: "Voice message processed successfully",
      });
      
      setTimeout(() => {
        const voiceMessage: Message = {
          id: messages.length + 1,
          text: "Voice message (0:08)",
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, voiceMessage]);
      }, 500);
    }
  };

  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg flex justify-between items-center">
          <div>AI Assistant</div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Chat settings</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white">
                    <path d="M3.5 7.5C3.5 8.32843 2.82843 9 2 9C1.17157 9 0.5 8.32843 0.5 7.5C0.5 6.67157 1.17157 6 2 6C2.82843 6 3.5 6.67157 3.5 7.5ZM8.5 7.5C8.5 8.32843 7.82843 9 7 9C6.17157 9 5.5 8.32843 5.5 7.5C5.5 6.67157 6.17157 6 7 6C7.82843 6 8.5 6.67157 8.5 7.5ZM14.5 7.5C14.5 8.32843 13.8284 9 13 9C12.1716 9 11.5 8.32843 11.5 7.5C11.5 6.67157 12.1716 6 13 6C13.8284 6 14.5 6.67157 14.5 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-codechatter-darker text-white">
                <h3 className="text-lg font-medium mb-4">Chat Settings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Notifications</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delete Chat History</span>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Save Conversation</span>
                    <Button variant="outline" size="sm">Save</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pt-2">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 
                  ${message.sender === 'user' 
                    ? 'bg-codechatter-blue/20 text-white rounded-br-none' 
                    : 'bg-codechatter-purple/20 text-white rounded-bl-none'
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
                      {message.isImage ? (
                        <div className="my-2">
                          <img 
                            src={message.imageUrl} 
                            alt="Shared image" 
                            className="rounded-md max-w-full max-h-40 object-cover" 
                          />
                        </div>
                      ) : message.isAttachment ? (
                        <div className="bg-codechatter-darker rounded-md p-2 flex items-center my-2">
                          <div className="mr-2">📎</div>
                          <div className="text-sm">{message.attachmentName}</div>
                        </div>
                      ) : message.isCode ? (
                        <div className="font-mono bg-codechatter-darker rounded p-2 my-2 text-xs overflow-x-auto">
                          {message.text.replace(/```python|```/g, '')}
                        </div>
                      ) : (
                        <div className="text-sm whitespace-pre-line">
                          {message.text}
                        </div>
                      )}
                      <div className="text-right mt-1">
                        <span className="text-xs text-white/50">{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4">
        <div className="flex w-full space-x-2">
          <TooltipProvider>
            <div className="flex space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/60 hover:text-white hover:bg-white/10 h-10 w-10"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Image size={20} />
                    <input 
                      type="file"
                      ref={imageInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share image</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/60 hover:text-white hover:bg-white/10 h-10 w-10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip size={20} />
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAttachmentUpload}
                      className="hidden"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share file</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="bg-codechatter-darker border-codechatter-blue/20 text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          {input.trim() ? (
            <Button 
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90 h-10 w-10 p-0"
            >
              <Send size={18} />
            </Button>
          ) : (
            <Button 
              onClick={toggleRecording}
              className={`${isRecording ? 'bg-red-500' : 'bg-gradient-to-r from-codechatter-blue to-codechatter-purple'} hover:opacity-90 h-10 w-10 p-0`}
            >
              <Mic size={18} />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
