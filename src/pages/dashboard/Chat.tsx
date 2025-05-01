
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Search, Phone, Video, Send, Code, Image } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unreadCount?: number;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  isCode?: boolean;
}

const Chat: React.FC = () => {
  const [contacts] = useState<Contact[]>([
    { id: '1', name: 'Alex Chen', lastMessage: 'Check out this new algorithm!', time: '10:45 AM', online: true, unreadCount: 2 },
    { id: '2', name: 'Sarah Kim', lastMessage: 'Looking for help with the BST challenge', time: 'Yesterday', online: true },
    { id: '3', name: 'Michael Wong', lastMessage: 'Thanks for the code review', time: 'Yesterday', online: false },
    { id: '4', name: 'Emma Davis', lastMessage: 'Let\'s tackle that hard problem together', time: 'Monday', online: false },
    { id: '5', name: 'David Johnson', lastMessage: 'Here\'s my solution using DP', time: 'Monday', online: true },
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey, have you looked at the Binary Search Tree challenge?', sender: 'other', timestamp: '10:30 AM' },
    { id: '2', text: 'Yes, I was working on it yesterday. It\'s tricky but I think I have a solution.', sender: 'me', timestamp: '10:32 AM' },
    { id: '3', text: 'Can you share your approach?', sender: 'other', timestamp: '10:35 AM' },
    { 
      id: '4', 
      text: '```python\ndef validate_bst(root):\n    def is_valid(node, min_val=float(\'-inf\'), max_val=float(\'inf\')):\n        if not node:\n            return True\n        if node.val <= min_val or node.val >= max_val:\n            return False\n        return is_valid(node.left, min_val, node.val) and is_valid(node.right, node.val, max_val)\n    return is_valid(root)\n```', 
      sender: 'me', 
      timestamp: '10:40 AM',
      isCode: true
    },
    { id: '5', text: 'That looks good! I like the recursive approach.', sender: 'other', timestamp: '10:42 AM' },
    { id: '6', text: 'Thanks! Let me know if you need help with anything else.', sender: 'me', timestamp: '10:43 AM' },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCode: message.includes('```')
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate reply after a short delay
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for sharing! I'll take a look at this approach.",
        sender: 'other',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="p-6 h-full">
      <div className="flex h-[calc(100vh-120px)] rounded-lg overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-80 bg-codechatter-dark border-r border-codechatter-blue/20">
          <div className="p-4">
            <div className="relative mb-4">
              <Input 
                placeholder="Search contacts..." 
                className="bg-codechatter-darker border-codechatter-blue/20 text-white pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </div>
            
            <div className="space-y-2">
              {contacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`p-3 rounded-lg flex items-center cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id 
                      ? 'bg-gradient-to-r from-codechatter-blue/10 to-codechatter-purple/10'
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 mr-3">
                      <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white">
                        {contact.name.charAt(0)}
                      </div>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-2 h-3 w-3 bg-green-500 rounded-full border-2 border-codechatter-dark"></span>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm text-white truncate">{contact.name}</span>
                      <span className="text-white/40 text-xs">{contact.time}</span>
                    </div>
                    <p className="text-white/60 text-xs truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unreadCount && (
                    <span className="ml-2 h-5 w-5 bg-codechatter-purple text-white text-xs flex items-center justify-center rounded-full">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        {selectedContact ? (
          <div className="flex-grow flex flex-col bg-codechatter-darker">
            {/* Chat Header */}
            <div className="p-4 border-b border-codechatter-blue/20 bg-codechatter-dark flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white">
                    {selectedContact.name.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <div className="font-medium text-white">{selectedContact.name}</div>
                  <div className="text-white/60 text-xs">
                    {selectedContact.online ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                  <Phone size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                  <Video size={18} />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === 'me' 
                        ? 'bg-codechatter-blue/20' 
                        : 'bg-codechatter-purple/20'
                    }`}
                  >
                    {msg.isCode ? (
                      <div className="bg-codechatter-dark rounded font-mono text-xs p-3 overflow-x-auto">
                        {msg.text.replace(/```\w*\n?|\n?```/g, '')}
                      </div>
                    ) : (
                      <p className="text-sm text-white">{msg.text}</p>
                    )}
                    <div className="text-right mt-1">
                      <span className="text-xs text-white/40">{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-codechatter-blue/20 bg-codechatter-dark">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                  <Code size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                  <Image size={18} />
                </Button>
                <Input
                  placeholder="Type a message..."
                  className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <Button 
                  className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
                  onClick={handleSendMessage}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-codechatter-darker text-white/40">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
