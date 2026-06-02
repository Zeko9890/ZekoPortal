"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Sparkles, Check, Key, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sarah@skynetsolutions.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-zinc-950 text-white overflow-hidden relative">
      {/* Background Decorative Lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      {/* Left Panel: Form */}
      <div className="w-full lg:w-[48%] flex flex-col justify-between p-6 md:p-12 relative z-10">
        {/* Brand Header */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20">
            Z
          </div>
          <span className="font-bold tracking-tight text-base">
            Zeko<span className="text-primary">Portal</span>
          </span>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto my-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your client dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> Email Address
                </label>
                <Input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-10"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="h-3 w-3" /> Password
                  </label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-900/60 border-border/80 h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="rounded border-zinc-800 bg-zinc-900 text-primary focus:ring-primary h-4 w-4 accent-primary"
                />
                <label
                  htmlFor="remember"
                  className="text-xs font-medium text-muted-foreground select-none cursor-pointer hover:text-white transition-colors"
                >
                  Keep me logged in for 30 days
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-10 mt-2 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Access Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border/60"></div>
              <span className="flex-shrink mx-4 text-[10px] text-muted-foreground uppercase tracking-widest">Or enter with</span>
              <div className="flex-grow border-t border-border/60"></div>
            </div>

            {/* SSO / OAuth */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="h-9.5 text-xs font-semibold hover:bg-zinc-900 border-border/60"
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="h-9.5 text-xs font-semibold hover:bg-zinc-900 border-border/60"
              >
                Single Sign-On (SSO)
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-semibold">
            Create account
          </Link>
        </div>
      </div>

      {/* Right Panel: Branding Illustration (hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:w-[52%] bg-zinc-900/40 border-l border-border relative flex-col justify-between p-12 overflow-hidden">
        {/* Abstract dot/grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-45 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none animate-pulse-slow" />

        {/* Floating cards simulation */}
        <div className="my-auto relative max-w-lg mx-auto flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-xl p-5 border border-white/10 shadow-2xl relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Project Active</span>
              </div>
              <span className="text-[10px] text-muted-foreground">June Delivery</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">Skynet Web Platform Redesign</h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Overall Progress</span>
              <span className="font-semibold text-white">68%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[68%]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card rounded-xl p-5 border border-white/10 shadow-2xl relative ml-8 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Milestone Achieved</h4>
                <p className="text-[10px] text-muted-foreground">Frontend Component Architecture completed</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom review quote */}
        <div className="relative z-10 max-w-md mx-auto">
          <p className="text-sm text-zinc-300 italic leading-relaxed">
            &ldquo;Using ZekoPortal allowed us to stay synced with Zeko Labs on our timeline and assets daily. Overhauling Skynet platforms was seamless.&rdquo;
          </p>
          <div className="flex items-center gap-2.5 mt-3">
            <div className="h-6 w-6 rounded-full bg-zinc-800 border border-border/80 flex items-center justify-center font-bold text-[9px] text-white">SC</div>
            <div>
              <p className="text-xs font-bold text-white">Sarah Connor</p>
              <p className="text-[9px] text-muted-foreground">Product Director, Skynet Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
