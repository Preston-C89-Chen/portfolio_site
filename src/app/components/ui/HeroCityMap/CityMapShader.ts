import * as THREE from "three";

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  // Current city params
  uniform float uBlockSize;
  uniform float uStreetWidth;
  uniform float uNoiseFreq;
  uniform float uNoiseAmp;
  uniform float uRotation;
  uniform float uAspectRatio;
  uniform float uRadialSpokes;
  uniform float uRadialRings;
  uniform float uMixBlend;
  uniform float uLandmarkAngle;
  uniform float uLandmarkWidth;
  uniform int uPatternType; // 0=grid, 1=radial, 2=organic, 3=mixed

  // Next city params (for transition)
  uniform float uBlockSize2;
  uniform float uStreetWidth2;
  uniform float uNoiseFreq2;
  uniform float uNoiseAmp2;
  uniform float uRotation2;
  uniform float uAspectRatio2;
  uniform float uRadialSpokes2;
  uniform float uRadialRings2;
  uniform float uMixBlend2;
  uniform float uLandmarkAngle2;
  uniform float uLandmarkWidth2;
  uniform int uPatternType2;

  uniform float uTransition;  // 0 = current, 1 = next
  uniform float uTime;
  uniform vec2 uResolution;

  // ---- Simplex Noise (2D) ----
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // ---- Pattern Functions ----

  vec2 rotate2d(vec2 p, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }

  float gridPattern(vec2 uv, float blockSize, float streetWidth, float rotation, float ar) {
    vec2 p = uv - 0.5;
    p = rotate2d(p, rotation);
    p += 0.5;
    p.y *= ar;

    vec2 cell = fract(p / blockSize);
    float sw = streetWidth;
    float streets = step(cell.x, sw) + step(cell.y, sw);
    return clamp(streets, 0.0, 1.0);
  }

  float radialPattern(vec2 uv, float spokes, float rings, float streetWidth) {
    vec2 p = uv - 0.5;
    float dist = length(p);
    float angle = atan(p.y, p.x);

    // Concentric rings
    float ringPattern = fract(dist * rings);
    float ringStreet = step(ringPattern, streetWidth * 0.8);

    // Radial spokes
    float spokeAngle = fract(angle * spokes / 6.28318);
    float spokeStreet = step(spokeAngle, streetWidth * 0.4);

    return clamp(ringStreet + spokeStreet, 0.0, 1.0);
  }

  float organicPattern(vec2 uv, float freq, float amp, float streetWidth) {
    vec2 p = uv * freq * 10.0;
    float n = snoise(p) * amp;
    float n2 = snoise(p * 2.1 + 3.7) * amp * 0.5;
    float combined = n + n2;

    // Create street-like isolines
    float iso1 = abs(fract(combined * 3.0) - 0.5);
    float iso2 = abs(fract(combined * 1.8 + 0.3) - 0.5);
    float streets = step(iso1, streetWidth * 0.5) + step(iso2, streetWidth * 0.4);
    return clamp(streets, 0.0, 1.0);
  }

  float mixedPattern(vec2 uv, float blockSize, float streetWidth, float rotation, float ar,
                     float freq, float amp, float blend, float lAngle, float lWidth) {
    float g = gridPattern(uv, blockSize, streetWidth, rotation, ar);
    float o = organicPattern(uv, freq, amp, streetWidth);
    float base = mix(g, o, blend);

    // Landmark street (diagonal)
    if (lWidth > 0.001) {
      vec2 p = uv - 0.5;
      p = rotate2d(p, lAngle);
      float landmark = 1.0 - smoothstep(0.0, lWidth, abs(p.y));
      base = max(base, landmark);
    }

    return base;
  }

  float getPattern(vec2 uv, int pType, float blockSize, float streetWidth,
                   float noiseFreq, float noiseAmp, float rotation, float ar,
                   float spokes, float rings, float blend, float lAngle, float lWidth) {
    if (pType == 0) {
      return gridPattern(uv, blockSize, streetWidth, rotation, ar);
    } else if (pType == 1) {
      return radialPattern(uv, spokes, rings, streetWidth);
    } else if (pType == 2) {
      return organicPattern(uv, noiseFreq, noiseAmp, streetWidth);
    } else {
      return mixedPattern(uv, blockSize, streetWidth, rotation, ar, noiseFreq, noiseAmp, blend, lAngle, lWidth);
    }
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Get patterns for current and next city
    float pattern1 = getPattern(uv, uPatternType, uBlockSize, uStreetWidth,
                                uNoiseFreq, uNoiseAmp, uRotation, uAspectRatio,
                                uRadialSpokes, uRadialRings, uMixBlend, uLandmarkAngle, uLandmarkWidth);

    float pattern2 = getPattern(uv, uPatternType2, uBlockSize2, uStreetWidth2,
                                uNoiseFreq2, uNoiseAmp2, uRotation2, uAspectRatio2,
                                uRadialSpokes2, uRadialRings2, uMixBlend2, uLandmarkAngle2, uLandmarkWidth2);

    // Noise dissolve transition
    float dissolveNoise = snoise(vUv * 4.0 + uTime * 0.3) * 0.5 + 0.5;
    float dissolveMask = smoothstep(uTransition - 0.3, uTransition + 0.3, dissolveNoise);

    float finalPattern = mix(pattern1, pattern2, dissolveMask);

    // Figure-ground: solid black buildings on white ground
    vec3 color = vec3(finalPattern);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export type CityMapUniforms = {
  uBlockSize: { value: number };
  uStreetWidth: { value: number };
  uNoiseFreq: { value: number };
  uNoiseAmp: { value: number };
  uRotation: { value: number };
  uAspectRatio: { value: number };
  uRadialSpokes: { value: number };
  uRadialRings: { value: number };
  uMixBlend: { value: number };
  uLandmarkAngle: { value: number };
  uLandmarkWidth: { value: number };
  uPatternType: { value: number };

  uBlockSize2: { value: number };
  uStreetWidth2: { value: number };
  uNoiseFreq2: { value: number };
  uNoiseAmp2: { value: number };
  uRotation2: { value: number };
  uAspectRatio2: { value: number };
  uRadialSpokes2: { value: number };
  uRadialRings2: { value: number };
  uMixBlend2: { value: number };
  uLandmarkAngle2: { value: number };
  uLandmarkWidth2: { value: number };
  uPatternType2: { value: number };

  uTransition: { value: number };
  uTime: { value: number };
  uResolution: { value: THREE.Vector2 };
};

const PATTERN_TYPE_MAP = { grid: 0, radial: 1, organic: 2, mixed: 3 } as const;

export function patternTypeToInt(pt: string): number {
  return PATTERN_TYPE_MAP[pt as keyof typeof PATTERN_TYPE_MAP] ?? 0;
}

export function createUniforms(): CityMapUniforms {
  return {
    uBlockSize: { value: 0.06 },
    uStreetWidth: { value: 0.25 },
    uNoiseFreq: { value: 0.0 },
    uNoiseAmp: { value: 0.0 },
    uRotation: { value: 0.0 },
    uAspectRatio: { value: 1.0 },
    uRadialSpokes: { value: 0.0 },
    uRadialRings: { value: 0.0 },
    uMixBlend: { value: 0.0 },
    uLandmarkAngle: { value: 0.0 },
    uLandmarkWidth: { value: 0.0 },
    uPatternType: { value: 0 },

    uBlockSize2: { value: 0.06 },
    uStreetWidth2: { value: 0.25 },
    uNoiseFreq2: { value: 0.0 },
    uNoiseAmp2: { value: 0.0 },
    uRotation2: { value: 0.0 },
    uAspectRatio2: { value: 1.0 },
    uRadialSpokes2: { value: 0.0 },
    uRadialRings2: { value: 0.0 },
    uMixBlend2: { value: 0.0 },
    uLandmarkAngle2: { value: 0.0 },
    uLandmarkWidth2: { value: 0.0 },
    uPatternType2: { value: 0 },

    uTransition: { value: 0.0 },
    uTime: { value: 0.0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
  };
}
