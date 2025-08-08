interface StatsCardProps {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function StatsCard({
  number,
  label,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center">
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${color} mb-4`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">{number}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}
