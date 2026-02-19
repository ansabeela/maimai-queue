import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Radio } from "lucide-react";
import { locations, cities } from "../data/mockData";
import { LocationCard } from "../components/LocationCard";

export function CityOverview() {
  const [selectedCity, setSelectedCity] = useState("Jakarta");

  const filteredLocations = locations.filter((loc) => loc.city === selectedCity);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fef5fa" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div
          className="px-4 py-4"
          style={{
            background: "linear-gradient(135deg, #fef9fc 0%, #ffffff 100%)",
          }}
        >
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#E8A0BF" }}>
            maimai Queue System
          </h1>

          <div className="flex items-center gap-3 mb-3">
            {/* City Selector */}
            <div className="flex-1 relative">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-full font-semibold text-gray-700 focus:border-pink-300 focus:outline-none appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23E8A0BF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.25rem",
                }}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Machine Type Badge */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #E8A0BF20, #E8A0BF10)",
                border: "2px solid #E8A0BF",
              }}
            >
              <Radio size={18} style={{ color: "#E8A0BF" }} />
              <span className="font-semibold text-sm" style={{ color: "#E8A0BF" }}>
                maimai
              </span>
            </div>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-700">Live Updates</span>
            </div>
            <span className="text-xs text-gray-500">
              {filteredLocations.length} location{filteredLocations.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </div>
      </div>

      {/* Locations List */}
      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location, index) => (
            <LocationCard key={location.id} location={location} index={index} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No locations found in {selectedCity}</p>
          </div>
        )}
      </div>
    </div>
  );
}