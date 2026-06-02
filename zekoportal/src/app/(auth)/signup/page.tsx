"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Sparkles, Check, Key, Mail, Lock, User, Building, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import MascotHero from "@/components/auth/MascotHero";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err: any) {
      setError(getAuthErrorMessage(err));
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
        <div className="max-w-md w-full mx-auto my-auto py-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Get started today
              </h1>
              <p className="text-xs text-muted-foreground">
                Create an account to join ZekoPortal and connect with your agency.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-3.5">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-md">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center gap-2 p-3 text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Account created successfully. Redirecting...</span>
                </div>
              )}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <User className="h-3 w-3" /> Full Name
                </label>
                <Input
                  type="text"
                  required
                  placeholder="John Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-9.5 placeholder:text-muted-foreground/50"
                  disabled={isLoading || isSuccess}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> Business Email
                </label>
                <Input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-9.5 placeholder:text-muted-foreground/50"
                  disabled={isLoading || isSuccess}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="h-3 w-3" /> Company Name
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Skynet Solutions"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-9.5 placeholder:text-muted-foreground/50"
                  disabled={isLoading || isSuccess}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="h-3 w-3" /> Choose Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-9.5 placeholder:text-muted-foreground/50"
                  disabled={isLoading || isSuccess}
                />
              </div>

              {/* T&C checkboxes */}
              <div className="flex items-start space-x-2.5 py-1">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  disabled={isLoading || isSuccess}
                  className="rounded border-zinc-800 bg-zinc-900 text-primary focus:ring-primary h-4 w-4 mt-0.5 accent-primary cursor-pointer disabled:opacity-50"
                />
                <label
                  htmlFor="agree"
                  className="text-xs text-muted-foreground select-none cursor-pointer leading-tight"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">Privacy Policy</a>.
                </label>
              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                className="w-full h-10 mt-1 font-semibold"
                disabled={isLoading || isSuccess || !agree}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating Profile...
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Success
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Create Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Log in
          </Link>
        </div>
      </div>

      {/* Right Panel: Branding Illustration (hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:w-[52%] bg-zinc-900/40 border-l border-border relative flex-col justify-between p-12 overflow-hidden">
        {/* Grid and lighting overlays */}
        <div className="absolute inset-0 grid-bg opacity-45 pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none animate-pulse-slow" />

        {/* Interactive Mascot Hero */}
        <div className="my-auto relative max-w-lg mx-auto w-full h-[400px]">
          <MascotHero />
        </div>

        {/* Bottom branding signature */}
        <div className="relative z-10 max-w-md mx-auto text-center border-t border-border/40 pt-4 w-full">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Trusted by modern enterprise client teams worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
