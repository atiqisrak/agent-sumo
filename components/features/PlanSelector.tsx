"use client";

interface PlanSelectorProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

export default function PlanSelector({
  selectedPlan,
  setSelectedPlan,
}: PlanSelectorProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-gray-800 rounded-xl p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setSelectedPlan("agent-sumo")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedPlan === "agent-sumo"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Agent Sumo
          </button>
          <button
            onClick={() => setSelectedPlan("agent-sumo-pro")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedPlan === "agent-sumo-pro"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Agent Sumo Pro
          </button>
        </div>
      </div>
    </div>
  );
}
