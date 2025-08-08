"use client";

import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {title}
            </span>
            {subtitle && (
              <span className="block text-3xl md:text-4xl text-gray-300 mt-2">
                {subtitle}
              </span>
            )}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            {description}
          </p>
          {(primaryButtonText || secondaryButtonText) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryButtonText && primaryButtonHref && (
                <Link
                  href={primaryButtonHref}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {primaryButtonText}
                </Link>
              )}
              {secondaryButtonText && secondaryButtonHref && (
                <Link
                  href={secondaryButtonHref}
                  className="px-8 py-4 border border-gray-600 hover:border-gray-500 rounded-xl text-white font-semibold transition-all duration-200"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
