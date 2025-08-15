import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, Clock, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface ChatSidebarProps {
  currentChatId?: string;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const ChatSidebar = ({ 
  currentChatId, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat 
}: ChatSidebarProps) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load chat sessions from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('chatSessions');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        timestamp: new Date(chat.timestamp)
      }));
      setChatSessions(parsedChats);
    }
  }, []);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  // Filter chats based on search query
  const filteredChats = chatSessions.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the last 10 chats, sorted by timestamp
  const recentChats = filteredChats
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10);

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatSessions(prev => prev.filter(chat => chat.id !== chatId));
    onDeleteChat(chatId);
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`h-full bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-white/10 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-80'
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-4"
        >
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-400" />
              Chat History
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* New Chat Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={onNewChat}
            className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 ${
              isCollapsed ? 'px-2' : 'px-4'
            }`}
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">New Chat</span>}
          </Button>
        </motion.div>

        {/* Search */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-indigo-400"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          <AnimatePresence>
            {recentChats.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-400"
              >
                {!isCollapsed && (
                  <div>
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No chat history yet</p>
                    <p className="text-xs mt-1">Start a conversation to see it here</p>
                  </div>
                )}
              </motion.div>
            ) : (
              recentChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectChat(chat.id)}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                    currentChatId === chat.id 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-white truncate">
                            {chat.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleDeleteChat(chat.id, e)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <p className="text-xs text-gray-400 truncate mb-2">
                          {chat.lastMessage}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{formatTimestamp(chat.timestamp)}</span>
                          <span>{chat.messageCount} messages</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 border-t border-white/10"
        >
          <div className="text-xs text-gray-400 text-center">
            Showing last {Math.min(recentChats.length, 10)} chats
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
