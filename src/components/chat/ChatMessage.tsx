import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage = ({ message, index }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      className={`flex gap-3 mb-4 ${message.isBot ? 'justify-start' : 'justify-end'}`}
    >
      {message.isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-bot rounded-full flex items-center justify-center shadow-message">
          <Bot className="w-4 h-4 text-chat-bot-message-foreground" />
        </div>
      )}
      
      <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${message.isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-message
            ${message.isBot 
              ? 'bg-gradient-bot text-chat-bot-message-foreground border border-chat-message-border' 
              : 'bg-gradient-user text-chat-user-message-foreground'
            }
          `}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className={`mt-1 text-xs text-muted-foreground ${message.isBot ? 'text-left' : 'text-right'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!message.isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-user rounded-full flex items-center justify-center shadow-message order-2">
          <User className="w-4 h-4 text-chat-user-message-foreground" />
        </div>
      )}
    </motion.div>
  );
};