import { motion } from "framer-motion";
import { useState } from "react";

/* ── Lock Animation ── */
export const LockAnimation = () => {
  const [hovered, setHovered] = useState(false);

  // Floating cipher characters
  const cipherChars = ["0x", "FF", "A3", "9D", "E7", "4B", "C1", "8F"];

  return (
    <div
      className="w-full h-44 flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex flex-col items-center">
        {/* Shield outline */}
        <motion.svg
          viewBox="0 0 80 96"
          className="w-20 h-24"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.path
            d="M40 4 L72 20 V52 C72 72 56 88 40 92 C24 88 8 72 8 52 V20 Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinejoin="round"
            animate={{ strokeOpacity: hovered ? 0.8 : 0.4, fillOpacity: hovered ? 0.12 : 0.05 }}
            style={{ fill: "hsl(var(--primary))" }}
          />
          {/* Inner lock icon */}
          <motion.rect
            x="30" y="42" width="20" height="16" rx="3"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            animate={{ strokeOpacity: hovered ? 0.9 : 0.5 }}
          />
          <motion.path
            d="M34 42 V36 A6 6 0 0 1 46 36 V42"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              strokeOpacity: hovered ? 0.9 : 0.5,
              d: hovered
                ? "M34 42 V36 A6 6 0 0 1 46 36 V34"
                : "M34 42 V36 A6 6 0 0 1 46 36 V42",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          />
          {/* Keyhole dot */}
          <circle cx="40" cy="50" r="2" fill="hsl(var(--primary))" opacity={0.7} />
        </motion.svg>

        {/* Floating cipher text */}
        {cipherChars.map((char, i) => {
          const angle = (i / cipherChars.length) * Math.PI * 2;
          const radius = 52;
          return (
            <motion.span
              key={i}
              className="absolute font-mono text-[10px] text-primary/40 select-none"
              style={{ top: "45%", left: "50%" }}
              animate={{
                x: hovered ? Math.cos(angle) * radius : 0,
                y: hovered ? Math.sin(angle) * radius : 0,
                opacity: hovered ? [0, 0.6, 0.3] : 0,
                scale: hovered ? 1 : 0,
              }}
              transition={{
                duration: 2,
                delay: i * 0.08,
                repeat: hovered ? Infinity : 0,
                repeatType: "reverse",
              }}
            >
              {char}
            </motion.span>
          );
        })}

        {/* Subtle pulse ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
          animate={{
            width: hovered ? 100 : 60,
            height: hovered ? 100 : 60,
            opacity: hovered ? [0.3, 0] : 0,
          }}
          transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
        />
      </div>
    </div>
  );
};

/* ── Split Animation ── */
export const SplitAnimation = () => {
  const [hovered, setHovered] = useState(false);

  const shardCount = 5;
  const positions = [
    { x: -30, y: -20, rotate: -15 },
    { x: 25, y: -25, rotate: 12 },
    { x: -20, y: 22, rotate: -8 },
    { x: 30, y: 18, rotate: 20 },
    { x: 0, y: 30, rotate: -5 },
  ];

  return (
    <div
      className="w-full h-44 flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        {Array.from({ length: shardCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-10 rounded border border-primary/40 bg-primary/10 flex items-center justify-center"
            style={{ top: -20, left: -16 }}
            animate={
              hovered
                ? {
                    x: positions[i].x,
                    y: positions[i].y,
                    rotate: positions[i].rotate,
                    opacity: 1,
                  }
                : { x: 0, y: 0, rotate: 0, opacity: 1 }
            }
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 18,
              delay: i * 0.05,
            }}
          >
            <span className="text-[9px] font-mono text-primary/60">
              {i + 1}/{shardCount}
            </span>
          </motion.div>
        ))}

        {/* Center indicator */}
        <motion.div
          className="relative z-10 w-8 h-10 rounded border border-primary/60 bg-card/60 flex items-center justify-center"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-4 h-0.5 bg-primary/50 mb-0.5" />
          <div className="w-3 h-0.5 bg-primary/30" />
        </motion.div>
      </div>
    </div>
  );
};

/* ── QR Code Reveal Animation ── */
export const QRCodeAnimation = () => {
  const [hovered, setHovered] = useState(false);

  // Simple 7x7 QR-like grid
  const grid = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1, 1],
  ];

  return (
    <div
      className="w-full h-44 flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid grid-cols-7 gap-[3px]">
        {grid.flat().map((cell, i) => (
          <motion.div
            key={i}
            className={`w-3.5 h-3.5 rounded-[2px] ${
              cell ? "bg-primary/60" : "bg-primary/10"
            }`}
            initial={false}
            animate={{
              scale: hovered ? 1 : 0.6,
              opacity: hovered ? (cell ? 0.8 : 0.15) : 0.3,
            }}
            transition={{
              duration: 0.3,
              delay: hovered ? (i % 7) * 0.03 + Math.floor(i / 7) * 0.03 : 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};
