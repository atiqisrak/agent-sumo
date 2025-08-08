"use client";

import { useState, useRef, useEffect } from "react";
import { SendIcon, BotIcon, UserIcon } from "./icons";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  functionCalled?: string;
  parameters?: any;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. I can help you with business operations like creating purchase orders, managing inventory, and processing requisitions. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-w-2xl mx-auto">
      {/* Chat Header */}
      <div className="bg-primary-600 text-white px-6 py-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <BotIcon className="w-6 h-6" />
          <div>
            <h2 className="text-lg font-semibold">Agent Sumo</h2>
            <p className="text-primary-100 text-sm">
              AI Business Operations Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === "bot" && (
                  <BotIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  {message.functionCalled && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                      <p className="font-medium text-blue-800">
                        Function called: {message.functionCalled}
                      </p>
                      {message.parameters && (
                        <p className="text-blue-600 mt-1">
                          Parameters:{" "}
                          {JSON.stringify(message.parameters, null, 2)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {message.sender === "user" && (
                  <UserIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <BotIcon className="w-4 h-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
