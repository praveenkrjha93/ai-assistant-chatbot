import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Mic } from "lucide-react";
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
      transition={{ duration: 0.3 }}
      className="sticky bottom-0 bg-gradient-to-t from-enterprise-surface/95 via-enterprise-surface/80 to-transparent backdrop-blur-xl border-t border-border/30 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.form 
          onSubmit={handleSubmit} 
          className={`
            flex gap-3 p-2 rounded-2xl bg-chat-surface/50 backdrop-blur-sm border transition-all duration-300
            ${isFocused ? 'border-sap-blue/50 shadow-input' : 'border-border/30'}
          `}
          animate={{ 
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused ? 'var(--shadow-glow)' : 'var(--shadow-message)'
          }}
          transition={{ duration: 0.2 }}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl text-sap-gray hover:text-sap-blue hover:bg-sap-blue/10 transition-all duration-200"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask Joule anything..."
            disabled={disabled}
            className="flex-1 border-0 bg-transparent text-base py-3 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sap-gray text-foreground"
          />
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl text-sap-gray hover:text-sap-blue hover:bg-sap-blue/10 transition-all duration-200"
          >
            <Mic className="w-4 h-4" />
          </Button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              size="icon"
              className="rounded-xl bg-gradient-send hover:opacity-90 transition-all duration-200 disabled:opacity-40 shadow-glow border border-sap-blue/20"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.form>
        
        <div className="flex items-center justify-center mt-3 gap-2 text-xs text-sap-gray">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-sap-blue rounded-full animate-pulse"></div>
            <span>Powered by SAP Joule AI</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};