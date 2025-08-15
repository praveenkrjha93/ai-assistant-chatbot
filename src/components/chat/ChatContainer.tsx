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

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm Joule, your AI business assistant. I can help you with analytics, process optimization, and strategic insights. What would you like to explore today?",
    isBot: true,
    timestamp: new Date(),
  },
];

const jouleResponses = [
  "Based on your data patterns, I've identified several optimization opportunities. Let me analyze the key metrics for you...",
  "I understand your business context. Here's what the data reveals about performance trends and potential improvements...",
  "Excellent question! Drawing from enterprise best practices, I recommend the following strategic approach...",
  "I've processed your request through our advanced analytics engine. The insights suggest several actionable strategies...",
  "Great insight! From an enterprise perspective, this aligns with current market trends. Let me provide you with detailed analysis...",
  "Thank you for that context. Based on SAP's extensive business intelligence, here's my strategic recommendation...",
];

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
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
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing with realistic delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: jouleResponses[Math.floor(Math.random() * jouleResponses.length)],
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  return (
    <div className="flex flex-col h-[700px] md:h-[750px] bg-gradient-to-b from-enterprise-surface/90 to-chat-surface/90 backdrop-blur-xl shadow-card rounded-2xl overflow-hidden border border-border/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-header p-6 border-b border-border/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sap-blue/5 via-transparent to-sap-blue/5"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-sap-blue to-sap-blue-light rounded-2xl flex items-center justify-center shadow-glow"
              animate={{ 
                boxShadow: connectionStatus === 'connected' 
                  ? '0 0 20px hsl(212 100% 48% / 0.3)' 
                  : '0 0 10px hsl(212 100% 48% / 0.1)' 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Brain className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Joule
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-sap-blue" />
                </motion.div>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <motion.div 
                  className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-green-400' :
                    connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-sm text-sap-gray">
                  {connectionStatus === 'connected' ? 'AI Assistant Ready' :
                   connectionStatus === 'connecting' ? 'Connecting...' : 'Connection Error'}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-sap-gray">Enterprise AI</div>
            <div className="text-xs text-sap-blue font-medium">SAP Business Intelligence</div>
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
                  <p className="text-sm text-sap-gray">Joule is analyzing...</p>
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