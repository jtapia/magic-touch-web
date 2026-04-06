import type { ReactNode } from "react";

interface MouseShellProps {
  children?: ReactNode;
  className?: string;
}

export default function MouseShell({ children, className = "" }: MouseShellProps) {
  return (
    <div className={`relative select-none ${className}`} style={{ width: 220, height: 340 }}>
      {/* Mouse body */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8e8ed] to-[#d8d8de] dark:from-[#2a2a34] dark:to-[#1a1a24] rounded-[50%_50%_50%_50%_/_30%_30%_70%_70%] border border-black/[0.08] dark:border-white/[0.06] shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
        {/* Capacitive surface area (top 60%) */}
        <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/40 to-transparent dark:from-white/[0.04] dark:to-transparent">
          {/* Center divider line */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-px h-[70%] bg-black/[0.06] dark:bg-white/[0.06]" />
          {children}
        </div>
        {/* Surface reflection */}
        <div className="absolute top-[8%] left-[15%] right-[15%] h-[20%] bg-gradient-to-b from-white/30 to-transparent dark:from-white/[0.06] dark:to-transparent rounded-full blur-sm" />
      </div>
    </div>
  );
}
