import { motion } from "motion/react";
import { Machine as MachineType } from "../data/mockData";
import { CircularTimer } from "./CircularTimer";

interface MachineCardProps {
  machine: MachineType;
  index: number;
  elapsedTime: number;
}

export function MachineCard({
  machine,
  index,
  elapsedTime = 0,
}: MachineCardProps) {
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
          : "linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)",
        boxShadow: isPlaying
          ? "0 2px 12px rgba(232, 160, 191, 0.15)"
          : "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Machine Label */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-lg"
          style={{
            background: isPlaying
              ? "linear-gradient(135deg, #E8A0BF40, #E8A0BF20)"
              : "linear-gradient(135deg, #e8e8e8, #f5f5f5)",
            border: isPlaying ? "3px solid #E8A0BF" : "3px solid #d0d0d0",
            color: isPlaying ? "#E8A0BF" : "#999",
            boxShadow: isPlaying ? "0 0 8px rgba(232, 160, 191, 0.3)" : "none",
          }}
        >
          {machine.label}
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          {isPlaying && machine.currentPlayers ? (
            <>
              <div className="font-semibold text-gray-800 truncate mb-0.5">
                {machine.currentPlayers.mode === "pair" &&
                machine.currentPlayers.player2
                  ? `${machine.currentPlayers.player1} × ${machine.currentPlayers.player2}`
                  : `${machine.currentPlayers.player1} (solo)`}
              </div>
              <div
                className="text-xs font-semibold"
                style={{
                  color: "#E8A0BF",
                }}
              >
                Now Playing
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-400 font-medium">Available</div>
          )}
        </div>

        {/* Timer (if playing) */}
        {isPlaying && machine.currentPlayers && (
          <div className="shrink-0">
            {(() => {
              // 1. Determine the total session length
              const totalDuration =
                machine.currentPlayers?.mode === "pair" ? 540 : 420;

              // 2. Calculate how much time had ALREADY passed in the mock data
              const initialElapsed =
                totalDuration - (machine.currentPlayers?.timeRemaining || 0);

              // 3. Add the ticking seconds from our global clock
              const currentElapsed = initialElapsed + elapsedTime;

              return (
                <CircularTimer
                  duration={totalDuration}
                  elapsed={currentElapsed}
                  size={52}
                  strokeWidth={4}
                />
              );
            })()}
          </div>
        )}
      </div>
    </motion.div>
  );
}
