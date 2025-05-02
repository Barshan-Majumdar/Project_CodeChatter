
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Search, Phone, Video, Send, Image, Paperclip, Mic } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unreadCount?: number;
  avatar?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  isCode?: boolean;
  isImage?: boolean;
  imageUrl?: string;
  isAttachment?: boolean;
  attachmentName?: string;
  isVoice?: boolean;
  voiceDuration?: string;
}

const Chat: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { 
      id: '1', 
      name: 'Alex Chen', 
      lastMessage: 'Check out this new algorithm!', 
      time: '10:45 AM', 
      online: true, 
      unreadCount: 2,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    { 
      id: '2', 
      name: 'Sarah Kim', 
      lastMessage: 'Looking for help with the BST challenge', 
      time: 'Yesterday', 
      online: true,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    { 
      id: '3', 
      name: 'Michael Wong', 
      lastMessage: 'Thanks for the code review', 
      time: 'Yesterday', 
      online: false,
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg' 
    },
    { 
      id: '4', 
      name: 'Emma Davis', 
      lastMessage: 'Let\'s tackle that hard problem together', 
      time: 'Monday', 
      online: false,
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    { 
      id: '5', 
      name: 'David Johnson', 
      lastMessage: 'Here\'s my solution using DP', 
      time: 'Monday', 
      online: true,
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [isCallingDialogOpen, setIsCallingDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [callStatus, setCallStatus] = useState<'dialing' | 'connected' | 'ended'>('dialing');
  const { toast } = useToast();
  
  // Sample conversations for each contact
  const contactMessages: Record<string, Message[]> = {
    '1': [
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
    ],
    '2': [
      { id: '1', text: 'Hi! I need some help with the BST challenge.', sender: 'other', timestamp: '9:15 AM' },
      { id: '2', text: 'Sure, what part are you struggling with?', sender: 'me', timestamp: '9:20 AM' },
      { id: '3', text: 'I can\'t figure out how to check if a tree is balanced.', sender: 'other', timestamp: '9:22 AM' },
      { 
        id: '4', 
        isImage: true, 
        imageUrl: 'https://placehold.co/400x300/darkblue/white?text=BST+Diagram', 
        text: 'Here\'s my current diagram', 
        sender: 'other', 
        timestamp: '9:25 AM' 
      },
      { id: '5', text: 'Let me check this out and get back to you.', sender: 'me', timestamp: '9:30 AM' },
    ],
    '3': [
      { id: '1', text: 'Thanks for reviewing my code yesterday!', sender: 'other', timestamp: '8:45 AM' },
      { id: '2', text: 'No problem! Happy to help.', sender: 'me', timestamp: '9:00 AM' },
      { 
        id: '3', 
        text: 'Here\'s the updated version with your suggestions', 
        sender: 'other', 
        timestamp: '9:05 AM',
        isAttachment: true,
        attachmentName: 'updated_solution.js'
      },
      { id: '4', text: 'I\'ll take a look at it today.', sender: 'me', timestamp: '9:10 AM' },
    ],
    '4': [
      { id: '1', text: 'Are you free to work on that algorithm problem?', sender: 'other', timestamp: 'Monday 2:30 PM' },
      { id: '2', text: 'Yes, I have some time this afternoon.', sender: 'me', timestamp: 'Monday 2:35 PM' },
      { 
        id: '3', 
        text: 'Voice message', 
        sender: 'other', 
        timestamp: 'Monday 2:40 PM',
        isVoice: true,
        voiceDuration: '0:42'
      },
      { id: '4', text: 'Let\'s connect at 4 PM to discuss it.', sender: 'me', timestamp: 'Monday 3:00 PM' },
    ],
    '5': [
      { id: '1', text: 'Check out my dynamic programming solution!', sender: 'other', timestamp: 'Monday 10:15 AM' },
      { id: '2', text: 'Looks interesting, how\'s the time complexity?', sender: 'me', timestamp: 'Monday 10:20 AM' },
      { id: '3', text: 'O(n^2) but I think we can optimize it further.', sender: 'other', timestamp: 'Monday 10:25 AM' },
      { id: '4', text: 'I agree, let\'s work on it together.', sender: 'me', timestamp: 'Monday 10:30 AM' },
    ],
  };

  const [messages, setMessages] = useState<Message[]>(contactMessages[selectedContact ? selectedContact.id : '1']);

  // Update messages when selected contact changes
  useEffect(() => {
    if (selectedContact) {
      setMessages(contactMessages[selectedContact.id]);
      // Clear unread count when selecting a contact
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, unreadCount: 0 } 
          : contact
      ));
    }
  }, [selectedContact]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;

    // Add new message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCode: message.includes('```')
    };

    // Update messages
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Update contactMessages for persistence
    if (selectedContact) {
      contactMessages[selectedContact.id] = updatedMessages;
    }

    // Update last message in contacts
    setContacts(contacts.map(contact => 
      contact.id === selectedContact.id 
        ? { ...contact, lastMessage: message, time: 'Just now' } 
        : contact
    ));

    setMessage('');

    // Simulate reply after a short delay
    setTimeout(() => {
      const replyOptions = [
        "That sounds great!",
        "Thanks for sharing.",
        "Let me think about that for a bit.",
        "Interesting approach! Have you considered...",
        "Can you explain more about that?"
      ];
      
      const reply: Message = {
        id: Date.now().toString(),
        text: replyOptions[Math.floor(Math.random() * replyOptions.length)],
        sender: 'other',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const newUpdatedMessages = [...updatedMessages, reply];
      setMessages(newUpdatedMessages);
      contactMessages[selectedContact.id] = newUpdatedMessages;
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedContact || !event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    
    // Create new message with image
    const newMessage: Message = {
      id: Date.now().toString(),
      text: 'Shared an image',
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isImage: true,
      imageUrl: imageUrl
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    contactMessages[selectedContact.id] = updatedMessages;
    
    // Update contact's last message
    setContacts(contacts.map(contact => 
      contact.id === selectedContact.id 
        ? { ...contact, lastMessage: 'Image', time: 'Just now' } 
        : contact
    ));

    // Clear the file input
    event.target.value = '';
    
    toast({
      title: "Image sent",
      description: "Image has been shared successfully",
    });
  };

  const handleAttachmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedContact || !event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    
    // Create new message with file attachment
    const newMessage: Message = {
      id: Date.now().toString(),
      text: 'Shared a file',
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAttachment: true,
      attachmentName: file.name
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    contactMessages[selectedContact.id] = updatedMessages;
    
    // Update contact's last message
    setContacts(contacts.map(contact => 
      contact.id === selectedContact.id 
        ? { ...contact, lastMessage: `File: ${file.name}`, time: 'Just now' } 
        : contact
    ));

    // Clear the file input
    event.target.value = '';
    
    toast({
      title: "File sent",
      description: "File has been shared successfully",
    });
  };

  const toggleRecording = () => {
    if (!selectedContact) return;
    
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // Simulate sending voice message
      const newMessage: Message = {
        id: Date.now().toString(),
        text: 'Voice message',
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isVoice: true,
        voiceDuration: '0:08'
      };
      
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      contactMessages[selectedContact.id] = updatedMessages;
      
      // Update contact's last message
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, lastMessage: 'Voice message (0:08)', time: 'Just now' } 
          : contact
      ));
      
      toast({
        title: "Voice message sent",
        description: "Voice message has been shared successfully",
      });
    } else {
      toast({
        title: "Recording started",
        description: "Recording voice message...",
      });
    }
  };

  const handlePhoneCall = () => {
    if (!selectedContact) return;
    setIsCallingDialogOpen(true);
    setCallStatus('dialing');
    
    // Simulate call connecting after 2 seconds
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };
  
  const handleVideoCall = () => {
    if (!selectedContact) return;
    setIsVideoDialogOpen(true);
    setCallStatus('dialing');
    
    // Simulate call connecting after 2 seconds
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };
  
  const endCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setIsCallingDialogOpen(false);
      setIsVideoDialogOpen(false);
    }, 1000);
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </div>
            
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-2 pr-4">
                {filteredContacts.map(contact => (
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
                      <Avatar className="h-12 w-12 mr-3">
                        {contact.avatar ? (
                          <img src={contact.avatar} alt={contact.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white">
                            {contact.name.charAt(0)}
                          </div>
                        )}
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
            </ScrollArea>
          </div>
        </div>

        {/* Chat Area */}
        {selectedContact ? (
          <div className="flex-grow flex flex-col bg-codechatter-darker">
            {/* Chat Header */}
            <div className="p-4 border-b border-codechatter-blue/20 bg-codechatter-dark flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  {selectedContact.avatar ? (
                    <img src={selectedContact.avatar} alt={selectedContact.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white">
                      {selectedContact.name.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium text-white">{selectedContact.name}</div>
                  <div className="text-white/60 text-xs">
                    {selectedContact.online ? 'Online' : 'Last seen today at 4:30 PM'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/60 hover:text-white hover:bg-white/10"
                  onClick={handlePhoneCall}
                >
                  <Phone size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/60 hover:text-white hover:bg-white/10"
                  onClick={handleVideoCall}
                >
                  <Video size={18} />
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                      <span className="sr-only">Contact info</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white">
                        <path d="M3.5 7.5C3.5 8.32843 2.82843 9 2 9C1.17157 9 0.5 8.32843 0.5 7.5C0.5 6.67157 1.17157 6 2 6C2.82843 6 3.5 6.67157 3.5 7.5ZM8.5 7.5C8.5 8.32843 7.82843 9 7 9C6.17157 9 5.5 8.32843 5.5 7.5C5.5 6.67157 6.17157 6 7 6C7.82843 6 8.5 6.67157 8.5 7.5ZM14.5 7.5C14.5 8.32843 13.8284 9 13 9C12.1716 9 11.5 8.32843 11.5 7.5C11.5 6.67157 12.1716 6 13 6C13.8284 6 14.5 6.67157 14.5 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="bg-codechatter-darker text-white w-[300px]">
                    <div className="flex flex-col items-center pt-6 pb-8">
                      <Avatar className="h-24 w-24 mb-4">
                        {selectedContact.avatar ? (
                          <img src={selectedContact.avatar} alt={selectedContact.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white text-2xl">
                            {selectedContact.name.charAt(0)}
                          </div>
                        )}
                      </Avatar>
                      <h3 className="text-xl font-medium mb-1">{selectedContact.name}</h3>
                      <p className="text-white/60 text-sm">{selectedContact.online ? 'Online' : 'Offline'}</p>
                      
                      <div className="flex gap-4 mt-4">
                        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                          <Phone size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                          <Video size={20} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Bio</h4>
                        <p className="text-white/70 text-sm">Software developer passionate about algorithms and data structures.</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Media, links and docs</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="aspect-square bg-codechatter-dark rounded-md"></div>
                          <div className="aspect-square bg-codechatter-dark rounded-md"></div>
                          <div className="aspect-square bg-codechatter-dark rounded-md"></div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="destructive" className="w-full">Block Contact</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'me' 
                          ? 'bg-codechatter-blue/20 rounded-br-none' 
                          : 'bg-codechatter-purple/20 rounded-bl-none'
                      }`}
                    >
                      {msg.isImage ? (
                        <div className="mb-2">
                          <img 
                            src={msg.imageUrl} 
                            alt="Shared image" 
                            className="rounded-md max-w-full object-cover" 
                          />
                          {msg.text && <p className="text-sm text-white mt-2">{msg.text}</p>}
                        </div>
                      ) : msg.isAttachment ? (
                        <div className="bg-codechatter-dark rounded-md p-2 flex items-center mb-2">
                          <div className="mr-2">📎</div>
                          <div className="text-sm">{msg.attachmentName}</div>
                        </div>
                      ) : msg.isVoice ? (
                        <div className="bg-codechatter-dark rounded-md p-2 flex items-center gap-2 mb-2 w-[160px]">
                          <div>🎤</div>
                          <div className="h-1 flex-1 bg-white/20 rounded-full">
                            <div className="h-full bg-white/60 rounded-full w-1/3"></div>
                          </div>
                          <div className="text-xs">{msg.voiceDuration}</div>
                        </div>
                      ) : msg.isCode ? (
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
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-codechatter-blue/20 bg-codechatter-dark">
              <div className="flex items-end gap-2">
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/60 hover:text-white hover:bg-white/10"
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => attachmentInputRef.current?.click()}
                  >
                    <Paperclip size={20} />
                    <input 
                      type="file"
                      ref={attachmentInputRef}
                      onChange={handleAttachmentUpload}
                      className="hidden"
                    />
                  </Button>
                </div>
                
                <div className="flex-grow">
                  {message.length > 50 ? (
                    <Textarea
                      placeholder="Type a message..."
                      className="bg-codechatter-darker border-codechatter-blue/20 text-white resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={3}
                    />
                  ) : (
                    <Input
                      placeholder="Type a message..."
                      className="bg-codechatter-darker border-codechatter-blue/20 text-white"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                      }}
                    />
                  )}
                </div>
                
                {message.trim() ? (
                  <Button 
                    className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90"
                    onClick={handleSendMessage}
                  >
                    <Send size={18} />
                  </Button>
                ) : (
                  <Button 
                    className={`${isRecording ? 'bg-red-500' : 'bg-gradient-to-r from-codechatter-blue to-codechatter-purple'} hover:opacity-90`}
                    onClick={toggleRecording}
                  >
                    <Mic size={18} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-codechatter-darker text-white/40">
            Select a contact to start chatting
          </div>
        )}
      </div>

      {/* Phone Call Dialog */}
      <Dialog open={isCallingDialogOpen} onOpenChange={setIsCallingDialogOpen}>
        <DialogContent className="sm:max-w-md bg-codechatter-darker border-codechatter-blue/20">
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              {callStatus === 'dialing' ? 'Calling...' : 
               callStatus === 'connected' ? 'Call in progress' : 
               'Call ended'}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center py-8">
              <Avatar className="h-24 w-24 mb-4">
                {selectedContact?.avatar ? (
                  <img src={selectedContact.avatar} alt={selectedContact?.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white text-2xl">
                    {selectedContact?.name.charAt(0)}
                  </div>
                )}
              </Avatar>
              <h3 className="text-xl font-medium text-white mb-2">{selectedContact?.name}</h3>
              <p className="text-white/60 mb-8">
                {callStatus === 'dialing' ? 'Calling...' : 
                 callStatus === 'connected' ? 'Call connected' : 
                 'Call ended'}
              </p>
              
              <div className="flex gap-4">
                {callStatus !== 'ended' && (
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full h-14 w-14"
                    onClick={endCall}
                  >
                    <Phone className="h-6 w-6" />
                  </Button>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      
      {/* Video Call Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-[500px] h-[400px] bg-codechatter-darker border-codechatter-blue/20 p-0 overflow-hidden">
          <DialogHeader className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
            <DialogTitle className="text-white">
              {callStatus === 'dialing' ? 'Video calling...' : 
               callStatus === 'connected' ? 'Video call connected' : 
               'Video call ended'}
            </DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-full bg-codechatter-dark">
            {callStatus === 'connected' && (
              <div className="absolute top-0 right-0 m-4 w-32 h-24 rounded-lg overflow-hidden border-2 border-white bg-codechatter-blue/30">
                {/* Your video preview here */}
              </div>
            )}
            
            <div className="w-full h-full flex flex-col items-center justify-center">
              {callStatus === 'dialing' && (
                <>
                  <Avatar className="h-24 w-24 mb-4">
                    {selectedContact?.avatar ? (
                      <img src={selectedContact.avatar} alt={selectedContact?.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white text-2xl">
                        {selectedContact?.name.charAt(0)}
                      </div>
                    )}
                  </Avatar>
                  <p className="text-white/80">Connecting video call...</p>
                </>
              )}
              
              {callStatus === 'connected' && (
                <div className="w-full h-full flex items-center justify-center">
                  {selectedContact?.avatar ? (
                    <img 
                      src={selectedContact.avatar} 
                      alt={selectedContact?.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white text-4xl">
                      {selectedContact?.name.charAt(0)}
                    </div>
                  )}
                </div>
              )}
              
              {callStatus === 'ended' && (
                <p className="text-white/80">Video call ended</p>
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center">
              {callStatus !== 'ended' && (
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="rounded-full h-12 w-12"
                  onClick={endCall}
                >
                  <Video className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
