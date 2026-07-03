"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[400px] bg-white/5 p-8 rounded-3xl border border-white/10">
        <h1 className="text-3xl font-bold mb-6">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl bg-white/5"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-6 rounded-xl bg-white/5"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full py-4 rounded-xl bg-purple-500"
        >
          Login
        </button>
      </div>
    </div>
  );
}