"use client";

import { CheckIcon } from "../icons";

interface FeatureItem {
  name: string;
  included: boolean;
}

interface FeatureCategory {
  category: string;
  items: FeatureItem[];
}

interface FeatureCardProps {
  features: FeatureCategory[];
}

export default function FeatureCard({ features }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-12">
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((category, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-3">
                  {item.included ? (
                    <CheckIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <div className="w-5 h-5 border border-gray-600 rounded-full" />
                  )}
                  <span
                    className={`text-sm ${
                      item.included ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
