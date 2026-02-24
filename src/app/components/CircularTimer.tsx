import { motion } from "motion/react";
import { useMemo } from "react";

interface CircularTimerProps {
  duration: number; // in seconds
  elapsed: number; // in seconds
  size?: number;
  strokeWidth?: number;
  showTime?: boolean;
}

type TimerState = "active" | "warning" | "idle";

export function CircularTimer({
  duration,
  elapsed,
  size = 60,
  strokeWidth = 4,
  showTime = true,
}: CircularTimerProps) {
  const remaining = duration - elapsed;
  const progress = (elapsed / duration) * 100;

  // Determine timer state
  const state: TimerState = useMemo(() => {
    if (remaining <= 0) return "idle";
    if (remaining <= 60) return "warning"; // Last minute
    return "active";
  }, [remaining]);

  // Color and glow based on state
  const stateStyles = useMemo(() => {
    switch (state) {
      case "warning":
        return {
          color: "#f9c74f",
          glowColor: "#f9c74f",
          shadowSize: "8px",
          opacity: 1,
        };
      case "idle":
        return {
          color: "#d0d0d0",
          glowColor: "#d0d0d0",
          shadowSize: "2px",
          opacity: 0.4,
        };
      case "active":
      default:
        return {
          color: "#E8A0BF",
          glowColor: "#E8A0BF",
          shadowSize: "6px",
          opacity: 1,
        };
    }
  }, [state]);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Format time as mm:ss
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size + 4,
          height: size + 4,
          boxShadow: `0 0 ${stateStyles.shadowSize} ${stateStyles.glowColor}`,
          opacity: stateStyles.opacity,
        }}
        animate={{
          boxShadow: `0 0 ${stateStyles.shadowSize} ${stateStyles.glowColor}`,
          opacity: stateStyles.opacity,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* SVG Circle */}
      <svg width={size} height={size} className="relative" style={{ transform: "rotate(-90deg)" }}>
        {/* Background circle (pastel) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f5eff3"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle with glow */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stateStyles.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: offset,
            stroke: stateStyles.color,
          }}
          transition={{
            strokeDashoffset: { duration: 1, ease: "easeOut" },
            stroke: { duration: 0.3 },
          }}
          style={{
            filter: `drop-shadow(0 0 3px ${stateStyles.glowColor}80)`,
          }}
        />
      </svg>

      {/* Center time display */}
      {showTime && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: stateStyles.opacity }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="font-bold tabular-nums"
            style={{
              color: stateStyles.color,
              fontSize: size > 80 ? "1.25rem" : size > 50 ? "0.875rem" : "0.625rem",
              letterSpacing: "-0.025em",
            }}
          >
            {timeDisplay}
          </span>
        </motion.div>
      )}
    </div>
  );
}
