import { motion } from "framer-motion";
import { Bot, User, Sparkles, Brain } from "lucide-react";

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
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={`flex gap-4 mb-8 ${message.isBot ? 'justify-start' : 'justify-end'}`}
    >
      {message.isBot && (
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: index * 0.1 + 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <Brain className="w-6 h-6 text-white drop-shadow-lg relative z-10" />
        </motion.div>
      )}
      
      <div className={`max-w-xs md:max-w-md lg:max-w-2xl ${message.isBot ? 'order-2' : 'order-1'}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: index * 0.1 + 0.1,
            type: "spring",
            stiffness: 150,
            damping: 12
          }}
          className={`
            px-6 py-4 rounded-3xl shadow-message backdrop-blur-sm border relative overflow-hidden group
            ${message.isBot 
              ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-white border-white/10 rounded-tl-lg' 
              : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-white/20 rounded-tr-lg'
            }
          `}
        >
          {/* Enhanced shimmer effect for user messages */}
          {!message.isBot && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full opacity-0 group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none" />
          )}
          
          {/* Subtle glow for bot messages */}
          {message.isBot && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          
          <p className="text-sm md:text-base leading-relaxed font-medium relative z-10">{message.content}</p>
          
          {message.isBot && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10"
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div 
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.3 
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-medium">Bandhu AI</span>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className={`mt-2 text-xs text-slate-400 font-medium ${message.isBot ? 'text-left' : 'text-right'}`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </motion.div>
      </div>

      {!message.isBot && (
        <motion.div 
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: index * 0.1 + 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-glow border border-white/20 order-2 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <User className="w-6 h-6 text-white drop-shadow-lg relative z-10" />
        </motion.div>
      )}
    </motion.div>
  );
};
