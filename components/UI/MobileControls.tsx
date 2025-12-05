/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Shield } from "lucide-react";
import { useStore } from "../../store";
import { GameStatus } from "../../types";

export const MobileControls: React.FC = () => {
  const { status } = useStore();

  // Only show controls during gameplay
  if (status !== GameStatus.PLAYING) return null;

  // Helper to trigger key events
  const triggerKey = (key: string) => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 z-[60] flex justify-between items-end pointer-events-none select-none touch-none">
      {/* Left Controls: Movement */}
      <div className="flex gap-4 pointer-events-auto">
        <button
          className="virtual-control w-16 h-16 bg-cyan-900/50 border-2 border-cyan-500/80 rounded-full flex items-center justify-center active:bg-cyan-500/50 active:scale-95 transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.3)]"
          onTouchStart={(e) => {
            e.preventDefault();
            triggerKey("ArrowLeft");
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            triggerKey("ArrowLeft");
          }}
        >
          <ArrowLeft className="w-8 h-8 text-cyan-100" />
        </button>
        <button
          className="virtual-control w-16 h-16 bg-cyan-900/50 border-2 border-cyan-500/80 rounded-full flex items-center justify-center active:bg-cyan-500/50 active:scale-95 transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.3)]"
          onTouchStart={(e) => {
            e.preventDefault();
            triggerKey("ArrowRight");
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            triggerKey("ArrowRight");
          }}
        >
          <ArrowRight className="w-8 h-8 text-cyan-100" />
        </button>
      </div>

      {/* Right Controls: Actions */}
      <div className="flex gap-4 items-end pointer-events-auto">
        <button
          className="virtual-control w-12 h-12 bg-yellow-900/50 border-2 border-yellow-500/80 rounded-full flex items-center justify-center active:bg-yellow-500/50 active:scale-95 transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-2"
          onTouchStart={(e) => {
            e.preventDefault();
            triggerKey(" ");
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            triggerKey(" ");
          }}
        >
          <Shield className="w-6 h-6 text-yellow-100" />
        </button>
        <button
          className="virtual-control w-20 h-20 bg-pink-900/50 border-2 border-pink-500/80 rounded-full flex items-center justify-center active:bg-pink-500/50 active:scale-95 transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,85,0.3)]"
          onTouchStart={(e) => {
            e.preventDefault();
            triggerKey("ArrowUp");
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            triggerKey("ArrowUp");
          }}
        >
          <ArrowUp className="w-10 h-10 text-pink-100" />
        </button>
      </div>
    </div>
  );
};
