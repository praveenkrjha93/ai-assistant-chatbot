import { motion } from "framer-motion";
import { Bot, User, Sparkles } from "lucide-react";

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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={`flex gap-4 mb-6 ${message.isBot ? 'justify-start' : 'justify-end'}`}
    >
      {message.isBot && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-sap-blue to-sap-blue-light rounded-xl flex items-center justify-center shadow-glow border border-border/50"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      )}
      
      <div className={`max-w-xs md:max-w-md lg:max-w-2xl ${message.isBot ? 'order-2' : 'order-1'}`}>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.1 }}
          className={`
            px-5 py-4 rounded-2xl shadow-message backdrop-blur-sm border relative overflow-hidden
            ${message.isBot 
              ? 'bg-enterprise-surface/80 text-bot-message-foreground border-message-border/30 rounded-tl-md' 
              : 'bg-gradient-user text-user-message-foreground border-sap-blue/20 rounded-tr-md'
            }
          `}
        >
          {!message.isBot && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full opacity-0 animate-[shimmer_2s_ease-in-out_infinite] pointer-events-none" />
          )}
          <p className="text-sm leading-relaxed font-medium">{message.content}</p>
          {message.isBot && (
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/20">
              <div className="flex gap-1">
                <motion.div 
                  className="w-1.5 h-1.5 bg-sap-blue rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 bg-sap-blue rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 bg-sap-blue rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />
              </div>
              <span className="text-xs text-sap-gray">Joule AI</span>
            </div>
          )}
        </motion.div>
        <div className={`mt-2 text-xs text-sap-gray ${message.isBot ? 'text-left' : 'text-right'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!message.isBot && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="flex-shrink-0 w-10 h-10 bg-gradient-user rounded-xl flex items-center justify-center shadow-glow border border-sap-blue/20 order-2"
        >
          <User className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};