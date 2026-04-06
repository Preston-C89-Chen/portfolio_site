"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  vertexShader,
  fragmentShader,
  createUniforms,
  patternTypeToInt,
} from "./CityMapShader";
import type { CityConfig } from "./cityPatterns";

type CityMapSceneProps = {
  currentCity: CityConfig;
  nextCity: CityConfig;
  transition: number;
};

export const CityMapScene = ({
  currentCity,
  nextCity,
  transition,
}: CityMapSceneProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(() => createUniforms(), []);

  useFrame(({ clock }) => {
    const mat = materialRef.current;
    if (!mat) return;

    const u = mat.uniforms;
    u.uTime.value = clock.getElapsedTime();
    u.uResolution.value.set(size.width, size.height);
    u.uTransition.value = transition;

    // Current city params
    const cp = currentCity.shaderParams;
    u.uBlockSize.value = cp.blockSize;
    u.uStreetWidth.value = cp.streetWidth;
    u.uNoiseFreq.value = cp.noiseFreq;
    u.uNoiseAmp.value = cp.noiseAmp;
    u.uRotation.value = cp.rotation;
    u.uAspectRatio.value = cp.aspectRatio;
    u.uRadialSpokes.value = cp.radialSpokes;
    u.uRadialRings.value = cp.radialRings;
    u.uMixBlend.value = cp.mixBlend;
    u.uLandmarkAngle.value = cp.landmarkAngle;
    u.uLandmarkWidth.value = cp.landmarkWidth;
    u.uPatternType.value = patternTypeToInt(currentCity.patternType);

    // Next city params
    const np = nextCity.shaderParams;
    u.uBlockSize2.value = np.blockSize;
    u.uStreetWidth2.value = np.streetWidth;
    u.uNoiseFreq2.value = np.noiseFreq;
    u.uNoiseAmp2.value = np.noiseAmp;
    u.uRotation2.value = np.rotation;
    u.uAspectRatio2.value = np.aspectRatio;
    u.uRadialSpokes2.value = np.radialSpokes;
    u.uRadialRings2.value = np.radialRings;
    u.uMixBlend2.value = np.mixBlend;
    u.uLandmarkAngle2.value = np.landmarkAngle;
    u.uLandmarkWidth2.value = np.landmarkWidth;
    u.uPatternType2.value = patternTypeToInt(nextCity.patternType);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};
