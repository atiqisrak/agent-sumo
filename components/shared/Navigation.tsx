"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SparklesIcon } from "../icons";
import Image from "next/image";

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
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "Chat" },
    { href: "/docs", label: "Documentation" },
    { href: "/features", label: "Features" },
  ];

  return (
    <nav
      className={`bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {showLogo && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Image
                  src="/logo/logo-horizontal.svg"
                  alt="Agent Sumo"
                  className="h-8"
                  height={32}
                  width={128}
                />
                <h1 className="text-xl font-bold text-primary">Agent</h1>
              </div>
            </div>
          )}
          {showNavItems && (
            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors ${
                      isActive
                        ? "text-white font-medium"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
