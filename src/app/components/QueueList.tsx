import { motion } from "motion/react";
import { QueueEntry } from "../data/mockData";
import { Clock, Users, User, Shuffle } from "lucide-react";

interface QueueListProps {
  entries: QueueEntry[];
  currentUserId?: string;
}

export function QueueList({ entries, currentUserId }: QueueListProps) {
  const statusColors = {
    Ready: "#7dd3a7",
    Waiting: "#a8c7f7",
    AFK: "#f9c74f",
  };

  const modeIcons = {
    solo: User,
    pair: Users,
    "auto-pair": Shuffle,
  };

  const modeColors = {
    solo: "#a8c7f7",
    pair: "#E8A0BF",
    "auto-pair": "#7dd3a7",
  };

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => {
        const isCurrentUser = entry.id === currentUserId;
        const statusColor = statusColors[entry.status];
        const ModeIcon = modeIcons[entry.mode];
        const modeColor = modeColors[entry.mode];

        // Format player names
        const playerDisplay =
          entry.mode === "pair" && entry.player2
            ? `${entry.player1} × ${entry.player2}`
            : entry.mode === "auto-pair"
            ? `${entry.player1} (auto-pair)`
            : `${entry.player1} (solo)`;

        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 ${
              isCurrentUser ? "ring-2 ring-offset-2" : ""
            }`}
            style={{
              background: isCurrentUser
                ? "linear-gradient(135deg, #fff5fa 0%, #ffffff 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
              ...(isCurrentUser && { ringColor: "#E8A0BF" }),
            }}
          >
            {/* Position circle */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: `linear-gradient(135deg, ${statusColor}40, ${statusColor}20)`,
                border: `3px solid ${statusColor}`,
              }}
            >
              <span className="text-xl font-bold" style={{ color: statusColor }}>
                {entry.position}
              </span>
            </div>

            {/* Player info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800 truncate">{playerDisplay}</span>
                {isCurrentUser && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-600">
                    You
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Mode tag */}
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${modeColor}20`,
                    color: modeColor,
                  }}
                >
                  <ModeIcon size={12} />
                  <span className="capitalize">{entry.mode === "auto-pair" ? "Auto" : entry.mode}</span>
                </div>

                {/* Estimated wait */}
                {entry.estimatedWait !== undefined && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>~{entry.estimatedWait} min</span>
                  </div>
                )}
              </div>

              {/* Assigned machine */}
              {entry.assignedMachine && entry.status === "Ready" && (
                <div className="mt-1.5 text-xs font-semibold text-green-600">
                  → Machine {entry.assignedMachine}
                </div>
              )}
            </div>

            {/* Status badge */}
            <div
              className="px-3 py-1.5 rounded-full text-xs font-semibold shrink-0"
              style={{
                backgroundColor: `${statusColor}30`,
                color: statusColor,
              }}
            >
              {entry.status}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}