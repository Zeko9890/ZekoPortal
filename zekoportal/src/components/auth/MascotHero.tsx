"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, animate, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { CheckCircle2, FolderKanban } from "lucide-react";

export default function MascotHero() {
  const progressValue = useMotionValue(0);
  const roundedProgress = useTransform(progressValue, Math.round);
  const [displayProgress, setDisplayProgress] = useState(0);

  useMotionValueEvent(roundedProgress, "change", (latest) => {
    setDisplayProgress(latest);
  });
  
  const mascotControls = useAnimation();
  const eyesControls = useAnimation();
  
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const runSequence = async () => {
      // 1. Initial wait
      await new Promise(r => setTimeout(r, 1200));
      if (!isMounted) return;
      
      // Mascot notices card
      mascotControls.start({
        x: -10,
        rotate: -3,
        transition: { type: "spring", stiffness: 120, damping: 20 }
      });
      eyesControls.start({
        y: -1,
        x: -3,
        scale: 1.1,
        transition: { duration: 0.3 }
      });
      
      await new Promise(r => setTimeout(r, 1000));
      if (!isMounted) return;

      // 2. Progress animation starts
      const milestones = [12, 28, 44, 63, 81, 87];
      for (const m of milestones) {
        animate(progressValue, m, { duration: 0.7, ease: "circOut" });
        
        // Eyes track slightly up as progress increases
        eyesControls.start({
          y: -2 - (m * 0.05),
          transition: { duration: 0.3 }
        });
        
        await new Promise(r => setTimeout(r, 850));
        if (!isMounted) return;
      }
      
      setIsDone(true);
      
      // 3. Success! Float beside the card and tilt proudly
      mascotControls.start({
        x: 60,
        y: 10,
        rotate: 12,
        transition: { type: "spring", stiffness: 80, damping: 15 }
      });
      
      // Confident eyes (squint)
      eyesControls.start({
        y: 1,
        x: 5,
        scaleY: 0.7,
        scaleX: 1,
        transition: { duration: 0.4 }
      });
    };
    
    runSequence();
    
    return () => { isMounted = false; };
  }, [mascotControls, eyesControls, progressValue]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-[480px] h-[360px] flex items-center justify-center">
        
        {/* Floating background particles */}
        <motion.div 
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary/40 blur-[1px]" 
        />
        <motion.div 
          animate={{ y: [15, -15, 15], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 h-3 w-3 rounded-full bg-violet-400/40 blur-[2px]" 
        />
        
        {/* THE PROJECT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-64 md:w-72 glass-card rounded-2xl p-6 border border-white/10 shadow-2xl z-10 bg-zinc-950/80"
        >
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/20">
                <FolderKanban className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">Project</span>
                <span className="text-xs font-bold text-white leading-tight">Skynet Web</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">Progress</span>
              <motion.span className="text-xs font-bold text-emerald-400 leading-tight">
                {displayProgress}%
              </motion.span>
            </div>
          </div>
          
          <div className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden mb-5">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full" 
              style={{ width: useTransform(progressValue, v => `${v}%`) }}
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                 <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
              </div>
              <span className="text-[11px] text-zinc-300 font-medium">Design System</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                 <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
              </div>
              <span className="text-[11px] text-zinc-300 font-medium">Authentication</span>
            </div>
            <div className="flex items-center gap-2.5">
              <motion.div 
                animate={{ 
                  backgroundColor: isDone ? "rgba(16, 185, 129, 0.2)" : "rgba(139, 92, 246, 0.2)",
                  scale: isDone ? 1 : [1, 1.1, 1]
                }}
                transition={{ duration: 1.5, repeat: isDone ? 0 : Infinity }}
                className="h-4 w-4 rounded-full flex items-center justify-center"
              >
                 {isDone ? (
                   <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                 ) : (
                   <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                 )}
              </motion.div>
              <span className="text-[11px] text-zinc-300 font-medium">Dashboard UI</span>
            </div>
          </div>
        </motion.div>
        
        {/* THE ZEKO MASCOT */}
        <motion.div 
          animate={mascotControls}
          initial={{ x: -70, y: 0 }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20"
        >
          {/* Floating breathing animation */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Mascot Body */}
            <div className="w-28 h-32 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 border border-white/10 shadow-[inset_0_4px_10px_rgba(255,255,255,0.1),_0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Internal 3D lighting highlights */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-[2.5rem]" />
              <div className="absolute top-[-20px] left-[-20px] w-20 h-20 bg-primary/40 blur-2xl rounded-full" />
              
              {/* Visor Screen */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-20 h-11 rounded-2xl bg-zinc-950 border border-black/50 overflow-hidden shadow-[inset_0_6px_16px_rgba(0,0,0,0.9),_0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
                {/* Screen reflection */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none" />
                
                {/* Eyes */}
                <motion.div animate={eyesControls} className="flex gap-3">
                  <motion.div
                    animate={{ scaleY: [1, 0.05, 1, 1, 1, 1, 1, 1, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 1], ease: "easeInOut" }}
                    className="flex gap-3"
                  >
                    <div className="w-3.5 h-4 rounded-full bg-primary shadow-[0_0_12px_rgba(139,92,246,0.9)]" />
                    <div className="w-3.5 h-4 rounded-full bg-primary shadow-[0_0_12px_rgba(139,92,246,0.9)]" />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* ZekoPortal Identity Emblem */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 border border-primary/20 text-primary/80 font-bold text-[10px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
                  Z
                </div>
              </div>
            </div>
            
          </motion.div>
          
          {/* Shadow beneath mascot */}
          <motion.div 
            animate={{ scale: [1, 0.9, 1], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full blur-sm"
          />
        </motion.div>
        
      </div>
    </div>
  );
}
