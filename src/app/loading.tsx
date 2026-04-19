"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen pt-[60px] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  );
}