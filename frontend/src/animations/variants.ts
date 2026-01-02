export const itemVariants = {
  idle: {
    opacity: 0.5,
    scale: 1,
  },
  active: {
    opacity: 1,
    scale: 1.05,
  },
  success: {
    color: "#22c55e",
    scale: 1.1,
  },
  error: {
    color: "#ef4444",
    x: [0, -4, 4, -4, 4, 0], // shake
  },
};
