import { motion } from "motion/react";
import { Machine as MachineType } from "../data/mockData";
import { CircularTimer } from "./CircularTimer";

interface MachineCardProps {
  machine: MachineType;
  index: number;
}

export function MachineCard({ machine, index }: MachineCardProps) {
  const isPlaying = machine.status === "Playing" && machine.currentPlayers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white rounded-2xl p-4 shadow-sm"
      style={{
        background: isPlaying
          ? "linear-gradient(135deg, #fff5fa 0%, #ffffff 100%)"
          : "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Machine Label */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-lg"
          style={{
            background: isPlaying
              ? "linear-gradient(135deg, #E8A0BF40, #E8A0BF20)"
              : "linear-gradient(135deg, #e5e5e5, #f0f0f0)",
            border: isPlaying ? "3px solid #E8A0BF" : "3px solid #d0d0d0",
            color: isPlaying ? "#E8A0BF" : "#999",
          }}
        >
          {machine.label}
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          {isPlaying && machine.currentPlayers ? (
            <>
              <div className="font-semibold text-gray-800 truncate mb-0.5">
                {machine.currentPlayers.mode === "pair" && machine.currentPlayers.player2
                  ? `${machine.currentPlayers.player1} × ${machine.currentPlayers.player2}`
                  : `${machine.currentPlayers.player1} (solo)`}
              </div>
              <div className="text-xs text-gray-500">Now Playing</div>
            </>
          ) : (
            <div className="text-sm text-gray-500">Available</div>
          )}
        </div>

        {/* Timer (if playing) */}
        {isPlaying && machine.currentPlayers && (
          <div className="shrink-0">
            <CircularTimer
              duration={machine.currentPlayers.mode === "pair" ? 540 : 420}
              elapsed={
                (machine.currentPlayers.mode === "pair" ? 540 : 420) -
                machine.currentPlayers.timeRemaining
              }
              size={50}
              strokeWidth={4}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
