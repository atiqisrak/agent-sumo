"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "../../components/shared/Navigation";
import Hero from "../../components/promo/Hero";
import FeatureCard from "../../components/promo/FeatureCard";
import ProcessStep from "../../components/promo/ProcessStep";
import Footer from "../../components/promo/Footer";
import {
  BotIcon,
  ZapIcon,
  GlobeIcon,
  MessageIcon,
  WorkflowIcon,
  FileIcon,
  DatabaseIcon,
  ClockIcon,
  ShieldIcon,
} from "../../components/icons";

export default function PromoPage() {
  const [activeTab, setActiveTab] = useState("agent-sumo");

  const features = {
    "agent-sumo": [
      {
        title: "Intelligent Chatbot",
        description:
          "Advanced conversational AI that understands context and provides helpful responses",
        icon: BotIcon,
        color: "from-blue-500 to-purple-600",
      },
      {
        title: "Real-time Responses",
        description:
          "Instant replies with natural language processing capabilities",
        icon: ZapIcon,
        color: "from-green-500 to-blue-600",
      },
      {
        title: "Multi-language Support",
        description:
          "Communicate in multiple languages with seamless translation",
        icon: GlobeIcon,
        color: "from-purple-500 to-pink-600",
      },
      {
        title: "Context Awareness",
        description:
          "Remembers conversation history and maintains context throughout the chat",
        icon: MessageIcon,
        color: "from-orange-500 to-red-600",
      },
    ],
    "agent-sumo-pro": [
      {
        title: "Task Automation",
        description:
          "Execute complex business tasks automatically without manual intervention",
        icon: WorkflowIcon,
        color: "from-purple-500 to-indigo-600",
      },
      {
        title: "Purchase Order Management",
        description:
          "Create, track, and manage purchase orders with intelligent automation",
        icon: FileIcon,
        color: "from-green-500 to-teal-600",
      },
      {
        title: "Inventory Management",
        description:
          "Monitor stock levels, track items, and manage inventory operations",
        icon: DatabaseIcon,
        color: "from-blue-500 to-cyan-600",
      },
      {
        title: "Requisition Processing",
        description:
          "Streamline requisition workflows with automated approval processes",
        icon: ClockIcon,
        color: "from-yellow-500 to-orange-600",
      },
      {
        title: "Advanced Security",
        description: "Enterprise-grade security with role-based access control",
        icon: ShieldIcon,
        color: "from-red-500 to-pink-600",
      },
      {
        title: "API Integration",
        description:
          "Seamless integration with existing business systems and workflows",
        icon: ZapIcon,
        color: "from-indigo-500 to-purple-600",
      },
    ],
  };

  const processes = {
    "agent-sumo": [
      {
        step: 1,
        title: "Start Conversation",
        description:
          "Begin chatting with the AI assistant through the intuitive interface",
      },
      {
        step: 2,
        title: "Ask Questions",
        description:
          "Ask any question and receive intelligent, contextual responses",
      },
      {
        step: 3,
        title: "Get Insights",
        description:
          "Receive helpful information, recommendations, and solutions",
      },
    ],
    "agent-sumo-pro": [
      {
        step: 1,
        title: "Define Task",
        description: "Describe the business task you want to automate",
      },
      {
        step: 2,
        title: "AI Analysis",
        description: "AI analyzes requirements and creates execution plan",
      },
      {
        step: 3,
        title: "Task Execution",
        description: "Automated execution of complex business processes",
      },
      {
        step: 4,
        title: "Results & Reports",
        description:
          "Receive detailed reports and insights from completed tasks",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* <Navigation /> */}

      <Hero
        title="Agent Sumo"
        subtitle="AI Business Operations"
        description="Transform your business operations with intelligent AI agents. From simple chatbots to complex task automation, Agent Sumo delivers the power you need to scale efficiently."
        primaryButtonText="Try Agent Sumo Free"
        primaryButtonHref="/"
        secondaryButtonText="View Features"
        secondaryButtonHref="/promo"
      />

      {/* Package Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Package
          </h2>
          <p className="text-gray-400 text-lg">
            Select the perfect solution for your business needs
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-xl p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("agent-sumo")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "agent-sumo"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Agent Sumo
              </button>
              <button
                onClick={() => setActiveTab("agent-sumo-pro")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "agent-sumo-pro"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Agent Sumo Pro
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features[activeTab as keyof typeof features].map(
            (feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
              />
            )
          )}
        </div>

        {/* Process Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">How It Works</h3>
          <p className="text-gray-400">
            Simple steps to get started with{" "}
            {activeTab === "agent-sumo" ? "Agent Sumo" : "Agent Sumo Pro"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processes[activeTab as keyof typeof processes].map(
            (process, index) => (
              <ProcessStep
                key={index}
                step={process.step}
                title={process.title}
                description={process.description}
              />
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of businesses already using Agent Sumo to
              streamline their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 border border-gray-600 hover:border-gray-500 rounded-xl text-white font-semibold transition-all duration-200"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
