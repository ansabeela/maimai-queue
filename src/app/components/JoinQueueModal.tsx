import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Users, Shuffle } from "lucide-react";

interface JoinQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (data: JoinQueueData) => void;
}

export interface JoinQueueData {
  mode: "solo" | "pair" | "auto-pair";
  player1: string;
  player2?: string;
}

export function JoinQueueModal({ isOpen, onClose, onJoin }: JoinQueueModalProps) {
  const [selectedMode, setSelectedMode] = useState<"solo" | "pair" | "auto-pair" | null>(null);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = () => {
    if (!selectedMode || !player1Name) return;

    const data: JoinQueueData = {
      mode: selectedMode,
      player1: player1Name,
    };

    if (selectedMode === "pair" && player2Name) {
      data.player2 = player2Name;
    }

    onJoin(data);
    onClose();
    // Reset form
    setSelectedMode(null);
    setPlayer1Name("");
    setPlayer2Name("");
  };

  const isValid =
    selectedMode &&
    player1Name.trim() !== "" &&
    (selectedMode !== "pair" || player2Name.trim() !== "");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #fef9fc 0%, #ffffff 100%)",
            }}
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-pink-100">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold" style={{ color: "#E8A0BF" }}>
                  Join Queue
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600">Choose how you'd like to play</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Mode Selection */}
              <div className="space-y-3">
                {/* Solo Mode */}
                <button
                  onClick={() => setSelectedMode("solo")}
                  className={`w-full p-4 rounded-2xl text-left transition-all ${
                    selectedMode === "solo"
                      ? "ring-2 ring-offset-2"
                      : "hover:bg-pink-50"
                  }`}
                  style={{
                    background:
                      selectedMode === "solo"
                        ? "linear-gradient(135deg, #E8A0BF20, #E8A0BF10)"
                        : "white",
                    border: selectedMode === "solo" ? "2px solid #E8A0BF" : "2px solid #e5e5e5",
                    ...(selectedMode === "solo" && { ringColor: "#E8A0BF" }),
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #a8c7f740, #a8c7f720)",
                        border: "2px solid #a8c7f7",
                      }}
                    >
                      <User size={24} style={{ color: "#a8c7f7" }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 mb-0.5">Solo Mode</div>
                      <div className="text-xs text-gray-600">Play alone (~5-7 min)</div>
                    </div>
                  </div>
                </button>

                {/* Auto Pair Mode */}
                <button
                  onClick={() => setSelectedMode("auto-pair")}
                  className={`w-full p-4 rounded-2xl text-left transition-all ${
                    selectedMode === "auto-pair"
                      ? "ring-2 ring-offset-2"
                      : "hover:bg-pink-50"
                  }`}
                  style={{
                    background:
                      selectedMode === "auto-pair"
                        ? "linear-gradient(135deg, #E8A0BF20, #E8A0BF10)"
                        : "white",
                    border: selectedMode === "auto-pair" ? "2px solid #E8A0BF" : "2px solid #e5e5e5",
                    ...(selectedMode === "auto-pair" && { ringColor: "#E8A0BF" }),
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #7dd3a740, #7dd3a720)",
                        border: "2px solid #7dd3a7",
                      }}
                    >
                      <Shuffle size={24} style={{ color: "#7dd3a7" }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 mb-0.5">Auto Pair Mode</div>
                      <div className="text-xs text-gray-600">
                        System matches you with another player (~7-10 min)
                      </div>
                    </div>
                  </div>
                </button>

                {/* Join as Pair */}
                <button
                  onClick={() => setSelectedMode("pair")}
                  className={`w-full p-4 rounded-2xl text-left transition-all ${
                    selectedMode === "pair"
                      ? "ring-2 ring-offset-2"
                      : "hover:bg-pink-50"
                  }`}
                  style={{
                    background:
                      selectedMode === "pair"
                        ? "linear-gradient(135deg, #E8A0BF20, #E8A0BF10)"
                        : "white",
                    border: selectedMode === "pair" ? "2px solid #E8A0BF" : "2px solid #e5e5e5",
                    ...(selectedMode === "pair" && { ringColor: "#E8A0BF" }),
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #E8A0BF40, #E8A0BF20)",
                        border: "2px solid #E8A0BF",
                      }}
                    >
                      <Users size={24} style={{ color: "#E8A0BF" }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 mb-0.5">Join as Pair</div>
                      <div className="text-xs text-gray-600">
                        Play with a specific partner (~7-10 min)
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Input Fields */}
              {selectedMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3 pt-2"
                >
                  {/* Player 1 / Your IGN */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {selectedMode === "pair" ? "Player 1 IGN" : "Your IGN"}
                    </label>
                    <input
                      type="text"
                      value={player1Name}
                      onChange={(e) => setPlayer1Name(e.target.value)}
                      placeholder="Enter name..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-300 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Player 2 (only for pair mode) */}
                  {selectedMode === "pair" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Player 2 IGN
                      </label>
                      <input
                        type="text"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                        placeholder="Enter partner's name..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-300 focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Info Box */}
              {selectedMode === "auto-pair" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-50 rounded-xl p-3"
                >
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold">Note:</span> You'll be automatically matched with
                    another solo player when available.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-pink-100">
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`w-full py-4 rounded-full font-bold text-white shadow-lg text-lg transition-all ${
                  !isValid ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
                }`}
                style={{
                  background: isValid
                    ? "linear-gradient(135deg, #E8A0BF 0%, #d88aaa 100%)"
                    : "#e5e5e5",
                }}
              >
                Join Queue
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
