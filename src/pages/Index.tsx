import { motion } from "framer-motion";
import { ChatContainer } from "@/components/chat/ChatContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-main bg-clip-text text-transparent mb-6">
            Joule AI Assistant
          </h1>
          <p className="text-xl text-sap-gray max-w-3xl mx-auto leading-relaxed">
            Experience enterprise-grade AI conversations powered by SAP's intelligent business platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ChatContainer />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;