import { motion } from "framer-motion";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { useChatSessions } from "@/hooks/useChatSessions";
import { Sparkles, Stars, Zap } from "lucide-react";

const BandhuResponses = [
  "Based on your data patterns, I've identified several optimization opportunities. Let me analyze the key metrics for you...",
  "I understand your business context. Here's what the data reveals about performance trends and potential improvements...",
  "Excellent question! Drawing from enterprise best practices, I recommend the following strategic approach...",
  "I've processed your request through our advanced analytics engine. The insights suggest several actionable strategies...",
  "Great insight! From an enterprise perspective, this aligns with current market trends. Let me provide you with detailed analysis...",
  "Thank you for that context. Based on SAP's extensive business intelligence, here's my strategic recommendation...",
];

const Index = () => {
  const {
    currentChatId,
    currentMessages,
    chatSessions,
    startNewChat,
    selectChat,
    deleteChat,
    addMessage,
    updateMessages
  } = useChatSessions();

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    
    addMessage(userMessage);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: BandhuResponses[Math.floor(Math.random() * BandhuResponses.length)],
        isBot: true,
        timestamp: new Date(),
      };
      
      addMessage(botResponse);
    }, 1500 + Math.random() * 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden flex">
      {/* Sidebar */}
      <ChatSidebar
        currentChatId={currentChatId || undefined}
        onNewChat={startNewChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
      />

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-mesh opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-mesh opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-mesh opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            {/* Enhanced Header with Icons */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
              >
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </motion.div>
              
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                Personal AI Assistant
              </h1>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10"
              >
                <Zap className="w-8 h-8 text-purple-400" />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-sap-gray max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Experience next-generation AI conversations with elegant design and intelligent responses
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              {[
                { icon: Stars, text: "Smart Responses", color: "from-indigo-500 to-blue-500" },
                { icon: Sparkles, text: "Modern UI", color: "from-purple-500 to-pink-500" },
                { icon: Zap, text: "Fast & Reliable", color: "from-emerald-500 to-teal-500" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-10 backdrop-blur-sm border border-white/10 text-sm font-medium text-white/90 shimmer`}
                >
                  <feature.icon className="w-4 h-4" />
                  {feature.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow effect behind chat container */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl scale-105 opacity-50"></div>
            <ChatContainer 
              messages={currentMessages}
              onSendMessage={handleSendMessage}
            />
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
