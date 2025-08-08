"use client";

import Image from "next/image";
import {
  MessageIcon,
  FileIcon,
  SearchIcon,
  ClockIcon,
  ChevronLeftIcon,
} from "../icons";
import { ChatHistory } from "../types/chat";

interface ChatSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  chatHistory: ChatHistory[];
  currentChatId: string;
  onLoadChat: (chat: ChatHistory) => void;
  onDeleteChat: (chatId: string) => void;
}

export default function ChatSidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  chatHistory,
  currentChatId,
  onLoadChat,
  onDeleteChat,
}: ChatSidebarProps) {
  return (
    <div
      className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
            <Image
              src="/logo/icon.png"
              alt="Agent Sumo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Agent Sumo
              </h1>
              <p className="text-xs text-gray-400">AI Assistant</p>
            </div>
          )}
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search ⌘K"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-xl text-white shadow-lg"
          >
            <MessageIcon className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">Chat</span>}
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2.5 text-gray-300 hover:bg-gray-700 rounded-xl transition-all duration-200"
          >
            <FileIcon className="w-5 h-5" />
            {!sidebarCollapsed && <span>Files</span>}
          </a>
        </nav>

        {/* Chat History */}
        {!sidebarCollapsed && (
          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-400">History</span>
            </div>

            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div key={chat.id} className="group relative">
                  <button
                    onClick={() => onLoadChat(chat)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl hover:bg-gray-700 transition-all duration-200 ${
                      currentChatId === chat.id
                        ? "bg-gray-700 border border-gray-600"
                        : ""
                    }`}
                  >
                    <div className="text-sm text-gray-300 truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {chat.timestamp instanceof Date
                        ? chat.timestamp.toLocaleDateString()
                        : new Date(chat.timestamp).toLocaleDateString()}
                    </div>
                  </button>
                  <button
                    onClick={() => onDeleteChat(chat.id)}
                    className="opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 text-error hover:text-error-light transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <div className="absolute bottom-4 left-4">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
        >
          <ChevronLeftIcon
            className={`w-5 h-5 transition-transform ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
