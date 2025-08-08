"use client";

interface UseCase {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface UseCaseCardProps {
  useCase: UseCase;
}

export default function UseCaseCard({ useCase }: UseCaseCardProps) {
  const IconComponent = useCase.icon;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-200">
      <div
        className={`w-12 h-12 bg-gradient-to-r ${useCase.color} rounded-lg flex items-center justify-center mb-4`}
      >
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{useCase.title}</h4>
      <p className="text-gray-400 text-sm">{useCase.description}</p>
    </div>
  );
}
