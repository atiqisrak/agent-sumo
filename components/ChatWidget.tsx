"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ChatSidebar from "./chat/ChatSidebar";
import ChatMessage from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import LoadingIndicator from "./shared/LoadingIndicator";
import SettingsModal from "./settings/SettingsModal";
import SettingsButton from "./settings/SettingsButton";
import { useSettings } from "./settings/useSettings";
import { SparklesIcon } from "./icons";
import { Message, ChatHistory } from "./types/chat";

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Agent Sumo, your AI business operations assistant. I can help you with creating purchase orders, managing inventory, processing requisitions, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Agent Sumo Pro");
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>("current");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { settings, updateSettings } = useSettings();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fix hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load chat history from localStorage
  useEffect(() => {
    if (!mounted) return;

    const savedHistory = localStorage.getItem("agent-sumo-history");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      // Convert string timestamps back to Date objects
      const historyWithDates = parsedHistory.map((chat: any) => ({
        ...chat,
        timestamp: new Date(chat.timestamp),
        messages: chat.messages.map((message: any) => ({
          ...message,
          timestamp: new Date(message.timestamp),
        })),
      }));
      setChatHistory(historyWithDates);
    }
  }, [mounted]);

  // Save chat history to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("agent-sumo-history", JSON.stringify(chatHistory));
  }, [chatHistory, mounted]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
        functionCalled: data.function_called,
        parameters: data.parameters,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Auto-save chat if enabled
      if (settings.autoSave && currentChatId === "current") {
        const chatTitle =
          inputMessage.slice(0, 50) + (inputMessage.length > 50 ? "..." : "");
        const newChat: ChatHistory = {
          id: Date.now().toString(),
          title: chatTitle,
          timestamp: new Date(),
          messages: [...messages, userMessage, botMessage],
        };
        setChatHistory((prev) => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error processing your request. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm Agent Sumo, your AI business operations assistant. I can help you with creating purchase orders, managing inventory, processing requisitions, and more. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setCurrentChatId("current");
  };

  const loadChat = (chat: ChatHistory) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
  };

  const deleteChat = (chatId: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

  if (!mounted) {
    return (
      <div className="flex h-screen bg-[var(--color-gray-900)] text-[var(--color-white)] items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-[var(--color-white)]" />
          </div>
          <h1 className="text-xl font-bold">Agent Sumo</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[var(--color-gray-900)] text-[var(--color-white)]">
      <ChatSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        chatHistory={chatHistory}
        currentChatId={currentChatId}
        onLoadChat={loadChat}
        onDeleteChat={deleteChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[var(--color-gray-800)] border-b border-[var(--color-gray-700)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={startNewChat}
                className="px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:from-[var(--color-primary-dark)] hover:to-[var(--color-secondary-dark)] rounded-xl transition-all duration-200 font-medium shadow-lg"
              >
                New Chat
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-[var(--color-gray-300)] hover:text-[var(--color-white)] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="text-[var(--color-gray-300)] hover:text-[var(--color-white)] transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/features"
                className="text-[var(--color-gray-300)] hover:text-[var(--color-white)] transition-colors"
              >
                Features
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-[var(--color-gray-400)]">
                Private
              </span>
              <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
              <SettingsButton onClick={() => setIsSettingsOpen(true)} />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Loading Indicator */}
          {isLoading && <LoadingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={sendMessage}
          isLoading={isLoading}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
      />
    </div>
  );
}
