"use client";

import { SparklesIcon } from "../icons";

interface LoadingIndicatorProps {
  message?: string;
}

export default function LoadingIndicator({
  message = "Agent Sumo is typing...",
}: LoadingIndicatorProps) {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <SparklesIcon className="w-5 h-5 text-white" />
        </div>
        <div className="bg-gray-700 rounded-2xl px-6 py-4 border border-gray-600 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <span className="text-sm text-gray-400">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
