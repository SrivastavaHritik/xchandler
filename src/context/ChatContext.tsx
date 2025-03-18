import { createContext, useContext, useState, useEffect } from "react";

interface ChatContextType {
  chatId: string | null;
  setChatId: (id: string | null) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatId, setChatId] = useState<string | null>(() => {
    return localStorage.getItem("chatId") || null;
  });

  useEffect(() => {
    if (chatId) {
      localStorage.setItem("chatId", chatId);
    } else {
      localStorage.removeItem("chatId");
    }
  }, [chatId]);

  function clearChat() {
    setChatId(null);
    localStorage.removeItem("chatId");
  }

  return (
    <ChatContext.Provider value={{ chatId, setChatId, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
