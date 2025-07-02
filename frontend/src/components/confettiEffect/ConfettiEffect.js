// components/ConfettiEffect.js
import React, { useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const getFireworksSettings = (originX) => ({
  particleCount: 80,
  spread: 70,
  origin: { x: originX, y: 0.6 },
  startVelocity: 30,
  ticks: 80,
  scalar: 1.2,
  zIndex: 1000,
});

const ConfettiEffect = ({ trigger }) => {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const shootFireworks = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getFireworksSettings(0.2));
      refAnimationInstance.current(getFireworksSettings(0.5));
      refAnimationInstance.current(getFireworksSettings(0.8));
    }
  }, []);
  React.useEffect(() => {
    if (trigger) {
      shootFireworks();
    }
  }, [trigger, shootFireworks]);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default ConfettiEffect;
