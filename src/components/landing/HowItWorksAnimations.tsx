import { motion } from "framer-motion";
import { useState } from "react";

/* ── Lock Animation ── */
export const LockAnimation = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full h-44 flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        {/* Lock body */}
        <motion.div
          className="w-16 h-14 rounded-lg border-2 border-primary/60 bg-primary/10 flex items-center justify-center"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Keyhole */}
          <motion.div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-primary/70" />
            <div className="w-1.5 h-2 bg-primary/70 -mt-0.5 rounded-b" />
          </motion.div>
        </motion.div>

        {/* Shackle */}
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-8 border-2 border-primary/60 border-b-0 rounded-t-full"
          animate={{
            y: hovered ? -4 : 0,
            rotateZ: hovered ? -8 : 0,
            originX: "100%",
            originY: "100%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        {/* Encryption particles */}
        {hovered &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/50"
              style={{ top: "50%", left: "50%" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI) / 3) * 40,
                y: Math.sin((i * Math.PI) / 3) * 40,
              }}
              transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
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
