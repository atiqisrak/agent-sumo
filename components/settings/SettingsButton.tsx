"use client";

import { SettingsIcon } from "./icons";

interface SettingsButtonProps {
  onClick: () => void;
  className?: string;
}

export default function SettingsButton({
  onClick,
  className = "",
}: SettingsButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 ${className}`}
      title="Settings"
    >
      <SettingsIcon className="w-5 h-5" />
    </button>
  );
}
