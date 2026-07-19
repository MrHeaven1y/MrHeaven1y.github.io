"use client";

import { memo } from "react";

const Background = memo(function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Blob 1 — Cyan */}
      <div
        className="absolute -left-[10%] -top-[10%] h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full opacity-[0.07] animate-[blob-drift-1_15s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, #00f5ff 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blob 2 — Purple */}
      <div
        className="absolute -bottom-[15%] -right-[10%] h-[450px] w-[450px] md:h-[700px] md:w-[700px] rounded-full opacity-[0.06] animate-[blob-drift-2_20s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blob 3 — Blend */}
      <div
        className="absolute left-[30%] top-[40%] h-[350px] w-[350px] md:h-[500px] md:w-[500px] rounded-full opacity-[0.04] animate-[blob-drift-3_25s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, #00f5ff 0%, #7c3aed 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
});

export default Background;
