'use client';
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; 
const Sketch = dynamic(() => import("react-p5"), { ssr: false });

const P5_Sanskrit = (): JSX.Element => {
  let numCircles = 4; // Assuming 4 circles/phrases
  let textSizeStep = 60;
  let startAngle = 0;
  let distanceAngle = 360;
  let baseRadius: any;
  let amplitude = 80; // Amplitude of the oscillation of the radius
  let period = 200; // How many frames for one cycle of the first set
  let periodSecond = 120; // Different period for the second set

  // State to check if the component is being rendered on the client side
  const [isClient, setIsClient] = useState(false);

  // Set the client-side flag when the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const setup = (p5: any) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    baseRadius = p5.min(p5.width, p5.height) / 2;
    p5.textSize(baseRadius / 4);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.frameRate(30); // Higher frame rate for smoother animation
  };

  const windowResized = (p5: any) => {
    setup(p5);
  };

  const drawCircle = (p5: any, circleData: any, radiusMultiplier: any, hue: string) => {
    const numLetters = circleData["phrase"].length;
    const angleStep = p5.radians(distanceAngle / numLetters);
    let currentAngle = p5.radians(startAngle);

    for (let i = 0; i < numLetters; i++) {
      p5.push();
      p5.rotate(currentAngle);
      p5.translate(circleData["radius_diff"] * radiusMultiplier, 0); // Apply dynamic radius

      let startColor = p5.color(hue);
      let endColor = p5.color(255, 215, 0); // Keeping a consistent end color
      let color = p5.lerpColor(startColor, endColor, i / numLetters);

      p5.fill(color);
      p5.noStroke();
      p5.textSize(textSizeStep);
      p5.textFont("Tiro");
      p5.text(circleData["phrase"][i], 0, 0);
      p5.pop();

      currentAngle += angleStep;
    }
  };

  const draw = (p5: any) => {
    p5.background(14, 17, 21);
    p5.translate(p5.width / 2, p5.height / 2); // Center the drawing context

    // Calculate dynamic radius multipliers using sine wave for two sets
    let radiusMultiplier1 = 1 + amplitude * Math.sin((2 * Math.PI * p5.frameCount) / period) / baseRadius;
    let radiusMultiplier2 = 1 + amplitude * Math.sin((2 * Math.PI * p5.frameCount) / periodSecond) / baseRadius;

    const circleData = [
      { "radius_diff": baseRadius * 1.1, "phrase": "अहम् ब्रह्मास्मि" },
      { "radius_diff": baseRadius * 0.8, "phrase": "अयं निजः परो वेत्ति" },
      { "radius_diff": baseRadius * 0.5, "phrase": "वृक्षः कोटि-संख्यायाः" },
      { "radius_diff": baseRadius * 0.2, "phrase": "सर्वधर्मान् परित्यज्य मामेकं शरणं व्रज" }
    ];

    // First set of circles (blue hues)
    for (let i = 0; i < numCircles; i++) {
      drawCircle(p5, circleData[i], radiusMultiplier1, "blue");
    }

    // Second set of circles (brown hues)
    for (let i = 0; i < numCircles; i++) {
      drawCircle(p5, circleData[i], radiusMultiplier2, "brown");
    }
  };

  return (
    <>
      {isClient && (
        <Sketch
          setup={setup}
          draw={draw}
          windowResized={windowResized}
          className={"canvas-container"}
          style={{ position: "absolute", top: 0, left: 0, zIndex: -1, opacity: 0.6 }} // Canvas styling
        />
      )}
    </>
  );
};

export default P5_Sanskrit;
