import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Radio, Info } from "lucide-react";
import { locations, mockQueueEntries } from "../data/mockData";
import { MachineCard } from "../components/MachineCard";
import { QueueList } from "../components/QueueList";
import { BottomActionBar } from "../components/BottomActionBar";
import { JoinQueueModal, JoinQueueData } from "../components/JoinQueueModal";

export function QueuePage() {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const location = locations.find((loc) => loc.id === locationId);

  const [isInQueue, setIsInQueue] = useState(false);
  const [isAFK, setIsAFK] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [globalElapsed, setGlobalElapsed] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
      setGlobalElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Location not found</p>
      </div>
    );
  }

  const handleJoinQueue = (data: JoinQueueData) => {
    console.log("Joining queue with:", data);
    setIsInQueue(true);
    setCurrentUserId("q-3"); // Mock: user joins as 3rd in queue
  };

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: "#fef5fa" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div
          className="px-4 py-4"
          style={{
            background: "linear-gradient(135deg, #fef9fc 0%, #ffffff 100%)",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors"
            >
              <ChevronLeft size={24} style={{ color: "#E8A0BF" }} />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold" style={{ color: "#E8A0BF" }}>
                {location.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Radio size={14} />
                <span>maimai</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-700">Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Session Time Info */}
        <div className="bg-pink-50 rounded-2xl p-4 flex items-start gap-3">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="shrink-0 w-6 h-6 rounded-full bg-pink-200 flex items-center justify-center"
          >
            <Info size={14} style={{ color: "#E8A0BF" }} />
          </button>
          <div className="text-sm flex-1">
            <p className="text-gray-700">
              <span className="font-semibold">Session times:</span>
              <br />
              Solo: ~5-7 minutes • Pair: ~7-10 minutes
            </p>
            {showTooltip && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-xs text-gray-600 mt-2 pt-2 border-t border-pink-200"
              >
                Pair sessions usually take longer than solo sessions
              </motion.p>
            )}
          </div>
        </div>

        {/* Machines */}
<div>
  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
    Machines ({location.machineCount})
  </h2>
  <div className="space-y-3">
    {location.machines.map((machine, index) => (
      <MachineCard 
        key={machine.id} 
        machine={machine} 
        index={index} 
        elapsedTime={globalElapsed}
      />
    ))}
  </div>
</div>

        {/* Queue List */}
        {mockQueueEntries.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Queue ({mockQueueEntries.length} waiting)
            </h2>
            <QueueList entries={mockQueueEntries} currentUserId={currentUserId} />
          </div>
        )}

        {mockQueueEntries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No one in queue. Join now!</p>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <BottomActionBar
        isInQueue={isInQueue}
        isAFK={isAFK}
        onJoinQueue={() => setIsModalOpen(true)}
        onLeaveQueue={() => {
          setIsInQueue(false);
          setIsAFK(false);
          setCurrentUserId(undefined);
        }}
        onToggleAFK={() => setIsAFK(!isAFK)}
      />

      {/* Join Queue Modal */}
      <JoinQueueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJoin={handleJoinQueue}
      />
    </div>
  );
}
