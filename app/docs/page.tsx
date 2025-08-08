"use client";

import { useState } from "react";
import Navigation from "../../components/shared/Navigation";
import Hero from "../../components/shared/Hero";
import Footer from "../../components/shared/Footer";
import {
  BotIcon,
  ZapIcon,
  FileIcon,
  ClockIcon,
  DatabaseIcon,
  MessageIcon,
  SearchIcon,
  SparklesIcon,
} from "../../components/icons";

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections: DocSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Quick Start Guide
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Access the Platform
                  </h4>
                  <p className="text-gray-400">
                    Navigate to the main chat interface
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Choose Your Package
                  </h4>
                  <p className="text-gray-400">
                    Select between Agent Sumo (chatbot) or Agent Sumo Pro (task
                    automation)
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Start Interacting
                  </h4>
                  <p className="text-gray-400">
                    Begin chatting or describe tasks for automation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "agent-sumo",
      title: "Agent Sumo (Chatbot)",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Chatbot Features
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BotIcon className="w-6 h-6 text-blue-400" />
                  <h4 className="text-white font-semibold">
                    Intelligent Conversations
                  </h4>
                </div>
                <p className="text-gray-400">
                  Advanced AI that understands context and provides helpful
                  responses to your questions.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ZapIcon className="w-6 h-6 text-green-400" />
                  <h4 className="text-white font-semibold">
                    Real-time Responses
                  </h4>
                </div>
                <p className="text-gray-400">
                  Instant replies with natural language processing capabilities.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageIcon className="w-6 h-6 text-purple-400" />
                  <h4 className="text-white font-semibold">
                    Context Awareness
                  </h4>
                </div>
                <p className="text-gray-400">
                  Remembers conversation history and maintains context
                  throughout the chat.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <SearchIcon className="w-6 h-6 text-orange-400" />
                  <h4 className="text-white font-semibold">
                    Multi-language Support
                  </h4>
                </div>
                <p className="text-gray-400">
                  Communicate in multiple languages with seamless translation.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Usage Examples
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-300 font-medium">
                  User: "What's the weather like today?"
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Bot: Provides current weather information
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-300 font-medium">
                  User: "Help me with my project planning"
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Bot: Offers project management advice and tools
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-gray-300 font-medium">
                  User: "Explain quantum computing"
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Bot: Provides detailed explanation with examples
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "agent-sumo-pro",
      title: "Agent Sumo Pro (Task Automation)",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Task Automation Features
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileIcon className="w-6 h-6 text-green-400" />
                  <h4 className="text-white font-semibold">
                    Purchase Order Management
                  </h4>
                </div>
                <p className="text-gray-400">
                  Create, track, and manage purchase orders with intelligent
                  automation.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <DatabaseIcon className="w-6 h-6 text-blue-400" />
                  <h4 className="text-white font-semibold">
                    Inventory Management
                  </h4>
                </div>
                <p className="text-gray-400">
                  Monitor stock levels, track items, and manage inventory
                  operations.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ClockIcon className="w-6 h-6 text-yellow-400" />
                  <h4 className="text-white font-semibold">
                    Requisition Processing
                  </h4>
                </div>
                <p className="text-gray-400">
                  Streamline requisition workflows with automated approval
                  processes.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ZapIcon className="w-6 h-6 text-purple-400" />
                  <h4 className="text-white font-semibold">API Integration</h4>
                </div>
                <p className="text-gray-400">
                  Seamless integration with existing business systems and
                  workflows.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Task Examples
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-300 font-medium">
                  "Create a purchase order for 100 laptops"
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Automatically generates PO with vendor selection and pricing
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-300 font-medium">
                  "Update inventory levels for all products"
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Scans and updates stock levels across all warehouses
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="text-gray-300 font-medium">
                  "Process all pending requisitions"
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Automatically approves and processes requisition requests
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "api-reference",
      title: "API Reference",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Endpoints</h3>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">Chat Endpoint</h4>
                <code className="text-green-400 bg-gray-900 px-2 py-1 rounded">
                  POST /api/chat
                </code>
                <p className="text-gray-400 mt-2">
                  Send messages and receive AI responses
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Task Execution
                </h4>
                <code className="text-green-400 bg-gray-900 px-2 py-1 rounded">
                  POST /api/tasks
                </code>
                <p className="text-gray-400 mt-2">
                  Execute automated business tasks
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Inventory Management
                </h4>
                <code className="text-green-400 bg-gray-900 px-2 py-1 rounded">
                  GET /api/inventory
                </code>
                <p className="text-gray-400 mt-2">
                  Retrieve and manage inventory data
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Common Issues
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Connection Issues
                </h4>
                <p className="text-gray-400 mb-2">
                  If you're experiencing connection problems:
                </p>
                <ul className="text-gray-400 text-sm space-y-1 ml-4">
                  <li>• Check your internet connection</li>
                  <li>• Refresh the page</li>
                  <li>• Clear browser cache</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Task Execution Errors
                </h4>
                <p className="text-gray-400 mb-2">
                  For task automation issues:
                </p>
                <ul className="text-gray-400 text-sm space-y-1 ml-4">
                  <li>• Verify task parameters are correct</li>
                  <li>• Check system permissions</li>
                  <li>• Review error logs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />

      <Hero
        title="Documentation"
        subtitle="Complete Guide"
        description="Learn how to use Agent Sumo and Agent Sumo Pro effectively. From basic chatbot interactions to complex task automation, find everything you need to know."
        primaryButtonText="Get Started"
        primaryButtonHref="#getting-started"
        secondaryButtonText="API Reference"
        secondaryButtonHref="#api-reference"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 sticky top-8">
              <h3 className="text-white font-semibold mb-4">Documentation</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              {
                sections.find((section) => section.id === activeSection)
                  ?.content
              }
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
