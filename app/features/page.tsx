"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "../../components/shared/Navigation";
import Footer from "../../components/shared/Footer";
import PlanSelector from "../../components/features/PlanSelector";
import FeatureCard from "../../components/features/FeatureCard";
import UseCaseCard from "../../components/features/UseCaseCard";
import {
  BotIcon,
  UserIcon,
  SparklesIcon,
  MessageIcon,
  SearchIcon,
  FileIcon,
  ClockIcon,
  ChevronLeftIcon,
  MicIcon,
  CheckIcon,
  StarIcon,
  ZapIcon,
  ShieldIcon,
  GlobeIcon,
  DatabaseIcon,
  WorkflowIcon,
  CodeIcon,
  BookIcon,
  ApiIcon,
  SettingsIcon,
  LockIcon,
  UsersIcon,
  ChartIcon,
  BellIcon,
} from "../../components/icons";

export default function FeaturesPage() {
  const [selectedPlan, setSelectedPlan] = useState("agent-sumo");

  const plans = {
    "agent-sumo": {
      name: "Agent Sumo",
      description: "Intelligent chatbot for business communication",
      price: "Free",
      color: "from-blue-500 to-purple-600",
      features: [
        {
          category: "Core Features",
          items: [
            { name: "Natural Language Processing", included: true },
            { name: "Context Awareness", included: true },
            { name: "Multi-language Support", included: true },
            { name: "Conversation History", included: true },
            { name: "Real-time Responses", included: true },
            { name: "Basic Chat Interface", included: true },
          ],
        },
        {
          category: "Advanced Features",
          items: [
            { name: "Task Automation", included: false },
            { name: "Purchase Order Management", included: false },
            { name: "Inventory Management", included: false },
            { name: "Requisition Processing", included: false },
            { name: "API Integration", included: false },
            { name: "Custom Workflows", included: false },
          ],
        },
        {
          category: "Security & Compliance",
          items: [
            { name: "Basic Authentication", included: true },
            { name: "Data Encryption", included: true },
            { name: "Role-based Access", included: false },
            { name: "Audit Logs", included: false },
            { name: "GDPR Compliance", included: false },
            { name: "SOC 2 Compliance", included: false },
          ],
        },
        {
          category: "Support & Analytics",
          items: [
            { name: "Email Support", included: true },
            { name: "Basic Analytics", included: true },
            { name: "Usage Reports", included: true },
            { name: "Priority Support", included: false },
            { name: "Advanced Analytics", included: false },
            { name: "Custom Reports", included: false },
          ],
        },
      ],
    },
    "agent-sumo-pro": {
      name: "Agent Sumo Pro",
      description: "Advanced AI agent for business automation",
      price: "$99/month",
      color: "from-purple-500 to-indigo-600",
      features: [
        {
          category: "Core Features",
          items: [
            { name: "Natural Language Processing", included: true },
            { name: "Context Awareness", included: true },
            { name: "Multi-language Support", included: true },
            { name: "Conversation History", included: true },
            { name: "Real-time Responses", included: true },
            { name: "Advanced Chat Interface", included: true },
          ],
        },
        {
          category: "Advanced Features",
          items: [
            { name: "Task Automation", included: true },
            { name: "Purchase Order Management", included: true },
            { name: "Inventory Management", included: true },
            { name: "Requisition Processing", included: true },
            { name: "API Integration", included: true },
            { name: "Custom Workflows", included: true },
          ],
        },
        {
          category: "Security & Compliance",
          items: [
            { name: "Advanced Authentication", included: true },
            { name: "End-to-end Encryption", included: true },
            { name: "Role-based Access Control", included: true },
            { name: "Comprehensive Audit Logs", included: true },
            { name: "GDPR Compliance", included: true },
            { name: "SOC 2 Compliance", included: true },
          ],
        },
        {
          category: "Support & Analytics",
          items: [
            { name: "24/7 Priority Support", included: true },
            { name: "Advanced Analytics Dashboard", included: true },
            { name: "Custom Reports & Insights", included: true },
            { name: "Dedicated Account Manager", included: true },
            { name: "Performance Monitoring", included: true },
            { name: "Custom Integrations", included: true },
          ],
        },
      ],
    },
  };

  const useCases = {
    "agent-sumo": [
      {
        title: "Customer Support",
        description: "Provide instant responses to customer inquiries",
        icon: MessageIcon,
        color: "from-blue-500 to-cyan-600",
      },
      {
        title: "Information Retrieval",
        description: "Quick access to company knowledge and policies",
        icon: SearchIcon,
        color: "from-green-500 to-emerald-600",
      },
      {
        title: "Basic Q&A",
        description: "Answer frequently asked questions automatically",
        icon: BotIcon,
        color: "from-purple-500 to-pink-600",
      },
    ],
    "agent-sumo-pro": [
      {
        title: "Business Process Automation",
        description: "Automate complex workflows and business processes",
        icon: WorkflowIcon,
        color: "from-purple-500 to-indigo-600",
      },
      {
        title: "Purchase Order Management",
        description: "Create, track, and manage purchase orders automatically",
        icon: FileIcon,
        color: "from-green-500 to-teal-600",
      },
      {
        title: "Inventory Control",
        description: "Monitor and manage inventory levels in real-time",
        icon: DatabaseIcon,
        color: "from-blue-500 to-cyan-600",
      },
      {
        title: "Requisition Processing",
        description: "Streamline approval workflows and requisition management",
        icon: ClockIcon,
        color: "from-yellow-500 to-orange-600",
      },
      {
        title: "System Integration",
        description: "Connect with ERP, CRM, and other business systems",
        icon: ApiIcon,
        color: "from-red-500 to-pink-600",
      },
      {
        title: "Advanced Analytics",
        description: "Generate insights and reports from business data",
        icon: ChartIcon,
        color: "from-indigo-500 to-purple-600",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the powerful capabilities of Agent Sumo and Agent Sumo Pro.
            Choose the perfect solution for your business needs.
          </p>
        </div>

        <PlanSelector
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        {/* Plan Overview */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {plans[selectedPlan as keyof typeof plans].name}
          </h2>
          <p className="text-gray-400 mb-4">
            {plans[selectedPlan as keyof typeof plans].description}
          </p>
          <div className="text-2xl font-bold text-white">
            {plans[selectedPlan as keyof typeof plans].price}
          </div>
        </div>

        <FeatureCard
          features={plans[selectedPlan as keyof typeof plans].features}
        />

        {/* Use Cases */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Use Cases
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases[selectedPlan as keyof typeof useCases].map(
              (useCase, index) => (
                <UseCaseCard key={index} useCase={useCase} />
              )
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-400 mb-6">
            Choose the plan that best fits your business needs and start
            transforming your operations today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Try Agent Sumo Free
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 border border-gray-600 hover:border-gray-500 rounded-xl text-white font-semibold transition-all duration-200"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
