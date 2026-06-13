"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Check, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { signInWithGoogle } from "@/lib/google-auth";
import MascotHero from "@/components/auth/MascotHero";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err: any) {
      setError(getAuthErrorMessage(err));
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err: any) {
      setError(getAuthErrorMessage(err));
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-[#09090B] text-white overflow-hidden relative">
      {/* Left Panel: Form */}
      <div className="w-full lg:w-[48%] flex flex-col justify-between p-6 md:p-12 relative z-10">
        {/* Brand Header */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-white font-bold text-sm shadow-none select-none">
            Z
          </div>
          <span className="font-semibold tracking-tight text-base">
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
                <div className="flex items-center gap-2 p-3 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-md">
                  <Shield className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center gap-2 p-3 text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Login successful. Redirecting...</span>
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> Email Address
                </label>
                <Input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#111827] border-[#27272A] h-10 placeholder:text-[#71717A] focus:border-[#3F3F46] focus:ring-0"
                  disabled={isLoading || isSuccess}
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#111827] border-[#27272A] h-10 pr-10 placeholder:text-[#71717A] focus:border-[#3F3F46] focus:ring-0"
                    disabled={isLoading || isSuccess}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-white"
                    disabled={isLoading || isSuccess}
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
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                     Connecting...
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center gap-2">
                     <Check className="h-4 w-4" />
                     Success
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
              <span className="flex-shrink mx-4 text-[10px] text-muted-foreground uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-border/60"></div>
            </div>

            {/* Google Sign-In */}
            <GoogleSignInButton
              isLoading={isGoogleLoading}
              onClick={handleGoogleSignIn}
            />
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

      {/* Right Panel */}
      <div className="hidden lg:flex lg:w-[52%] bg-[#111827] border-l border-[#27272A] relative flex-col justify-between p-12 overflow-hidden">
        {/* Abstract dot/grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-45 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none animate-pulse-slow" />

        {/* Interactive Mascot Hero */}
        <div className="my-auto relative max-w-lg mx-auto w-full h-[400px]">
          <MascotHero />
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
