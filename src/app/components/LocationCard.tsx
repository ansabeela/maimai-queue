import { motion } from "motion/react";
import { Clock, Monitor } from "lucide-react";
import { Location } from "../data/mockData";
import { useNavigate } from "react-router";
import { MachineCard } from "./MachineCard";

interface LocationCardProps {
  location: Location;
  index: number;
}

export function LocationCard({ location, index }: LocationCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      onClick={() => navigate(`/queue/${location.id}`)}
      className="bg-white rounded-3xl p-5 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fef9fc 100%)",
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2" style={{ color: "#4a4a4a" }}>
          {location.name}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          {/* Machine count */}
          <div className="flex items-center gap-1.5">
            <Monitor size={16} />
            <span>
              {location.machineCount} {location.machineCount === 1 ? "Machine" : "Machines"}
            </span>
          </div>

          {/* Estimated wait */}
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>~{location.estimatedWait} min</span>
          </div>
        </div>
      </div>

      {/* Machines */}
      <div className="space-y-2 mb-4">
        {location.machines.map((machine, idx) => (
          <MachineCard key={machine.id} machine={machine} index={idx} />
        ))}
      </div>

      {/* Queue indicator */}
      {location.queueLength > 0 && (
        <div className="pt-3 border-t border-pink-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {location.queueLength} {location.queueLength === 1 ? "person" : "people"} waiting
            </span>
            <div className="flex gap-1.5">
              {[...Array(Math.min(5, location.queueLength))].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "#E8A0BF",
                  }}
                />
              ))}
              {location.queueLength > 5 && (
                <span className="text-xs text-gray-500 ml-1">+{location.queueLength - 5}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}