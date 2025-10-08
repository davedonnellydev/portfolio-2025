'use client';

import { useEffect, useRef } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import classes from './AnimatedBackground.module.css';

interface GridDot {
  x: number;
  y: number;
  radius: number;
}

interface Cloud {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: { h: number; s: number; l: number };
  radius: number;
  // Shape randomization properties
  shapeOffsets: number[]; // Array of 8 offset values for different angles
  shapeVariation: number; // How much variation in shape (0-1)
}

interface AnimatedBackgroundProps {
  /** Spacing between dots in pixels (default: 40) */
  dotSpacing?: number;
  /** Dot radius in pixels (default: 2) */
  dotRadius?: number;
  /** Speed of cloud movement (default: 1) */
  cloudSpeed?: number;
  /** Number of colored clouds (default: 3) */
  cloudCount?: number;
  /** Enable mouse attraction - clouds move toward mouse (default: false) */
  mouseAttraction?: boolean;
  /** Strength of mouse attraction (default: 0.0005) */
  mouseAttractionStrength?: number;
}

export function AnimatedBackground({
  dotSpacing = 10,
  dotRadius = 3,
  cloudSpeed = 5,
  cloudCount = 3,
  mouseAttraction = false,
  mouseAttractionStrength = 0.0005,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<GridDot[]>([]);
  const cloudsRef = useRef<Cloud[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Track mouse position (if mouse attraction is enabled)
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseAttraction) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    if (mouseAttraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Initialize grid of dots
    const initializeDots = () => {
      const dots: GridDot[] = [];
      const cols = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          dots.push({
            x: i * dotSpacing,
            y: j * dotSpacing,
            radius: dotRadius,
          });
        }
      }

      dotsRef.current = dots;
    };
    initializeDots();

    // Initialize clouds
    const initializeClouds = () => {
      const isDark = colorScheme === 'dark';
      const clouds: Cloud[] = [];

      // Define cloud colors
      const cloudColors = isDark
        ? [
            { h: 280, s: 70, l: 60 }, // Purple
            { h: 200, s: 70, l: 55 }, // Cyan/Blue
            { h: 320, s: 65, l: 60 }, // Magenta
          ]
        : [
            { h: 280, s: 75, l: 65 }, // Purple
            { h: 200, s: 70, l: 60 }, // Cyan
            { h: 160, s: 84, l: 39 }, // Emerald
          ];

      for (let i = 0; i < cloudCount; i++) {
        // Generate random shape offsets for 8 angles (0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°)
        const shapeOffsets = Array.from({ length: 8 }, () => Math.random() * 2 - 1);

        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * cloudSpeed * 0.5,
          vy: (Math.random() - 0.5) * cloudSpeed * 0.5,
          color: cloudColors[i % cloudColors.length],
          radius: 150 + Math.random() * 100, // Cloud influence radius
          shapeOffsets,
          shapeVariation: 0.3 + Math.random() * 0.2, // 30-50% shape variation
        });
      }

      cloudsRef.current = clouds;
    };
    initializeClouds();

    // Get base color (subtle default for dots not in clouds)
    const getBaseColor = (isDark: boolean) => {
      if (isDark) {
        return `hsla(240, 15%, 45%, 0.15)`; // Very subtle gray-blue (reduced from 0.2)
      }
      return `hsla(240, 20%, 65%, 0.18)`; // Very subtle light blue-gray (reduced from 0.25)
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) {
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = colorScheme === 'dark';
      const dots = dotsRef.current;
      const clouds = cloudsRef.current;
      const baseColor = getBaseColor(isDark);

      // Update cloud positions (skip if reduced motion)
      if (!prefersReducedMotion) {
        clouds.forEach((cloud) => {
          // Add mouse attraction force if enabled
          if (mouseAttraction) {
            const dx = mouseRef.current.x - cloud.x;
            const dy = mouseRef.current.y - cloud.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
              // Add attraction force toward mouse (subtle)
              cloud.vx += (dx / distance) * mouseAttractionStrength * distance;
              cloud.vy += (dy / distance) * mouseAttractionStrength * distance;

              // Apply damping to prevent clouds from moving too fast
              const maxSpeed = cloudSpeed * 2;
              const currentSpeed = Math.sqrt(cloud.vx * cloud.vx + cloud.vy * cloud.vy);
              if (currentSpeed > maxSpeed) {
                cloud.vx = (cloud.vx / currentSpeed) * maxSpeed;
                cloud.vy = (cloud.vy / currentSpeed) * maxSpeed;
              }
            }
          }

          // Update position
          cloud.x += cloud.vx;
          cloud.y += cloud.vy;

          // Calculate bounds (keep clouds fully within viewport)
          const minX = cloud.radius * 0.5;
          const maxX = canvas.width - cloud.radius * 0.5;
          const minY = cloud.radius * 0.5;
          const maxY = canvas.height - cloud.radius * 0.5;

          // Bounce off edges
          if (cloud.x <= minX || cloud.x >= maxX) {
            cloud.vx *= -1;
            cloud.x = Math.max(minX, Math.min(maxX, cloud.x));
          }
          if (cloud.y <= minY || cloud.y >= maxY) {
            cloud.vy *= -1;
            cloud.y = Math.max(minY, Math.min(maxY, cloud.y));
          }

          // Ensure clouds stay within bounds
          cloud.x = Math.max(minX, Math.min(maxX, cloud.x));
          cloud.y = Math.max(minY, Math.min(maxY, cloud.y));
        });
      }

      // Helper function to get cloud radius at a specific angle (for organic shape)
      const getCloudRadiusAtAngle = (cloud: Cloud, angle: number) => {
        // Normalize angle to 0-2π
        const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

        // Convert to 0-7 index for our 8 offset points
        const index = (normalizedAngle / (Math.PI * 2)) * 8;
        const lowerIndex = Math.floor(index) % 8;
        const upperIndex = Math.ceil(index) % 8;
        const fraction = index - Math.floor(index);

        // Interpolate between two closest offset points
        const offset =
          cloud.shapeOffsets[lowerIndex] * (1 - fraction) +
          cloud.shapeOffsets[upperIndex] * fraction;

        // Apply variation to radius
        return cloud.radius * (1 + offset * cloud.shapeVariation);
      };

      // Draw dots
      dots.forEach((dot) => {
        let finalColor = baseColor;
        let maxInfluence = 0;

        // Check influence from each cloud
        clouds.forEach((cloud) => {
          const dx = dot.x - cloud.x;
          const dy = dot.y - cloud.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate angle from cloud center to dot
          const angle = Math.atan2(dy, dx);

          // Get the cloud's radius at this angle (organic shape)
          const radiusAtAngle = getCloudRadiusAtAngle(cloud, angle);

          if (distance < radiusAtAngle) {
            // Calculate influence (1 at center, 0 at edge)
            const influence = 1 - distance / radiusAtAngle;
            const smoothInfluence = influence * influence; // Ease out

            if (smoothInfluence > maxInfluence) {
              maxInfluence = smoothInfluence;
              // Reduced opacity for better text readability
              const opacity = isDark
                ? 0.35 + smoothInfluence * 0.25 // Dark: 0.35-0.6 (was 0.4-0.7)
                : 0.25 + smoothInfluence * 0.35; // Light: 0.25-0.6 (was 0.3-0.7)
              finalColor = `hsla(${cloud.color.h}, ${cloud.color.s}%, ${cloud.color.l}%, ${opacity})`;
            }
          }
        });

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = finalColor;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      initializeDots();
      initializeClouds();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mouseAttraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [
    colorScheme,
    dotSpacing,
    dotRadius,
    cloudSpeed,
    cloudCount,
    mouseAttraction,
    mouseAttractionStrength,
  ]);

  return <canvas ref={canvasRef} className={classes.canvas} aria-hidden="true" />;
}
