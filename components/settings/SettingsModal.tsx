"use client";

import { useState, useEffect } from "react";
import { XIcon, SettingsIcon, ThemeIcon, ModelIcon, SaveIcon } from "./icons";

interface Settings {
  theme: "dark" | "light";
  model: string;
  autoSave: boolean;
  notifications: boolean;
  fontSize: "small" | "medium" | "large";
  language: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<Settings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSettingsChange(localSettings);
    localStorage.setItem("agent-sumo-settings", JSON.stringify(localSettings));
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: Settings = {
      theme: "dark",
      model: "Agent Sumo Pro",
      autoSave: true,
      notifications: true,
      fontSize: "medium",
      language: "en",
    };
    setLocalSettings(defaultSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-white">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Theme Setting */}
          <div>
            <label className="block text-white font-medium mb-2">Theme</label>
            <select
              value={localSettings.theme}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  theme: e.target.value as "dark" | "light",
                })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          {/* Model Setting */}
          <div>
            <label className="block text-white font-medium mb-2">
              AI Model
            </label>
            <select
              value={localSettings.model}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  model: e.target.value,
                })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            >
              <option value="Agent Sumo">Agent Sumo (Chatbot)</option>
              <option value="Agent Sumo Pro">
                Agent Sumo Pro (Task Automation)
              </option>
            </select>
          </div>

          {/* Font Size Setting */}
          <div>
            <label className="block text-white font-medium mb-2">
              Font Size
            </label>
            <select
              value={localSettings.fontSize}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  fontSize: e.target.value as "small" | "medium" | "large",
                })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Language Setting */}
          <div>
            <label className="block text-white font-medium mb-2">
              Language
            </label>
            <select
              value={localSettings.language}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  language: e.target.value,
                })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          {/* Toggle Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Auto Save</label>
                <p className="text-gray-400 text-sm">
                  Automatically save chat history
                </p>
              </div>
              <button
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    autoSave: !localSettings.autoSave,
                  })
                }
                className={`w-12 h-6 rounded-full transition-colors ${
                  localSettings.autoSave ? "bg-primary" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    localSettings.autoSave ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Notifications</label>
                <p className="text-gray-400 text-sm">
                  Show desktop notifications
                </p>
              </div>
              <button
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    notifications: !localSettings.notifications,
                  })
                }
                className={`w-12 h-6 rounded-full transition-colors ${
                  localSettings.notifications ? "bg-primary" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    localSettings.notifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <SaveIcon className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
