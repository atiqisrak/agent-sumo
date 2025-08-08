"use client";

import Link from "next/link";
import Footer from "../components/shared/Footer";
import { SearchIcon, HomeIcon, SparklesIcon } from "../components/icons";
import Navigation from "@/components/shared/Navigation";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <SearchIcon className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-8xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            <Link
              href="/chat"
              className="px-8 py-4 border border-gray-600 hover:border-gray-500 rounded-xl text-white font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Start Chatting</span>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              Looking for something specific?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/promo"
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                → Features & Pricing
              </Link>
              <Link
                href="/docs"
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                → Documentation
              </Link>
              <Link
                href="/chat"
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                → Chat Interface
              </Link>
              <Link
                href="/docs"
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                → API Reference
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
