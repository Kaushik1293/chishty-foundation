"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, User, KeyRound, UserPlus, LogIn,
} from "lucide-react";
import { createClient } from "@/src/utils/supabase/client";

import whiteLogo from "@/src/assets/images/homepage/white-logo.png";
import star from "@/src/assets/images/homepage/vectors/common/gold-star.svg";

type AuthMode = "login" | "signup" | "forgot";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<AuthMode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle Form Submission for Login / Signup / Reset
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (mode === "forgot") {
      if (!email) {
        setErrorMsg("Please enter your email address.");
        return;
      }
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/asgard/login?type=recovery`,
      });
      setIsLoading(false);

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg(
          "Password reset email sent! Check your inbox for instructions."
        );
      }
      return;
    }

    if (mode === "signup") {
      if (!email || !password || !fullName) {
        setErrorMsg("Please complete all required fields.");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }

      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      setIsLoading(false);

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data.user) {
        // Try inserting into admins table if it exists
        try {
          await supabase.from("admins").insert([
            {
              id: data.user.id,
              email: data.user.email,
            },
          ]);
        } catch {
          // Ignore if admins table has trigger or RLS
        }

        if (data.session) {
          setSuccessMsg(
            "Account created successfully! Redirecting to Asgard CMS..."
          );
          setTimeout(() => {
            router.push("/asgard/dashboard");
            router.refresh();
          }, 800);
        } else {
          setSuccessMsg(
            "Account created! Please check your email to confirm your account before logging in."
          );
        }
      }
      return;
    }

    // Login Flow
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else if (data.session) {
      setSuccessMsg("Authentication successful! Redirecting to Asgard CMS...");
      setTimeout(() => {
        router.push("/asgard/dashboard");
        router.refresh();
      }, 700);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@chishty.org");
    setPassword("asgard2026#demo");
    setErrorMsg("");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-dark-green overflow-hidden select-none">
      {/* Background Decorative Glowing Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-dark-yellow/20 via-dark-green/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rust-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-dark-yellow/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-dark-green/80 backdrop-blur-xl border border-dark-yellow/40 shadow-2xl rounded-3xl overflow-hidden z-10 p-8"
      >
        {/* Top Gold Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-dark-yellow via-[#FFD56C] to-dark-yellow" />

        {/* Brand Header */}
        <div className="text-center space-y-3 mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-dark-yellow to-rust-orange p-0.5 shadow-xl border border-white/20 mb-1"
          >
            <motion.img
              src={star.src || star}
              alt="Chishty Foundation"
              className="w-10 h-10 object-contain"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <h1 className="text-3xl font-bold font-satoshi text-white tracking-wide">
            ASGARD <span className="text-[#FFD56C]">CMS</span>
          </h1>
          <p className="text-xs text-white/70 font-satoshi max-w-xs mx-auto">
            Secure Administrator Portal Access
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        {mode !== "forgot" && (
          <div className="grid grid-cols-2 p-1 mb-6 rounded-xl bg-black/20 border border-white/10 relative">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all z-10 cursor-pointer ${mode === "login" ? "text-dark-green" : "text-white/70 hover:text-white"
                }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all z-10 cursor-pointer ${mode === "signup" ? "text-dark-green" : "text-white/70 hover:text-white"
                }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>

            {/* Sliding Pill */}
            <motion.div
              layoutId="authTabPill"
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-dark-yellow to-[#FFD56C] shadow-md ${mode === "login" ? "left-1" : "left-[calc(50%+2px)]"
                }`}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-satoshi flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs font-satoshi flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4 font-satoshi">
          {/* Full Name Input (Sign Up Mode) */}
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <User className="w-4 h-4 text-dark-yellow" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Syed Chishty"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 focus:border-dark-yellow focus:ring-2 focus:ring-dark-yellow/30 rounded-xl text-white placeholder-white/30 text-sm transition-all outline-none"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
              {mode === "forgot" ? "Account Email" : "Email Address"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <Mail className="w-4 h-4 text-dark-yellow" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@chishty.org"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 focus:border-dark-yellow focus:ring-2 focus:ring-dark-yellow/30 rounded-xl text-white placeholder-white/30 text-sm transition-all outline-none"
              />
            </div>
          </div>

          {/* Password Input (Login & Signup Modes) */}
          {mode !== "forgot" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="text-[11px] text-[#FFD56C] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock className="w-4 h-4 text-dark-yellow" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/15 focus:border-dark-yellow focus:ring-2 focus:ring-dark-yellow/30 rounded-xl text-white placeholder-white/30 text-sm transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password Input (Sign Up Mode) */}
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <KeyRound className="w-4 h-4 text-dark-yellow" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/15 focus:border-dark-yellow focus:ring-2 focus:ring-dark-yellow/30 rounded-xl text-white placeholder-white/30 text-sm transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Back to Sign In Link if in Forgot Password Mode */}
          {mode === "forgot" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="text-[11px] text-[#FFD56C] hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Remember Me Checkbox */}
          {mode === "login" && (
            <div className="flex items-center justify-between text-xs text-white/70 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-dark-yellow focus:ring-dark-yellow"
                />
                <span>Remember this session</span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-dark-yellow to-rust-orange text-white font-semibold text-sm shadow-lg shadow-dark-yellow/20 flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50 cursor-pointer mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === "login"
                    ? "Sign In to Asgard"
                    : mode === "signup"
                      ? "Create Admin Account"
                      : "Send Password Reset Link"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Quick Demo Credentials Fill Button */}
        {mode === "login" && (
          <div className="mt-6 pt-5 border-t border-white/10 text-center space-y-3">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-dark-yellow/30 text-[#FFD56C] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-dark-yellow" />
              <span>Fill Demo Admin Credentials</span>
            </button>

            <p className="text-[11px] text-white/40">
              Chishty Foundation Secure Admin Portal
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
