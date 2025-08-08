import {
  X,
  Settings,
  Palette,
  Bot,
  Save,
  Bell,
  Type,
  Globe,
} from "lucide-react";

export function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <X className={className} />;
}

export function SettingsIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return <Settings className={className} />;
}

export function ThemeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <Palette className={className} />;
}

export function ModelIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <Bot className={className} />;
}

export function SaveIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <Save className={className} />;
}

export function BellIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <Bell className={className} />;
}

export function TypeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <Type className={className} />;
}

export function GlobeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <Globe className={className} />;
}
