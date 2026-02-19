import { motion } from "motion/react";
import { LogOut, PauseCircle, PlayCircle } from "lucide-react";

interface BottomActionBarProps {
  isInQueue: boolean;
  isAFK: boolean;
  onJoinQueue?: () => void;
  onLeaveQueue?: () => void;
  onToggleAFK?: () => void;
}

export function BottomActionBar({
  isInQueue,
  isAFK,
  onJoinQueue,
  onLeaveQueue,
  onToggleAFK,
}: BottomActionBarProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-white shadow-2xl rounded-t-3xl"
      style={{
        background: "linear-gradient(to top, #ffffff 0%, #fef9fc 100%)",
      }}
    >
      <div className="max-w-md mx-auto space-y-3">
        {!isInQueue ? (
          <button
            onClick={onJoinQueue}
            className="w-full py-4 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all text-lg cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #E8A0BF 0%, #d88aaa 100%)",
            }}
          >
            Join Queue
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={onToggleAFK}
              className={`flex-1 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${
                isAFK ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"
              }`}
            >
              {isAFK ? <PlayCircle size={20} /> : <PauseCircle size={20} />}
              {isAFK ? "I'm Back" : "AFK"}
            </button>
            <button
              onClick={onLeaveQueue}
              className="flex-1 py-3 rounded-full font-semibold bg-red-50 text-red-600 flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
            >
              <LogOut size={20} />
              Leave Queue
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}