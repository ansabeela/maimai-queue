// Mock data for arcade locations - Indonesian locations

export interface Location {
  id: string;
  name: string;
  city: string;
  machineCount: number;
  machines: Machine[];
  queueLength: number;
  estimatedWait: number; // in minutes
  machineType: "maimai";
}

export interface Machine {
  id: string;
  label: string; // "A", "B", etc.
  currentPlayers: CurrentPlayers | null;
  status: "Playing" | "Available";
}

export interface CurrentPlayers {
  player1: string;
  player2?: string; // undefined if solo
  mode: "solo" | "pair";
  timeRemaining: number; // in seconds
}

export interface QueueEntry {
  id: string;
  player1: string;
  player2?: string; // undefined if solo or auto-pair waiting
  mode: "solo" | "pair" | "auto-pair";
  position: number;
  status: "Waiting" | "Ready" | "AFK";
  estimatedWait?: number; // in minutes
  assignedMachine?: string; // "A", "B", etc. when ready
}

export const cities = ["Jakarta", "Bandung", "Surabaya", "Bali", "Medan", "Makassar", "Yogyakarta", "Bekasi", "Tangerang"];

export const locations: Location[] = [
  // Jakarta
  {
    id: "loc-1",
    name: "CPCM Mall of Indonesia",
    city: "Jakarta",
    machineCount: 3,
    machines: [
      {
        id: "m1-a",
        label: "A",
        currentPlayers: {
          player1: "RhythmKing",
          player2: "CircleHero",
          mode: "pair",
          timeRemaining: 480,
        },
        status: "Playing",
      },
      {
        id: "m1-b",
        label: "B",
        currentPlayers: {
          player1: "BeatMaster",
          mode: "solo",
          timeRemaining: 240,
        },
        status: "Playing",
      },
      {
        id: "m1-c",
        label: "C",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 5,
    estimatedWait: 20,
    machineType: "maimai",
  },
  {
    id: "loc-2",
    name: "Timezone Pacific Place",
    city: "Jakarta",
    machineCount: 2,
    machines: [
      {
        id: "m2-a",
        label: "A",
        currentPlayers: {
          player1: "MelodyDancer",
          mode: "solo",
          timeRemaining: 360,
        },
        status: "Playing",
      },
      {
        id: "m2-b",
        label: "B",
        currentPlayers: {
          player1: "HarmonySeeker",
          player2: "SyncStar",
          mode: "pair",
          timeRemaining: 420,
        },
        status: "Playing",
      },
    ],
    queueLength: 8,
    estimatedWait: 35,
    machineType: "maimai",
  },
  {
    id: "loc-3",
    name: "Timezone Taman Anggrek",
    city: "Jakarta",
    machineCount: 2,
    machines: [
      {
        id: "m3-a",
        label: "A",
        currentPlayers: {
          player1: "ProCombo",
          mode: "solo",
          timeRemaining: 180,
        },
        status: "Playing",
      },
      {
        id: "m3-b",
        label: "B",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 3,
    estimatedWait: 12,
    machineType: "maimai",
  },
  {
    id: "loc-4",
    name: "Timezone Kelapa Gading 3",
    city: "Jakarta",
    machineCount: 2,
    machines: [
      {
        id: "m4-a",
        label: "A",
        currentPlayers: null,
        status: "Available",
      },
      {
        id: "m4-b",
        label: "B",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 1,
    estimatedWait: 5,
    machineType: "maimai",
  },
  {
    id: "loc-5",
    name: "CPCM PIK",
    city: "Jakarta",
    machineCount: 2,
    machines: [
      {
        id: "m5-a",
        label: "A",
        currentPlayers: {
          player1: "NewbieLF",
          player2: "DuoPlayer",
          mode: "pair",
          timeRemaining: 520,
        },
        status: "Playing",
      },
      {
        id: "m5-b",
        label: "B",
        currentPlayers: {
          player1: "StarPlayer",
          mode: "solo",
          timeRemaining: 280,
        },
        status: "Playing",
      },
    ],
    queueLength: 6,
    estimatedWait: 28,
    machineType: "maimai",
  },

  // Bandung
  {
    id: "loc-6",
    name: "Timezone Trans Studio Bandung",
    city: "Bandung",
    machineCount: 3,
    machines: [
      {
        id: "m6-a",
        label: "A",
        currentPlayers: {
          player1: "BandungPro",
          mode: "solo",
          timeRemaining: 320,
        },
        status: "Playing",
      },
      {
        id: "m6-b",
        label: "B",
        currentPlayers: {
          player1: "CircleMaster",
          player2: "RhythmDuo",
          mode: "pair",
          timeRemaining: 450,
        },
        status: "Playing",
      },
      {
        id: "m6-c",
        label: "C",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 4,
    estimatedWait: 18,
    machineType: "maimai",
  },
  {
    id: "loc-7",
    name: "Timezone Paris Van Java",
    city: "Bandung",
    machineCount: 2,
    machines: [
      {
        id: "m7-a",
        label: "A",
        currentPlayers: {
          player1: "JazzPlayer",
          mode: "solo",
          timeRemaining: 200,
        },
        status: "Playing",
      },
      {
        id: "m7-b",
        label: "B",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 2,
    estimatedWait: 10,
    machineType: "maimai",
  },
  {
    id: "loc-8",
    name: "Timezone Summarecon Bandung",
    city: "Bandung",
    machineCount: 2,
    machines: [
      {
        id: "m8-a",
        label: "A",
        currentPlayers: {
          player1: "TeamAlpha",
          player2: "TeamBeta",
          mode: "pair",
          timeRemaining: 380,
        },
        status: "Playing",
      },
      {
        id: "m8-b",
        label: "B",
        currentPlayers: {
          player1: "SoloGrinder",
          mode: "solo",
          timeRemaining: 150,
        },
        status: "Playing",
      },
    ],
    queueLength: 7,
    estimatedWait: 32,
    machineType: "maimai",
  },

  // Surabaya
  {
    id: "loc-9",
    name: "Timezone Pakuwon",
    city: "Surabaya",
    machineCount: 2,
    machines: [
      {
        id: "m9-a",
        label: "A",
        currentPlayers: {
          player1: "SuraPlayer",
          mode: "solo",
          timeRemaining: 400,
        },
        status: "Playing",
      },
      {
        id: "m9-b",
        label: "B",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 3,
    estimatedWait: 15,
    machineType: "maimai",
  },
  {
    id: "loc-10",
    name: "Timezone Galaxy Mall 1",
    city: "Surabaya",
    machineCount: 2,
    machines: [
      {
        id: "m10-a",
        label: "A",
        currentPlayers: {
          player1: "GalaxyFan",
          player2: "SpaceBeats",
          mode: "pair",
          timeRemaining: 510,
        },
        status: "Playing",
      },
      {
        id: "m10-b",
        label: "B",
        currentPlayers: {
          player1: "QuickPlayer",
          mode: "solo",
          timeRemaining: 220,
        },
        status: "Playing",
      },
    ],
    queueLength: 5,
    estimatedWait: 25,
    machineType: "maimai",
  },

  // Bali
  {
    id: "loc-11",
    name: "Timezone Level 21",
    city: "Bali",
    machineCount: 2,
    machines: [
      {
        id: "m11-a",
        label: "A",
        currentPlayers: {
          player1: "IslandVibes",
          mode: "solo",
          timeRemaining: 340,
        },
        status: "Playing",
      },
      {
        id: "m11-b",
        label: "B",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 2,
    estimatedWait: 8,
    machineType: "maimai",
  },
  {
    id: "loc-12",
    name: "Timezone Trans Studio Mall Bali",
    city: "Bali",
    machineCount: 3,
    machines: [
      {
        id: "m12-a",
        label: "A",
        currentPlayers: {
          player1: "BeachPlayer",
          player2: "SunsetRhythm",
          mode: "pair",
          timeRemaining: 460,
        },
        status: "Playing",
      },
      {
        id: "m12-b",
        label: "B",
        currentPlayers: {
          player1: "TouristPro",
          mode: "solo",
          timeRemaining: 190,
        },
        status: "Playing",
      },
      {
        id: "m12-c",
        label: "C",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 4,
    estimatedWait: 16,
    machineType: "maimai",
  },

  // Medan
  {
    id: "loc-13",
    name: "Timezone Sun Plaza",
    city: "Medan",
    machineCount: 2,
    machines: [
      {
        id: "m13-a",
        label: "A",
        currentPlayers: {
          player1: "MedanChamp",
          mode: "solo",
          timeRemaining: 300,
        },
        status: "Playing",
      },
      {
        id: "m13-b",
        label: "B",
        currentPlayers: {
          player1: "NorthPlayer",
          player2: "SumateraTeam",
          mode: "pair",
          timeRemaining: 440,
        },
        status: "Playing",
      },
    ],
    queueLength: 6,
    estimatedWait: 30,
    machineType: "maimai",
  },

  // Makassar
  {
    id: "loc-14",
    name: "Trans Studio Mall Makassar",
    city: "Makassar",
    machineCount: 2,
    machines: [
      {
        id: "m14-a",
        label: "A",
        currentPlayers: null,
        status: "Available",
      },
      {
        id: "m14-b",
        label: "B",
        currentPlayers: {
          player1: "SulawesiKing",
          mode: "solo",
          timeRemaining: 260,
        },
        status: "Playing",
      },
    ],
    queueLength: 2,
    estimatedWait: 10,
    machineType: "maimai",
  },

  // Yogyakarta
  {
    id: "loc-15",
    name: "Timezone Plaza Ambarukmo",
    city: "Yogyakarta",
    machineCount: 2,
    machines: [
      {
        id: "m15-a",
        label: "A",
        currentPlayers: {
          player1: "JogjaRhythm",
          player2: "CultureBeats",
          mode: "pair",
          timeRemaining: 490,
        },
        status: "Playing",
      },
      {
        id: "m15-b",
        label: "B",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 3,
    estimatedWait: 14,
    machineType: "maimai",
  },

  // Bekasi
  {
    id: "loc-16",
    name: "Timezone Summarecon Bekasi",
    city: "Bekasi",
    machineCount: 2,
    machines: [
      {
        id: "m16-a",
        label: "A",
        currentPlayers: {
          player1: "BekasiPlayer",
          mode: "solo",
          timeRemaining: 210,
        },
        status: "Playing",
      },
      {
        id: "m16-b",
        label: "B",
        currentPlayers: {
          player1: "EastJavaTeam",
          player2: "ComboMaster",
          mode: "pair",
          timeRemaining: 540,
        },
        status: "Playing",
      },
    ],
    queueLength: 4,
    estimatedWait: 22,
    machineType: "maimai",
  },

  // Tangerang
  {
    id: "loc-17",
    name: "Timezone Summarecon Serpong",
    city: "Tangerang",
    machineCount: 2,
    machines: [
      {
        id: "m17-a",
        label: "A",
        currentPlayers: null,
        status: "Available",
      },
      {
        id: "m17-b",
        label: "B",
        currentPlayers: null,
        status: "Available",
      },
    ],
    queueLength: 0,
    estimatedWait: 0,
    machineType: "maimai",
  },
];

export const mockQueueEntries: QueueEntry[] = [
  {
    id: "q-1",
    player1: "NextPlayer",
    player2: "PartnerOne",
    mode: "pair",
    position: 1,
    status: "Ready",
    estimatedWait: 5,
    assignedMachine: "A",
  },
  {
    id: "q-2",
    player1: "SoloWaiter",
    mode: "solo",
    position: 2,
    status: "Waiting",
    estimatedWait: 12,
  },
  {
    id: "q-3",
    player1: "AutoPairSeeker",
    mode: "auto-pair",
    position: 3,
    status: "Waiting",
    estimatedWait: 19,
  },
  {
    id: "q-4",
    player1: "TeamPlayer1",
    player2: "TeamPlayer2",
    mode: "pair",
    position: 4,
    status: "Waiting",
    estimatedWait: 26,
  },
  {
    id: "q-5",
    player1: "AFKPlayer",
    mode: "solo",
    position: 5,
    status: "AFK",
    estimatedWait: 33,
  },
];

// Remove the old mockQueue and mockPairSeekers exports