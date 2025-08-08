import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Agent Sumo Chatbot
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered assistant for business operations
          </p>
        </div>

        <ChatWidget />
      </div>
    </main>
  );
}
