"use client";

import Link from "next/link";
import { SparklesIcon } from "../icons";

interface NavigationProps {
  showLogo?: boolean;
  className?: string;
  showNavItems?: boolean;
}

export default function Navigation({
  showLogo = true,
  className = "",
  showNavItems = true,
}: NavigationProps) {
  return (
    <nav
      className={`bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {showLogo && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Agent Sumo</span>
              </div>
            </div>
          )}
          {showNavItems && (
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/chat"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Chat
              </Link>
              <Link
                href="/docs"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
