"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineMail, HiOutlinePhotograph, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify"; // toast import যোগ করা হয়েছে
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";



const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
   const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
console.log(user);
    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image
      });

      if (data) {
        toast.success("Account created successfully!");
router.push('/')      
      }

      if (error) {
        toast.error(error?.message || "Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error(err);
    }
  }; 

  const handleGoogleSignin = async()=>{
    await authClient.signIn.social({
 provider:"google"
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa] p-4 font-sans">
      <ToastContainer />
      
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        <p className="text-gray-500 mt-1 text-md">Start your adventure with Wanderlust</p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineUser className="text-gray-400 text-xl" />
              </div>
              <input
                name="name" 
                type="text"
                placeholder="Enter your name"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md bg-[#fcfcfc] text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          {/* Email Address Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineMail className="text-gray-400 text-xl" />
              </div>
              <input
                name="email" 
                type="email"
                placeholder="Enter your email"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md bg-[#fcfcfc] text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          {/* Image URL Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Profile Image URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlinePhotograph className="text-gray-400 text-xl" />
              </div>
              <input
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md bg-[#fcfcfc] text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineLockClosed className="text-gray-400 text-xl" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-md bg-[#fcfcfc] text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
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

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-[#17a2b8] hover:bg-[#138496] text-white font-medium py-2.5 rounded-md transition-colors mt-2 text-sm shadow-sm"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-[11px] font-medium text-gray-400 uppercase">Or sign up with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Google Button */}
          <button onClick={handleGoogleSignin}
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-medium py-2.5 rounded-md transition-all text-sm shadow-sm"
          >
            <FcGoogle className="text-lg" />
            Sign Up With Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-[#17a2b8] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
     
      </div>
    </div>
  );
};

export default SignUpPage;