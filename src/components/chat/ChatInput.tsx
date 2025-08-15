import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative p-6 border-t border-white/10 backdrop-blur-xl"
    >
      {/* Enhanced background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-800/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-mesh opacity-10"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.form 
          onSubmit={handleSubmit} 
          className={`
            flex items-center gap-3 p-3 rounded-3xl glass-strong border transition-all duration-300 relative overflow-hidden
            ${isFocused ? 'border-indigo-400/50 shadow-glow' : 'border-white/20'}
          `}
          animate={{ 
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Animated background for focused state */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0"
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-2xl text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200 relative z-10"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
          </motion.div>
          
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask Bandhu anything..."
            disabled={disabled}
            className="flex-1 border-0 bg-transparent text-base py-4 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400 text-white font-medium relative z-10"
          />
          
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-2xl text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-200 relative z-10"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              boxShadow: message.trim() && !disabled 
                ? '0 0 20px hsl(235 84% 67% / 0.4)' 
                : '0 0 10px hsl(235 84% 67% / 0.1)' 
            }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              size="icon"
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg border border-white/20 relative z-10 w-12 h-12"
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </motion.div>
        </motion.form>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mt-4 gap-3 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
            ></motion.div>
            <span className="font-medium">Powered by Bandhu AI</span>
          </div>
          <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Next-Gen Intelligence</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
