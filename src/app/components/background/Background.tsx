import React, { useEffect, useRef, useState } from 'react';

interface Cloud {
  id: number;
  left: number; // px
  top: number; // px
  speed: number; // px per frame
  scale: number;
}

interface BackgroundProps {
  mode: string;
}

const CLOUD_COUNT = 5;
const CLOUD_SCALES = [0.65, 0.3, 0.5, 0.4, 0.55];
const CLOUD_SPEEDS = [0.6, 1, 0.7, 1.2, 0.8]; // px per frame
const CLOUD_HEIGHT = 100; // px, approx height of cloud
const CLOUD_START_LEFT = -200; // px, always start from outside left

function getRandomTop() {
  // Random top between 0 and (window.innerHeight - CLOUD_HEIGHT)
  if (typeof window === 'undefined') return 0;
  return Math.floor(Math.random() * (window.innerHeight - CLOUD_HEIGHT));
}

export default function Background({ mode }: BackgroundProps) {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Semua awan mulai dari luar kiri layar
    const initialClouds: Cloud[] = Array.from({ length: CLOUD_COUNT }).map((_, i) => ({
      id: i,
      left: CLOUD_START_LEFT,
      top: getRandomTop(),
      speed: CLOUD_SPEEDS[i % CLOUD_SPEEDS.length],
      scale: CLOUD_SCALES[i % CLOUD_SCALES.length],
    }));
    setClouds(initialClouds);
  }, []);

  useEffect(() => {
    function animate() {
      setClouds(prevClouds =>
        prevClouds.map(cloud => {
          let newLeft = cloud.left + cloud.speed;
          let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
          if (newLeft > windowWidth + 100) {
            // Jika sudah keluar layar kanan, reset ke kiri dengan posisi top acak
            newLeft = CLOUD_START_LEFT;
            return {
              ...cloud,
              left: newLeft,
              top: getRandomTop(),
            };
          }
          return {
            ...cloud,
            left: newLeft,
          };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div id="background-wrap" className={`background ${mode}`}>
      {clouds.map((cloud, i) => (
        <div
          key={cloud.id}
          className={`x${i + 1}`}
          style={{
            position: 'absolute',
            left: cloud.left,
            top: cloud.top,
            transform: `scale(${cloud.scale})`,
            pointerEvents: 'none',
          }}
        >
          <div className={`cloud ${mode}`}></div>
        </div>
      ))}
    </div>
  );
} 