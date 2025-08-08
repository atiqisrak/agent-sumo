import { useState, useEffect } from "react";

export interface Settings {
  theme: "dark" | "light";
  model: string;
  autoSave: boolean;
  notifications: boolean;
  fontSize: "small" | "medium" | "large";
  language: string;
}

const defaultSettings: Settings = {
  theme: "dark",
  model: "Agent Sumo Pro",
  autoSave: true,
  notifications: true,
  fontSize: "medium",
  language: "en",
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedSettings = localStorage.getItem("agent-sumo-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("Failed to parse settings:", error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem("agent-sumo-settings", JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("agent-sumo-settings", JSON.stringify(defaultSettings));
  };

  return {
    settings: mounted ? settings : defaultSettings,
    updateSettings,
    resetSettings,
    mounted,
  };
}
