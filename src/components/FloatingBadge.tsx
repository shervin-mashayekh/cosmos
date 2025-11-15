import { cn } from "@/lib/utils";

interface FloatingBadgeProps {
  text: string;
  position: string;
  delay?: number;
}

export const FloatingBadge = ({ text, position, delay = 0 }: FloatingBadgeProps) => {
  return (
    <div
      className={cn(
        "absolute px-4 py-2 rounded-full text-sm font-medium",
        "backdrop-blur-md border animate-float",
        "bg-[hsl(var(--glass-bg))] border-[hsl(var(--glass-border))]",
        position
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {text}
    </div>
  );
};
