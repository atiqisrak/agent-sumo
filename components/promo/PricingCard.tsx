import { CheckIcon } from "../icons";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonHref: string;
  gradient: string;
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  popular = false,
  buttonText,
  buttonHref,
  gradient,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 ${gradient} ${
        popular ? "ring-2 ring-purple-500 scale-105" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-300 ml-2">{period}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
            <span className="text-gray-200">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={buttonHref}
        className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
          popular
            ? "bg-white text-purple-600 hover:bg-gray-100"
            : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
        }`}
      >
        {buttonText}
      </a>
    </div>
  );
}
