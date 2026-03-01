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

  // 9x9 QR-like pattern with finder squares
  const grid = [
    [1,1,1,1,0,1,1,1,1],
    [1,0,0,1,0,1,0,0,1],
    [1,0,1,1,0,1,1,0,1],
    [1,1,1,0,1,0,1,1,1],
    [0,0,0,1,0,1,0,0,0],
    [1,1,1,0,1,0,1,1,1],
    [1,0,1,1,0,1,1,0,1],
    [1,0,0,1,0,1,0,0,1],
    [1,1,1,1,0,1,1,1,1],
  ];

  return (
    <div
      className="w-full h-44 flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-center justify-center">
        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-10 pointer-events-none"
          animate={{
            y: hovered ? [-40, 40] : -50,
            opacity: hovered ? [0.8, 0.8, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: hovered ? Infinity : 0,
            ease: "linear",
          }}
        />

        {/* QR grid */}
        <div className="grid grid-cols-9 gap-[2px]">
          {grid.flat().map((cell, i) => {
            const row = Math.floor(i / 9);
            const col = i % 9;
            const distFromCenter = Math.abs(row - 4) + Math.abs(col - 4);
            return (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-[1px]"
                style={{
                  backgroundColor: cell
                    ? "hsl(var(--primary))"
                    : "hsl(var(--primary) / 0.06)",
                }}
                animate={{
                  opacity: hovered
                    ? cell ? [0, 0.9] : 0.08
                    : cell ? 0.25 : 0.05,
                  scale: hovered ? 1 : 0.7,
                }}
                transition={{
                  duration: 0.4,
                  delay: hovered ? distFromCenter * 0.04 : 0,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>

        {/* Corner brackets */}
        {[
          { top: -6, left: -6, borderTop: "2px solid", borderLeft: "2px solid" },
          { top: -6, right: -6, borderTop: "2px solid", borderRight: "2px solid" },
          { bottom: -6, left: -6, borderBottom: "2px solid", borderLeft: "2px solid" },
          { bottom: -6, right: -6, borderBottom: "2px solid", borderRight: "2px solid" },
        ].map((style, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 border-primary/40"
            style={style as React.CSSProperties}
            animate={{
              borderColor: hovered
                ? "hsl(var(--primary) / 0.6)"
                : "hsl(var(--primary) / 0.2)",
              scale: hovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        ))}

        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            boxShadow: "0 0 20px hsl(var(--primary) / 0.15)",
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};
