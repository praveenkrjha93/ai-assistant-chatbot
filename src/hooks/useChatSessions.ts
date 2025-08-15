import { useState, useEffect, useCallback } from "react";
import { ChatSession } from "@/components/chat/ChatSidebar";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatSessionData extends ChatSession {
  messages: Message[];
}

export const useChatSessions = () => {
  const [chatSessions, setChatSessions] = useState<ChatSessionData[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  // Initial welcome message
  const initialMessage: Message = {
    id: "1",
    content: "Hello! I'm Bandhu, your AI business assistant. I can help you with analytics, process optimization, and strategic insights. What would you like to explore today?",
    isBot: true,
    timestamp: new Date(),
  };

  // Load chat sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessionsData');
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        timestamp: new Date(session.timestamp),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setChatSessions(parsedSessions);
      
      // If there are existing sessions, load the most recent one
      if (parsedSessions.length > 0) {
        const mostRecent = parsedSessions.sort((a: ChatSessionData, b: ChatSessionData) => 
          b.timestamp.getTime() - a.timestamp.getTime()
        )[0];
        setCurrentChatId(mostRecent.id);
        setCurrentMessages(mostRecent.messages);
      } else {
        // Start with a new chat if no sessions exist
        startNewChat();
      }
    } else {
      // Start with a new chat if no saved data
      startNewChat();
    }
  }, []);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessionsData', JSON.stringify(chatSessions));
    }
  }, [chatSessions]);

  // Generate a chat title from the first user message
  const generateChatTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(msg => !msg.isBot);
    if (firstUserMessage) {
      const title = firstUserMessage.content.slice(0, 50);
      return title.length < firstUserMessage.content.length ? `${title}...` : title;
    }
    return `Chat ${new Date().toLocaleDateString()}`;
  };

  // Start a new chat session
  const startNewChat = useCallback(() => {
    const newChatId = Date.now().toString();
    const newMessages = [initialMessage];
    
    setCurrentChatId(newChatId);
    setCurrentMessages(newMessages);
    
    // Don't add to sessions until user sends first message
  }, []);

  // Select an existing chat session
  const selectChat = useCallback((chatId: string) => {
    const session = chatSessions.find(s => s.id === chatId);
    if (session) {
      setCurrentChatId(chatId);
      setCurrentMessages(session.messages);
    }
  }, [chatSessions]);

  // Delete a chat session
  const deleteChat = useCallback((chatId: string) => {
    setChatSessions(prev => prev.filter(s => s.id !== chatId));
    
    // If the deleted chat was the current one, start a new chat
    if (currentChatId === chatId) {
      startNewChat();
    }
  }, [currentChatId, startNewChat]);

  // Add a message to the current chat
  const addMessage = useCallback((message: Message) => {
    setCurrentMessages(prev => {
      const newMessages = [...prev, message];
      
      // Update or create the chat session
      setChatSessions(prevSessions => {
        const existingSessionIndex = prevSessions.findIndex(s => s.id === currentChatId);
        
        if (existingSessionIndex >= 0) {
          // Update existing session
          const updatedSessions = [...prevSessions];
          updatedSessions[existingSessionIndex] = {
            ...updatedSessions[existingSessionIndex],
            messages: newMessages,
            lastMessage: message.content,
            timestamp: message.timestamp,
            messageCount: newMessages.length,
            title: updatedSessions[existingSessionIndex].title || generateChatTitle(newMessages)
          };
          return updatedSessions;
        } else {
          // Create new session (first user message)
          if (!message.isBot && currentChatId) {
            const newSession: ChatSessionData = {
              id: currentChatId,
              title: generateChatTitle(newMessages),
              lastMessage: message.content,
              timestamp: message.timestamp,
              messageCount: newMessages.length,
              messages: newMessages
            };
            return [...prevSessions, newSession];
          }
          return prevSessions;
        }
      });
      
      return newMessages;
    });
  }, [currentChatId]);

  // Update messages (for bulk updates like when bot responds)
  const updateMessages = useCallback((messages: Message[]) => {
    setCurrentMessages(messages);
    
    if (currentChatId && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      setChatSessions(prevSessions => {
        const existingSessionIndex = prevSessions.findIndex(s => s.id === currentChatId);
        
        if (existingSessionIndex >= 0) {
          const updatedSessions = [...prevSessions];
          updatedSessions[existingSessionIndex] = {
            ...updatedSessions[existingSessionIndex],
            messages,
            lastMessage: lastMessage.content,
            timestamp: lastMessage.timestamp,
            messageCount: messages.length,
            title: updatedSessions[existingSessionIndex].title || generateChatTitle(messages)
          };
          return updatedSessions;
        } else {
          // Create new session if it doesn't exist
          const hasUserMessage = messages.some(msg => !msg.isBot);
          if (hasUserMessage) {
            const newSession: ChatSessionData = {
              id: currentChatId,
              title: generateChatTitle(messages),
              lastMessage: lastMessage.content,
              timestamp: lastMessage.timestamp,
              messageCount: messages.length,
              messages
            };
            return [...prevSessions, newSession];
          }
          return prevSessions;
        }
      });
    }
  }, [currentChatId]);

  // Get chat sessions for sidebar (without full message data)
  const getChatSessions = useCallback((): ChatSession[] => {
    return chatSessions.map(session => ({
      id: session.id,
      title: session.title,
      lastMessage: session.lastMessage,
      timestamp: session.timestamp,
      messageCount: session.messageCount
    }));
  }, [chatSessions]);

  return {
    currentChatId,
    currentMessages,
    chatSessions: getChatSessions(),
    startNewChat,
    selectChat,
    deleteChat,
    addMessage,
    updateMessages
  };
};
