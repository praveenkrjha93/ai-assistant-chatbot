import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date(),
  },
];

const botResponses = [
  "That's an interesting question! Let me think about that...",
  "I understand what you're asking. Here's what I think...",
  "Great point! From my perspective...",
  "Thanks for sharing that with me. I'd say...",
  "That's a thoughtful question. My response would be...",
  "I appreciate you asking. Here's my take on it...",
];

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-card shadow-card-custom rounded-xl overflow-hidden border border-border">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-header p-6 border-b border-border/50"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-main rounded-full flex items-center justify-center shadow-message">
            <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">AI Assistant</h2>
            <p className="text-sm text-muted-foreground">Online • Ready to help</p>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-chat-background">
        <div className="space-y-1">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              index={index}
            />
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3 mb-4"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-bot rounded-full flex items-center justify-center shadow-message">
                <div className="w-4 h-4 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1 h-1 bg-chat-bot-message-foreground rounded-full mr-1"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-1 h-1 bg-chat-bot-message-foreground rounded-full mr-1"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-1 h-1 bg-chat-bot-message-foreground rounded-full"
                  />
                </div>
              </div>
              <div className="bg-gradient-bot text-chat-bot-message-foreground px-4 py-3 rounded-2xl shadow-message border border-chat-message-border">
                <p className="text-sm text-muted-foreground">AI is typing...</p>
              </div>
            </motion.div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};