import { motion } from "motion/react";

interface CircularTimerProps {
  duration: number; // in seconds
  elapsed: number; // in seconds
  size?: number;
  strokeWidth?: number;
  glowColor?: string;
}

export function CircularTimer({
  duration,
  elapsed,
  size = 120,
  strokeWidth = 8,
  glowColor = "#E8A0BF",
}: CircularTimerProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (elapsed / duration) * 100;
  const offset = circumference - (progress / 100) * circumference;

  const remaining = duration - elapsed;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-xl"
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent)`,
        }}
      />
      
      {/* Background circle */}
      <svg width={size} height={size} className="relative -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0e6ec"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={glowColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>

      {/* Timer text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color: glowColor }}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
