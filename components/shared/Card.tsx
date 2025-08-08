"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated";
}

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  const baseClasses =
    "bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl";

  const variantClasses = {
    default: "",
    elevated: "shadow-lg hover:shadow-xl transition-shadow duration-200",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
