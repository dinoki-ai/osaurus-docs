import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 20, className = "" }: IconProps) {
  const IconComponent = LucideIcons[name] as React.ComponentType<any>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <span className={`icon-wrapper ${className}`}>
      <IconComponent
        size={size}
        className="inline-icon"
        style={{
          verticalAlign: "middle",
          marginRight: "0.5rem",
          strokeWidth: 2,
        }}
      />
    </span>
  );
}
