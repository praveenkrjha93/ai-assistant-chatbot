import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

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
      className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border/50 p-6"
    >
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 rounded-full border-chat-message-border bg-input shadow-sm focus:shadow-input-focus transition-all duration-200 text-base py-3 px-4"
        />
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          size="icon"
          className="rounded-full bg-gradient-send hover:opacity-90 transition-all duration-200 disabled:opacity-50 shadow-message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </motion.div>
  );
};