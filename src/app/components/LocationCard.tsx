import { motion } from "motion/react";
import { Clock, Monitor } from "lucide-react";
import { Location } from "../data/mockData";
import { useNavigate } from "react-router";
import { MachineCard } from "./MachineCard";

interface LocationCardProps {
  location: Location;
  index: number;
  elapsedTime: number;
}

export function LocationCard({
  location,
  index,
  elapsedTime,
}: LocationCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      onClick={() => navigate(`/queue/${location.id}`)}
      className="bg-white rounded-3xl p-5 cursor-pointer hover:shadow-xl transition-all"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fef9fc 100%)",
        boxShadow: "0 4px 16px rgba(232, 160, 191, 0.12)",
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2" style={{ color: "#333" }}>
          {location.name}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          {/* Machine count */}
          <div className="flex items-center gap-1.5">
            <Monitor size={16} style={{ color: "#E8A0BF" }} />
            <span>
              {location.machineCount}{" "}
              {location.machineCount === 1 ? "Machine" : "Machines"}
            </span>
          </div>

          {/* Estimated wait */}
          <div className="flex items-center gap-1.5">
            <Clock size={16} style={{ color: "#E8A0BF" }} />
            <span className="font-semibold">~{location.estimatedWait} min</span>
          </div>
        </div>
      </div>

      {/* Machines */}
      <div className="space-y-2 mb-4">
        {location.machines.map((machine, idx) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            index={idx}
            elapsedTime={elapsedTime}
          />
        ))}
      </div>

      {/* Queue indicator */}
      {location.queueLength > 0 && (
        <div className="pt-3 border-t border-pink-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">
              {location.queueLength}{" "}
              {location.queueLength === 1 ? "person" : "people"} waiting
            </span>
            <div className="flex gap-1.5">
              {[...Array(Math.min(5, location.queueLength))].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "#E8A0BF",
                    boxShadow: "0 0 4px rgba(232, 160, 191, 0.5)",
                  }}
                />
              ))}
              {location.queueLength > 5 && (
                <span className="text-xs text-gray-500 ml-1 font-semibold">
                  +{location.queueLength - 5}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
