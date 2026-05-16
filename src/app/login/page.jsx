"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      // Fixed: Directly using email and password from destructured object
      const { data, error } = await authClient.signIn.email({
        email,
        password
      });

      if (data) {
        toast.success("Login successful! Welcome back.", {
          position: "top-right",
          autoClose: 1500,
          theme: "light",
        });
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }

      if (error) {
        toast.error(error?.message || "Invalid email or password", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa] p-4 font-sans">
      <ToastContainer stacked />
      
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 mt-1 text-md">Login to continue your journey</p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          
          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineMail className="text-gray-400 text-xl" />
              </div>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md bg-[#fcfcfc] text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <Link href="/forgot-password" intrinsic="true" className="text-xs text-cyan-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineLockClosed className="text-gray-400 text-xl" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter password"
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-md bg-[#fcfcfc] text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <HiOutlineEyeOff className="text-xl" /> : <HiOutlineEye className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#17a2b8] hover:bg-[#138496] disabled:bg-gray-400 text-white font-medium py-2.5 rounded-md transition-colors mt-2 text-sm shadow-sm"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-[11px] font-medium text-gray-400 uppercase">Or login with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-medium py-2.5 rounded-md transition-all text-sm shadow-sm"
          >
            <FcGoogle className="text-lg" />
            Sign In With Google
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#17a2b8] font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;