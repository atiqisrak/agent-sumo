"use client";

import ChatWidget from "@/components/ChatWidget";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[var(--color-gray-900)]">
      <div className="h-screen">
        <ChatWidget />
      </div>
    </div>
  );
}
