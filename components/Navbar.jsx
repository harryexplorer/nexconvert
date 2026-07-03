"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Convert", href: "/convert" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-2xl bg-black/30">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
          >
            <Zap size={22} />
          </motion.div>

          <span className="text-2xl font-bold tracking-tight">
            NexConvert
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, index) => {
            const active = pathname === link.href;

            return (
              <Link
                key={index}
                href={link.href}
                className={`transition font-medium ${
                  active
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-xl bg-red-500 flex items-center gap-2 hover:scale-105 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/10 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium hover:scale-105 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}