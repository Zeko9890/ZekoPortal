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
import CollaborationHero from "@/components/auth/CollaborationHero";
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
    <div className="min-h-screen w-screen flex flex-col-reverse lg:flex-row bg-[#FAF8F6] text-[#0F172A] overflow-hidden relative font-sans">
      
      {/* Left Panel: Form */}
      <div className="w-full lg:w-[48%] bg-white flex flex-col justify-between p-6 md:p-12 relative z-10 lg:shadow-[20px_0_60px_rgba(0,0,0,0.03)] border-r border-[#E5E7EB]">
        
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
           {/* Top-left dotted pattern */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
           {/* Bottom-left faint circles */}
           <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border-[1px] border-slate-100/50" />
           <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full border-[1px] border-slate-100/50" />
        </div>

        {/* Brand Header */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0F172A] text-white font-bold text-sm shadow-none select-none">
            Z
          </div>
          <span className="font-semibold tracking-tight text-base text-[#0F172A]">
            ZekoPortal
          </span>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto my-12 lg:my-auto py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-[#0F172A] flex items-center gap-2">
                Welcome back <span className="inline-block origin-bottom-right">👋</span>
              </h1>
              <p className="text-[15px] text-[#64748B]">
                Enter your credentials to access your client dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl">
                  <Shield className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center gap-2 p-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Login successful. Redirecting...</span>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5 ml-1">
                  <Mail className="h-3.5 w-3.5" /> EMAIL ADDRESS
                </label>
                <Input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-[#E5E7EB] h-12 px-4 rounded-xl shadow-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 transition-all"
                  disabled={isLoading || isSuccess}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1 mr-1">
                  <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" /> PASSWORD
                  </label>
                  <a href="#" className="text-[12px] font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors">
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
                    className="bg-white border-[#E5E7EB] h-12 px-4 pr-11 rounded-xl shadow-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 transition-all"
                    disabled={isLoading || isSuccess}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[14px] text-[#94A3B8] hover:text-[#64748B] transition-colors"
                    disabled={isLoading || isSuccess}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center space-x-2.5 py-1 ml-1">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="rounded border-[#CBD5E1] bg-white text-[#3B82F6] focus:ring-[#3B82F6] h-4 w-4 accent-[#3B82F6]"
                />
                <label
                  htmlFor="remember"
                  className="text-[13px] font-medium text-[#64748B] select-none cursor-pointer hover:text-[#0F172A] transition-colors"
                >
                  Keep me logged in for 30 days
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 mt-2 font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl shadow-[0_8px_16px_rgba(59,130,246,0.2)] transition-all hover:shadow-[0_12px_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                     Connecting...
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center gap-2">
                     <Check className="h-4 w-4" />
                     Success
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[15px]">Access Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#E5E7EB]"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-[#E5E7EB]"></div>
            </div>

            {/* Google Sign-In */}
            <GoogleSignInButton
              isLoading={isGoogleLoading}
              onClick={handleGoogleSignIn}
            />
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center text-[13px] text-[#64748B] relative z-10">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#3B82F6] hover:text-[#2563EB] font-semibold transition-colors">
            Sign up
          </Link>
        </div>
      </div>

      {/* Right Panel: Illustration */}
      <div className="flex w-full lg:w-[52%] min-h-[350px] lg:min-h-0 bg-[linear-gradient(135deg,#FFFBF8_0%,#FFF0E5_50%,#FFEBE0_100%)] relative flex-col justify-center lg:justify-between p-0 lg:p-12 overflow-hidden transition-colors duration-300">
        
        {/* Interactive Collaboration Hero */}
        <div className="my-auto relative max-w-[600px] mx-auto w-full h-[400px] lg:h-[600px] flex items-center justify-center scale-75 sm:scale-90 lg:scale-100">
          <CollaborationHero />
        </div>
      </div>
    </div>
  );
}
