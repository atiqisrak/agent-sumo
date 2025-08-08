"use client";

import { BotIcon, UserIcon } from "../icons";
import { Message } from "../types/chat";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-3xl ${
          message.sender === "user" ? "flex-row-reverse" : "flex-row"
        } items-start space-x-3`}
      >
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
            message.sender === "user"
              ? "bg-gradient-to-r from-primary to-secondary"
              : "bg-gradient-to-r from-gray-600 to-gray-700"
          }`}
        >
          {message.sender === "user" ? (
            <UserIcon className="w-5 h-5 text-white" />
          ) : (
            <BotIcon className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`flex-1 ${
            message.sender === "user" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block px-6 py-4 rounded-2xl shadow-lg ${
              message.sender === "user"
                ? "bg-gradient-to-r from-primary to-secondary text-white"
                : "bg-gray-700 text-gray-100 border border-gray-600"
            }`}
          >
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">
                {message.text}
              </p>
            </div>

            {message.functionCalled && (
              <div className="mt-3 p-3 bg-primary-900 rounded-lg border border-primary-700">
                <p className="text-sm font-medium text-primary-200">
                  Function called: {message.functionCalled}
                </p>
                {message.parameters && (
                  <pre className="text-xs text-primary-300 mt-2 overflow-x-auto">
                    {JSON.stringify(message.parameters, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>

          <p
            className={`text-xs text-gray-500 mt-2 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
