"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "../../components/shared/Navigation";
import Hero from "../../components/promo/Hero";
import FeatureCard from "../../components/promo/FeatureCard";
import ProcessStep from "../../components/promo/ProcessStep";
import Footer from "../../components/shared/Footer";
import PricingCard from "../../components/promo/PricingCard";
import TestimonialCard from "../../components/promo/TestimonialCard";
import StatsCard from "../../components/promo/StatsCard";
import ComparisonTable from "../../components/promo/ComparisonTable";
import FAQSection from "../../components/promo/FAQSection";
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
  UsersIcon,
  ChartIcon,
  StarIcon,
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

  const pricingPlans = [
    {
      title: "Agent Sumo",
      price: "Free",
      period: "forever",
      features: [
        "Basic AI Chatbot",
        "100 messages per month",
        "Email support",
        "Basic integrations",
        "Community forum access",
      ],
      popular: false,
      buttonText: "Get Started Free",
      buttonHref: "/",
      gradient:
        "bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30",
    },
    {
      title: "Agent Sumo Pro",
      price: "$99",
      period: "/month",
      features: [
        "Advanced AI with task automation",
        "Unlimited messages",
        "Priority support",
        "Advanced integrations",
        "Purchase order management",
        "Inventory tracking",
        "Requisition processing",
        "API access",
        "Custom workflows",
        "Analytics dashboard",
      ],
      popular: true,
      buttonText: "Start Pro Trial",
      buttonHref: "/",
      gradient:
        "bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechFlow Inc",
      content:
        "Agent Sumo Pro has transformed our procurement process. We've reduced processing time by 70% and eliminated manual errors completely.",
      avatar: "/images/avatar/user-1.png",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "InnovateCorp",
      content:
        "The AI chatbot handles 80% of our customer inquiries automatically. Our support team can now focus on complex issues.",
      avatar: "/images/avatar/user-2.png",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Supply Chain Director",
      company: "Global Retail",
      content:
        "Inventory management has never been easier. Real-time tracking and automated reordering save us hours every week.",
      avatar: "/images/avatar/user-3.png",
      rating: 5,
    },
  ];

  const stats = [
    {
      number: "10,000+",
      label: "Active Users",
      icon: UsersIcon,
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      number: "99.9%",
      label: "Uptime",
      icon: ShieldIcon,
      color: "bg-gradient-to-r from-green-500 to-blue-600",
    },
    {
      number: "70%",
      label: "Time Saved",
      icon: ClockIcon,
      color: "bg-gradient-to-r from-purple-500 to-pink-600",
    },
    {
      number: "24/7",
      label: "Support",
      icon: MessageIcon,
      color: "bg-gradient-to-r from-orange-500 to-red-600",
    },
  ];

  const comparisonFeatures = [
    { name: "AI Chatbot", agentSumo: true, agentSumoPro: true },
    {
      name: "Message Limit",
      agentSumo: "100/month",
      agentSumoPro: "Unlimited",
    },
    { name: "Task Automation", agentSumo: false, agentSumoPro: true },
    { name: "Purchase Orders", agentSumo: false, agentSumoPro: true },
    { name: "Inventory Management", agentSumo: false, agentSumoPro: true },
    { name: "API Access", agentSumo: false, agentSumoPro: true },
    { name: "Priority Support", agentSumo: false, agentSumoPro: true },
    { name: "Analytics Dashboard", agentSumo: false, agentSumoPro: true },
    { name: "Custom Workflows", agentSumo: false, agentSumoPro: true },
    { name: "Multi-language Support", agentSumo: true, agentSumoPro: true },
  ];

  const faqs = [
    {
      question: "What's the difference between Agent Sumo and Agent Sumo Pro?",
      answer:
        "Agent Sumo is our free tier with basic chatbot functionality and limited messages. Agent Sumo Pro includes advanced task automation, unlimited messages, purchase order management, inventory tracking, and enterprise features.",
    },
    {
      question: "Can I integrate Agent Sumo with my existing systems?",
      answer:
        "Yes! Agent Sumo Pro offers comprehensive API access and pre-built integrations with popular business tools like ERP systems, accounting software, and CRM platforms.",
    },
    {
      question: "Is my data secure with Agent Sumo?",
      answer:
        "Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and role-based access control to ensure your data is always protected.",
    },
    {
      question: "How quickly can I get started?",
      answer:
        "You can start using Agent Sumo immediately with our free tier. For Pro features, setup typically takes 1-2 business days with our onboarding team.",
    },
    {
      question: "Do you offer custom solutions for enterprise clients?",
      answer:
        "Yes, we provide custom development and white-label solutions for enterprise clients. Contact our sales team for more information.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />

      <Hero
        title="Agent Sumo"
        subtitle="AI Business Operations"
        description="Transform your business operations with intelligent AI agents. From simple chatbots to complex task automation, Agent Sumo delivers the power you need to scale efficiently."
        primaryButtonText="Try Agent Sumo Free"
        primaryButtonHref="/"
        secondaryButtonText="View Features"
        secondaryButtonHref="/promo"
      />

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-gray-400 text-lg">
            Join thousands of companies already transforming their operations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>
      </div>

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

      {/* Pricing Section */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                popular={plan.popular}
                buttonText={plan.buttonText}
                buttonHref={plan.buttonHref}
                gradient={plan.gradient}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Feature Comparison
          </h2>
          <p className="text-gray-400 text-lg">
            See exactly what each plan includes
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <ComparisonTable features={comparisonFeatures} />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-400 text-lg">
              Real stories from businesses using Agent Sumo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                content={testimonial.content}
                avatar={testimonial.avatar}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Find answers to common questions about Agent Sumo
          </p>
        </div>

        <FAQSection faqs={faqs} />
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
