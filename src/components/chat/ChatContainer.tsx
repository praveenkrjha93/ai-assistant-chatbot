import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Sparkles, Brain } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const BandhuResponses = [
  "Based on your data patterns, I've identified several optimization opportunities. Let me analyze the key metrics for you...",
  "I understand your business context. Here's what the data reveals about performance trends and potential improvements...",
  "Excellent question! Drawing from enterprise best practices, I recommend the following strategic approach...",
  "I've processed your request through our advanced analytics engine. The insights suggest several actionable strategies...",
  "Great insight! From an enterprise perspective, this aligns with current market trends. Let me provide you with detailed analysis...",
  "Thank you for that context. Based on SAP's extensive business intelligence, here's my strategic recommendation...",
];

export const ChatContainer = ({ messages, onSendMessage }: ChatContainerProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connected');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate connection status
    setConnectionStatus('connecting');
    const timer = setTimeout(() => setConnectionStatus('connected'), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (content: string) => {
    setIsTyping(true);
    
    // Call the parent's onSendMessage function
    onSendMessage(content);
    
    // Simulate AI processing with realistic delay
    setTimeout(() => {
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  return (
    <div className="flex flex-col h-[700px] md:h-[750px] glass-strong shadow-card rounded-3xl overflow-hidden border border-white/20 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative p-6 border-b border-white/10 overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center pulse-glow border border-white/20"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain className="w-8 h-8 text-white drop-shadow-lg" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="gradient-text">Bandhu</span>
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-indigo-400 drop-shadow-lg" />
                </motion.div>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <motion.div 
                  className={`w-2.5 h-2.5 rounded-full shadow-lg ${
                    connectionStatus === 'connected' ? 'bg-emerald-400 shadow-emerald-400/50' :
                    connectionStatus === 'connecting' ? 'bg-amber-400 shadow-amber-400/50' : 'bg-red-400 shadow-red-400/50'
                  }`}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-sm text-sap-gray font-medium">
                  {connectionStatus === 'connected' ? 'AI Assistant Ready' :
                   connectionStatus === 'connecting' ? 'Connecting...' : 'Connection Error'}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-sap-gray/80 font-medium">Next-Gen AI</div>
            <div className="text-xs bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">Intelligent Assistant</div>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-chat-background/50 backdrop-blur-sm">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                index={index}
              />
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 mb-6"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-sap-blue to-sap-blue-light rounded-xl flex items-center justify-center shadow-glow border border-border/50">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="bg-enterprise-surface/80 text-bot-message-foreground px-5 py-4 rounded-2xl rounded-tl-md shadow-message border border-message-border/30 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-sap-blue rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-sap-gray">Bandhu is analyzing...</p>
                </div>
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
