"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Proper typed spring transition (this fixes the TS warning)
const smoothSpring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 0.9,
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "EVENTS", href: "/events" },
    { label: "SPEAKERS", href: "/speakers" },
    { label: "SPONSORS", href: "/sponsors" },
    { label: "CONTACT", href: "/contact" },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
    document.body.style.overflow = "unset";
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Social Orb */}
          <div className="relative z-50">
            <button
              onClick={() => setSocialOpen(!socialOpen)}
              className="p-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white transition-all duration-200 active:scale-95"
              aria-label="Open socials"
            >
              <User size={23} />
            </button>

            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -10 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute top-16 left-0 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 flex flex-col items-center gap-6 shadow-2xl w-[68px]"
                >
                  <button
                    onClick={() => setSocialOpen(false)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <X size={19} />
                  </button>
                  <div className="flex flex-col gap-5">
                    <a href="https://www.instagram.com/tedxcitbengaluru/" className="hover:text-[#E62B1E] transition-colors"><FaInstagram size={23} /></a>
                    <a href="https://www.linkedin.com/company/tedxcitbengaluru/" className="hover:text-[#E62B1E] transition-colors"><FaLinkedinIn size={23} /></a>
                    <a href="https://www.youtube.com/@TEDxCITBengaluru/playlists" className="hover:text-[#E62B1E] transition-colors"><FaYoutube size={23} /></a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center: Logo */}
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer transition-transform hover:scale-[1.04] active:scale-95"
          >
            <img
              src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760616545/TEDxCITBengaluruWomenblack_300x_2_t42vvk.png"
              alt="TEDxCITBengaluru"
              className="h-10 md:h-12"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-9 text-sm font-medium tracking-[0.5px] text-white/90">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-1.5 transition-colors hover:text-white group ${isActive(link.href) ? "text-white" : ""}`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1px] bg-[#E62B1E] transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            <Link
              href="/tickets"
              className="ml-3 px-7 py-2.5 bg-white text-zinc-950 font-semibold text-xs tracking-[1px] rounded-full hover:bg-[#E62B1E] hover:text-white active:scale-[0.97] transition-all duration-200 shadow-sm"
            >
              SECURE YOUR SEAT
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white p-2 -mr-2"
            aria-label="Open menu"
          >
            <Menu size={29} strokeWidth={2.8} />
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={smoothSpring}
              className="fixed top-0 right-0 h-full w-[90%] max-w-[380px] bg-zinc-950 z-50 flex flex-col md:hidden border-l border-white/10"
            >
              <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-white/10">
                <div className="uppercase text-xs tracking-[2px] text-zinc-500 font-medium">Navigation</div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={26} />
                </button>
              </div>

              <nav className="flex-1 px-7 pt-10 flex flex-col gap-y-7 text-4xl font-semibold tracking-tighter">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * index, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-1 transition-colors ${isActive(link.href) ? "text-[#E62B1E]" : "hover:text-white text-white/90"}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-7 pb-12">
                <Link
                  href="/tickets"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-4 text-center bg-white hover:bg-[#E62B1E] hover:text-white text-zinc-950 font-semibold tracking-widest text-sm rounded-2xl transition-all active:scale-[0.985]"
                >
                  SECURE YOUR SEAT
                </Link>
              </div>

              <div className="text-center pb-8 text-zinc-500 text-xs">
                © 2026 TEDxCITBengaluru
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}