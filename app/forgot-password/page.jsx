"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      alert("Password reset email sent!");
      window.location.href = "/login";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-pink-900">
      <div className="w-full max-w-md p-8 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-2">
          Reset Password
        </h1>

        <p className="text-gray-300 mb-6">
          Enter your email to reset your password
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 rounded-lg bg-transparent border border-gray-500 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
        >
          Send Reset Link →
        </button>

        <p className="text-gray-300 mt-6 text-center">
          Back to{" "}
          <Link href="/login" className="text-pink-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}