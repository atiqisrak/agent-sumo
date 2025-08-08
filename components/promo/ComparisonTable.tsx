interface ComparisonTableProps {
  features: {
    name: string;
    agentSumo: boolean | string;
    agentSumoPro: boolean | string;
  }[];
}

export default function ComparisonTable({ features }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-4 px-6 text-gray-400 font-medium">
              Features
            </th>
            <th className="text-center py-4 px-6 text-white font-semibold">
              Agent Sumo
            </th>
            <th className="text-center py-4 px-6 text-white font-semibold">
              Agent Sumo Pro
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="py-4 px-6 text-gray-300">{feature.name}</td>
              <td className="py-4 px-6 text-center">
                {typeof feature.agentSumo === "boolean" ? (
                  feature.agentSumo ? (
                    <span className="text-green-400">✓</span>
                  ) : (
                    <span className="text-gray-600">✗</span>
                  )
                ) : (
                  <span className="text-gray-300">{feature.agentSumo}</span>
                )}
              </td>
              <td className="py-4 px-6 text-center">
                {typeof feature.agentSumoPro === "boolean" ? (
                  feature.agentSumoPro ? (
                    <span className="text-green-400">✓</span>
                  ) : (
                    <span className="text-gray-600">✗</span>
                  )
                ) : (
                  <span className="text-gray-300">{feature.agentSumoPro}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
