"use client";

import { useRef, useEffect } from "react";
import { SendIcon, MicIcon } from "../icons";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export default function ChatInput({
  inputMessage,
  setInputMessage,
  onSendMessage,
  isLoading,
  selectedModel,
  setSelectedModel,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3 bg-gray-700 rounded-2xl border border-gray-600 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary transition-all duration-200 p-4 shadow-lg">
          <MicIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="How can Agent Sumo help?"
            className="flex-1 resize-none border-none outline-none bg-transparent text-white placeholder-gray-400 min-h-[20px] max-h-[120px] leading-5"
            disabled={isLoading}
            rows={1}
          />
          <div className="flex items-center space-x-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-gray-600 text-white text-sm rounded-lg px-3 py-1.5 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            >
              <option value="Agent Sumo Pro">Agent Sumo Pro</option>
              <option value="Agent Sumo Basic">Agent Sumo Basic</option>
            </select>
            <button
              onClick={onSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 hover:scale-105 active:scale-95 shadow-lg"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </p>
          <div className="text-xs text-gray-400">Agent Sumo v1.0</div>
        </div>
      </div>
    </div>
  );
}
