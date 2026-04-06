export type PatternType = "grid" | "radial" | "organic" | "mixed";

export type CityConfig = {
  name: string;
  coordinates: string;
  patternType: PatternType;
  shaderParams: {
    blockSize: number;
    streetWidth: number;
    noiseFreq: number;
    noiseAmp: number;
    rotation: number;
    aspectRatio: number;
    radialSpokes: number;
    radialRings: number;
    mixBlend: number;       // 0 = pure grid, 1 = pure organic
    landmarkAngle: number;  // diagonal street angle (for mixed)
    landmarkWidth: number;
  };
};

export const CITIES: CityConfig[] = [
  {
    name: "Portland",
    coordinates: "45.5152°N 122.6784°W",
    patternType: "grid",
    shaderParams: {
      blockSize: 0.05,
      streetWidth: 0.38,
      noiseFreq: 0.0,
      noiseAmp: 0.0,
      rotation: 0.0,
      aspectRatio: 1.0,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "New York",
    coordinates: "40.7128°N 74.0060°W",
    patternType: "grid",
    shaderParams: {
      blockSize: 0.035,
      streetWidth: 0.32,
      noiseFreq: 0.0,
      noiseAmp: 0.0,
      rotation: 0.51,
      aspectRatio: 2.8,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "Sacramento",
    coordinates: "38.5816°N 121.4944°W",
    patternType: "grid",
    shaderParams: {
      blockSize: 0.06,
      streetWidth: 0.35,
      noiseFreq: 0.0,
      noiseAmp: 0.0,
      rotation: 0.0,
      aspectRatio: 1.0,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "Irvine",
    coordinates: "33.6846°N 117.8265°W",
    patternType: "grid",
    shaderParams: {
      blockSize: 0.08,
      streetWidth: 0.33,
      noiseFreq: 0.0,
      noiseAmp: 0.0,
      rotation: 0.26,
      aspectRatio: 1.4,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "Paris",
    coordinates: "48.8566°N 2.3522°E",
    patternType: "radial",
    shaderParams: {
      blockSize: 0.05,
      streetWidth: 0.28,
      noiseFreq: 0.0,
      noiseAmp: 0.0,
      rotation: 0.0,
      aspectRatio: 1.0,
      radialSpokes: 12.0,
      radialRings: 18.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "Dubai",
    coordinates: "25.2048°N 55.2708°E",
    patternType: "radial",
    shaderParams: {
      blockSize: 0.06,
      streetWidth: 0.30,
      noiseFreq: 0.0,
      noiseAmp: 0.0,
      rotation: 0.0,
      aspectRatio: 1.0,
      radialSpokes: 8.0,
      radialRings: 14.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "Rome",
    coordinates: "41.9028°N 12.4964°E",
    patternType: "organic",
    shaderParams: {
      blockSize: 0.05,
      streetWidth: 0.30,
      noiseFreq: 3.0,
      noiseAmp: 1.0,
      rotation: 0.0,
      aspectRatio: 1.0,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "Tunis",
    coordinates: "36.8065°N 10.1815°E",
    patternType: "organic",
    shaderParams: {
      blockSize: 0.04,
      streetWidth: 0.32,
      noiseFreq: 4.5,
      noiseAmp: 1.2,
      rotation: 0.0,
      aspectRatio: 1.0,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "Osaka",
    coordinates: "34.6937°N 135.5023°E",
    patternType: "organic",
    shaderParams: {
      blockSize: 0.035,
      streetWidth: 0.28,
      noiseFreq: 3.5,
      noiseAmp: 0.9,
      rotation: 0.0,
      aspectRatio: 1.0,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.0,
      landmarkAngle: 0.0,
      landmarkWidth: 0.0,
    },
  },
  {
    name: "San Francisco",
    coordinates: "37.7749°N 122.4194°W",
    patternType: "mixed",
    shaderParams: {
      blockSize: 0.05,
      streetWidth: 0.30,
      noiseFreq: 2.5,
      noiseAmp: 0.7,
      rotation: 0.0,
      aspectRatio: 1.2,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.55,
      landmarkAngle: 0.68,
      landmarkWidth: 0.012,
    },
  },
  {
    name: "Atlanta",
    coordinates: "33.7490°N 84.3880°W",
    patternType: "mixed",
    shaderParams: {
      blockSize: 0.06,
      streetWidth: 0.32,
      noiseFreq: 2.0,
      noiseAmp: 0.6,
      rotation: 0.15,
      aspectRatio: 1.0,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.4,
      landmarkAngle: -0.35,
      landmarkWidth: 0.015,
    },
  },
  {
    name: "Boston",
    coordinates: "42.3601°N 71.0589°W",
    patternType: "mixed",
    shaderParams: {
      blockSize: 0.045,
      streetWidth: 0.30,
      noiseFreq: 3.2,
      noiseAmp: 0.85,
      rotation: 0.3,
      aspectRatio: 1.1,
      radialSpokes: 0.0,
      radialRings: 0.0,
      mixBlend: 0.65,
      landmarkAngle: 0.0,
      landmarkWidth: 0.01,
    },
  },
];

export const CYCLE_DURATION = 6.0;
export const TRANSITION_DURATION = 1.0;
