"use client";
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "granted" | "denied">("idle");
  const [attendeeData, setAttendeeData] = useState<{name?: string, tier?: string, message?: string}>({});
  
  // New State for Mode Switching and Manual Entry
  const [inputMode, setInputMode] = useState<"camera" | "manual">("camera");
  const [manualId, setManualId] = useState("");

  useEffect(() => {
    // Only mount the camera if we are in camera mode AND the status is idle
    if (status !== "idle" || inputMode !== "camera") return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1 },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);

    function onScanSuccess(decodedText: string) {
      scanner.clear(); // Stop scanning immediately
      setScanResult(decodedText);
      verifyTicket(decodedText);
    }

    function onScanFailure(error: any) {
      // Ignore frame-by-frame scan failures
    }

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [status, inputMode]);

  const verifyTicket = async (ticketId: string) => {
    setStatus("loading");
    
    try {
      const response = await fetch('/api/verifyTicket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("granted");
        setAttendeeData({ name: data.name, tier: data.tier, message: data.message });
      } else {
        setStatus("denied");
        setAttendeeData({ name: data.name, tier: data.tier, message: data.message });
      }
    } catch (error) {
      setStatus("denied");
      setAttendeeData({ message: "Network Error: Could not reach database." });
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualId) return;

    // Smart Format: If they just type "123456", auto-prefix "ARC-"
    let formattedId = manualId.trim().toUpperCase();
    if (!formattedId.startsWith("ARC-")) {
      formattedId = `ARC-${formattedId}`;
    }

    setScanResult(formattedId);
    verifyTicket(formattedId);
  };

  const resetScanner = () => {
    setScanResult(null);
    setAttendeeData({});
    setManualId("");
    setStatus("idle");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E62B1E] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      {/* Main Scanner Card */}
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10 flex flex-col">
        
        {/* HEADER & TABS */}
        <div className="p-6 pb-0 border-b border-white/5 bg-[#111]/50">
          <h1 className="text-2xl font-black tracking-tighter text-center">ARC 07 <span className="text-[#E62B1E]">TERMINAL</span></h1>
          
          {/* Tab Switcher */}
          {status === "idle" && (
            <div className="flex bg-black/40 p-1.5 rounded-xl mt-6 mb-6 border border-white/5">
              <button 
                onClick={() => setInputMode("camera")}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${inputMode === "camera" ? "bg-[#E62B1E] text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
              >
                Camera
              </button>
              <button 
                onClick={() => setInputMode("manual")}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${inputMode === "manual" ? "bg-[#E62B1E] text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
              >
                Manual
              </button>
            </div>
          )}
        </div>

        {/* CONTENT AREA */}
        <div className="relative min-h-[400px] flex flex-col justify-center p-6">
          
          {/* 1. IDLE: CAMERA MODE */}
          {status === "idle" && inputMode === "camera" && (
            <div className="animate-fade-in w-full">
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-inner">
                {/* Tailwind Deep CSS Injection to style the ugly default html5-qrcode elements 
                */}
                <div 
                  id="reader" 
                  className="w-full [&_button]:mt-4 [&_button]:px-6 [&_button]:py-3 [&_button]:bg-[#E62B1E] [&_button]:text-white [&_button]:font-bold [&_button]:rounded-lg [&_button]:uppercase [&_button]:tracking-widest [&_button]:text-xs [&_a]:hidden [&_select]:mt-4 [&_select]:w-full [&_select]:p-3 [&_select]:bg-[#111] [&_select]:text-white [&_select]:border [&_select]:border-white/20 [&_select]:rounded-lg"
                ></div>
              </div>
            </div>
          )}

          {/* 2. IDLE: MANUAL ENTRY MODE */}
          {status === "idle" && inputMode === "manual" && (
            <motion.form 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={handleManualSubmit} 
              className="flex flex-col gap-6"
            >
              <div className="text-center space-y-2 mb-2">
                <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-white">Manual Override</h3>
                <p className="text-xs text-gray-500">Enter the 6-digit numeric ID code.</p>
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-6 font-mono text-gray-500 tracking-widest pointer-events-none">ARC-</span>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="849204"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value.replace(/[^0-9a-zA-Z-]/g, ''))} // Prevent spaces/symbols
                  className="w-full bg-[#111] border border-white/20 rounded-xl py-5 pl-20 pr-6 font-mono text-lg text-white uppercase focus:outline-none focus:border-[#E62B1E] transition-colors shadow-inner"
                />
              </div>

              <button 
                type="submit"
                disabled={!manualId}
                className="w-full py-5 bg-[#E62B1E] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(230,43,30,0.2)]"
              >
                Verify Terminal
              </button>
            </motion.form>
          )}

          {/* 3. LOADING OVERLAY */}
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-[#E62B1E]/30 border-t-[#E62B1E] rounded-full animate-spin mb-6"></div>
              <p className="text-xs tracking-[0.4em] font-bold text-[#E62B1E] uppercase animate-pulse">Contacting Database</p>
              <p className="text-sm text-gray-400 font-mono mt-3">{scanResult}</p>
            </div>
          )}

          {/* 4. RESULT: GRANTED (Dark mode friendly green) */}
          <AnimatePresence mode="wait">
            {status === "granted" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center w-full"
              >
                {/* Ambient Green Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500/20 blur-3xl rounded-full pointer-events-none" />
                
                <div className="relative w-24 h-24 bg-[#0a0a0a] border-2 border-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">CLEAR</h2>
                <p className="text-xl font-bold text-gray-300 mt-4 line-clamp-1">{attendeeData.name?.replace("'", "")}</p>
                <div className="inline-block mt-3 bg-green-500/10 border border-green-500/30 px-4 py-1.5 rounded-md">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-400">{attendeeData.tier}</p>
                </div>
                <p className="text-[10px] text-gray-600 font-mono mt-8">TICKET: {scanResult}</p>
              </motion.div>
            )}

            {/* 5. RESULT: DENIED (Dark mode friendly red) */}
            {status === "denied" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center w-full"
              >
                {/* Ambient Red Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />

                <div className="relative w-24 h-24 bg-[#0a0a0a] border-2 border-[#E62B1E] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(230,43,30,0.3)]">
                  <svg className="w-10 h-10 text-[#E62B1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-[0_0_10px_rgba(230,43,30,0.5)]">DENIED</h2>
                <div className="bg-[#E62B1E]/10 border border-[#E62B1E]/30 p-4 rounded-xl w-full">
                  <p className="text-sm font-bold text-red-400 leading-relaxed">{attendeeData.message}</p>
                </div>
                {attendeeData.name && <p className="text-xs text-gray-500 mt-6 uppercase tracking-widest">Registered to: <span className="text-white font-bold">{attendeeData.name.replace("'", "")}</span></p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM ACTION BUTTON */}
        {status !== "idle" && (
          <div className="p-6 pt-0 bg-[#0A0A0A] border-t border-white/5 relative z-20">
            <button 
              onClick={resetScanner}
              className={`w-full py-5 text-sm font-bold tracking-[0.2em] uppercase rounded-xl transition-all shadow-xl
                ${status === "granted" ? "bg-green-600 hover:bg-green-500 text-white" : ""}
                ${status === "denied" ? "bg-[#E62B1E] hover:bg-red-500 text-white" : ""}
                ${status === "loading" ? "bg-gray-800 text-gray-500 cursor-not-allowed" : ""}
              `}
              disabled={status === "loading"}
            >
              {status === "loading" ? "..." : "Scan Next"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}