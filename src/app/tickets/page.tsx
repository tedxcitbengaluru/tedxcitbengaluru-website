"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Header from "@/components/layout/header";
import QRCode from 'react-qr-code';

interface TeamMember {
  name: string;
  email: string;
  phoneNo: string;
  usn: string;
  workStudy: string;
  workStudyCustom: string;
  department: string;
  semester: string;
  findUs: string;
  findUsCustom: string;
  idea: string; 
}

export default function TicketingPage() {
  const router = useRouter();

  const [baseTicketId, setBaseTicketId] = useState<string>("ARC-LOADING");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setBaseTicketId(`ARC-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsMounted(true);
  }, []);

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [ticketType, setTicketType] = useState<string>("Solo Access");
  const [ticketPrice, setTicketPrice] = useState<number>(599); 
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formData, setFormData] = useState({
    paymentType: 'upi', 
    upiTransactionId: '',
    paymentScreenshot: '',
    paymentScreenshotName: '',
  });

  const createEmptyMember = (isEarly: boolean = true): TeamMember => ({
    name: '', email: '', phoneNo: '', usn: '', 
    workStudy: isEarly ? 'College' : '', 
    workStudyCustom: '', department: '', semester: '', findUs: '', findUsCustom: '',
    idea: '' 
  });
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([createEmptyMember(true)]);
  
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  // --- 3D Physics (Framer Motion) ---
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, 1], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [0, 1], ["-15deg", "15deg"]);
  const glareX = useTransform(springX, [0, 1], ["-100%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["-100%", "100%"]);
  const glareOpacity = useTransform(springX, [0, 1], [0, 0.15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleTicketTypeChange = (selectedType: string) => {
    setTicketType(selectedType);
    let price = 399;
    let count = 1;

    if (selectedType === 'Solo Access') {
      price = 599;
      count = 1;
    } else if (selectedType === 'Group of 3') {
      price = 1497;
      count = 3;
    } else if (selectedType === 'Group of 5') {
      price = 2245;
      count = 5;
    } else if (selectedType === 'Group of 8') {
      price = 3352;
      count = 8;
    }
    
    setTicketPrice(price);
    
    const isStudentTier = selectedType !== 'Solo Access';
    setTeamMembers(Array.from({ length: count }, () => createEmptyMember(isStudentTier)));
    setCurrentBadgeIndex(0);
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    
    if (field === 'workStudy') {
      newTeamMembers[index].department = '';
      newTeamMembers[index].semester = '';
      newTeamMembers[index].usn = '';
      newTeamMembers[index].workStudyCustom = '';
    }
    if (field === 'findUs' && value !== 'other') newTeamMembers[index].findUsCustom = '';

    setTeamMembers(newTeamMembers);
    
    if (currentBadgeIndex !== index) {
      setCurrentBadgeIndex(index);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; 
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
        
        setFormData(prev => ({ 
          ...prev, 
          paymentScreenshot: compressedBase64, 
          paymentScreenshotName: file.name 
        }));
      };
    };
  };

  const initiateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!formData.paymentScreenshot) {
      toast.error('Authentication Error: Payment verification screenshot is missing.');
      const fileInputLabel = document.getElementById('payment-upload-zone');
      if (fileInputLabel) {
        fileInputLabel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fileInputLabel.classList.add('border-red-500', 'bg-red-500/5');
        setTimeout(() => fileInputLabel.classList.remove('border-red-500', 'bg-red-500/5'), 2000);
      }
      return;
    }

    if (form.checkValidity()) {
      setShowConfirmModal(true);
    } else {
      const firstInvalid = form.querySelector(':invalid') as HTMLElement;
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        let fieldName = 'Required field';
        const siblingLabel = firstInvalid.parentElement?.querySelector('label')?.innerText;
        if (siblingLabel) {
          fieldName = siblingLabel.replace(' *', '').replace(/ \(.+\)/, '');
        }
        
        toast.error(`Incomplete credentials: Check the "${fieldName}" field.`);
      } else {
        toast.error('Form contains errors. Please correct the highlighted fields.');
      }
      
      form.reportValidity();
    }
  };

  const executeSubmit = async () => {
    setShowConfirmModal(false);
    setStatus("loading");
    
    const toastId = toast.loading('Encrypting and authenticating your submission...', { duration: 10000 });
    let paymentScreenshotLink = formData.paymentScreenshot;

    if (paymentScreenshotLink) {
      try {
        const response = await fetch('/api/uploadToGoogleDrive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: paymentScreenshotLink.split(',')[1], 
            fileName: formData.upiTransactionId || baseTicketId,
            mimeType: 'image/jpeg',
          }),
        });

        if (response.ok) {
          const { link } = await response.json();
          paymentScreenshotLink = link;
        } else {
          toast.error('Failed to upload payment verification. Storage API Error.', { id: toastId });
          setStatus("idle");
          return;
        }
      } catch (error) {
        toast.error('Network Error: Storage API Unresponsive.', { id: toastId });
        setStatus("idle");
        return;
      }
    }

    const preparedFormData = teamMembers.map((member, index) => ({
      ...member,
      ...formData,
      paymentScreenshot: paymentScreenshotLink,
      ticketType: ticketType,
      ticketId: teamMembers.length > 1 ? `${baseTicketId}-${index + 1}` : baseTicketId,
    }));

    try {
      const sheetResponse = await fetch('/api/submitTicketForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preparedFormData),
      });

      if (sheetResponse.ok) {
        toast.success('Clearance granted. Welcome to ARC 07.', { id: toastId });
        setStatus("success");
      } else {
        const errorData = await sheetResponse.json();
        toast.error(errorData.error || 'Database rejection. Please try again.', { id: toastId });
        setStatus("idle");
      }
    } catch (error) {
      toast.error('Critical systems error during data submission.', { id: toastId });
      setStatus("idle");
    }
  };

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center text-[#E62B1E] animate-pulse font-mono tracking-widest text-sm">
        INITIALIZING PROTOCOLS...
      </main>
    );
  }

  const isEarlyBird = ticketType === 'Early Bird' || ticketType === 'Group of 3' || ticketType === 'Group of 5' || ticketType === 'Group of 8';
  const isSoloAccess = ticketType === 'Solo Access';
  
  const currentMember = teamMembers[currentBadgeIndex];
  const currentBadgeId = teamMembers.length > 1 ? `${baseTicketId}-${currentBadgeIndex + 1}` : baseTicketId;

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center pt-24 pb-32 px-4 md:px-6 relative overflow-hidden">
      
      <div className="fixed top-0 left-0 w-full z-50 text-white">
        <Header />
      </div>

      <Toaster position="bottom-right" richColors theme="dark" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#E62B1E] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-12 items-start justify-between">
        
        {/* LEFT: FORM SECTION */}
        <div className="w-full lg:w-[55%] space-y-12 z-20">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-6 bg-[#E62B1E]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E62B1E]">ARC 07 • 2026</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
              Initialize Clearance.
            </h1>
            <h3 className="text-gray-400">
              Please fill out the form only after successfully completing your payment.
            </h3>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 p-5 rounded-xl bg-[#E62B1E]/5 border border-[#E62B1E]/30 text-center backdrop-blur-sm"
            >
              <p className="text-lg font-bold tracking-wide text-[#E62B1E] mb-1">
                ARC 07 ignites on
              </p>
              <p className="text-2xl lg:text-3xl font-black text-white tracking-tighter">
                27th March 2026
              </p>
              <p className="text-sm text-gray-300 mt-2">
                11:00 AM onwards @ Cambridge Institute of Technology, KR Puram.
              </p>
              <p className="text-xs text-gray-500 mt-3 font-mono">
                Few will be in the room. Make sure you are one of them.
              </p>
            </motion.div>
          </div>

          {status === "success" ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-16 flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#E62B1E]/10 flex items-center justify-center mb-6 border border-[#E62B1E]/30 shadow-[0_0_30px_rgba(230,43,30,0.2)]">
                <svg className="w-5 h-5 text-[#E62B1E]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome to ARC 07</h2>
              <p className="text-gray-400 text-sm">We have received your details. Please look into your registered email for your virtual ID card.</p>
            </motion.div>
          ) : (
            <form onSubmit={initiateSubmit} noValidate className="space-y-10">
              
              {/* TIER SELECTION */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 ml-1">Select Access Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'Early Bird', title: 'Early Bird', price: '₹399', desc: 'Sold Out', highlight: false, locked: true },
                    { id: 'Solo Access', title: 'Solo Access', price: '₹599', desc: 'Alumni, Faculty, & Other Orgs', highlight: true, locked: false },
                    { id: 'Group of 3', title: 'Squad (Group of 3)', price: '₹1497', perhead: '499 per head', math: '₹599 × 3', oldPrice: '₹1797', save: '₹300', desc: 'Discounted Group Price', highlight: true, locked: false },
                    { id: 'Group of 5', title: 'Legion (Group of 5)', price: '₹2245', perhead: '449 per head', math: '₹599 × 5', oldPrice: '₹2995', save: '₹750', desc: 'Discounted Legion Price', highlight: true, locked: false },
                    { id: 'Group of 8', title: 'Battalion (Group of 8)', price: '₹3352', perhead: '419 per head', math: '₹599 × 8', oldPrice: '₹4792', save: '₹1440', desc: 'Discounted Battalion Price', highlight: true, locked: false },
                  ].map((tier) => {
                    const isSelected = ticketType === tier.id;

                    return (
                      <label 
                        key={tier.id}
                        className={`block p-5 rounded-xl border relative overflow-hidden transition-all duration-300 group flex flex-col
                          ${tier.locked ? 'border-white/5 bg-white/[0.01] opacity-50 cursor-not-allowed' : 
                            isSelected ? 'border-[#E62B1E] bg-[#E62B1E]/5 shadow-[0_0_20px_rgba(230,43,30,0.1)] cursor-pointer' : 
                            'border-white/10 hover:border-white/30 bg-white/[0.03] cursor-pointer'}
                        `}
                      >
                        <input 
                          type="radio" 
                          name="tier" 
                          value={tier.id} 
                          className="hidden" 
                          disabled={tier.locked}
                          onChange={() => handleTicketTypeChange(tier.id)} 
                          checked={isSelected} 
                        />
                        <div className="flex flex-col relative z-10 h-full justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-3">
                              <h3 className="text-base font-bold text-white tracking-wide flex flex-wrap items-center gap-2">
                                {tier.title} 
                                {tier.highlight && <span className="text-[9px] bg-[#E62B1E] text-white px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse whitespace-nowrap">Live</span>}
                                {tier.locked && <span className="text-[9px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap">Locked</span>}
                              </h3>
                              <div className="text-right">
  <span className={`text-xl font-black block ${isSelected ? 'text-[#E62B1E]' : 'text-white'}`}>
    {tier.price}
  </span>

  {tier.perhead && (
    <span className="text-[11px] text-green-400 font-medium tracking-wide">
      {tier.perhead}
    </span>
  )}
</div>
                            </div>
                            <p className={`text-xs mt-1 transition-colors ${tier.highlight ? 'text-[#E62B1E]/80 font-medium' : 'text-gray-500'}`}>
                              {tier.desc}
                            </p>
                          </div>

                          {tier.oldPrice && (
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs font-mono">
                                <span className="text-gray-400">{tier.math}</span>
                                <span className="text-gray-600">=</span>
                                <span className="text-gray-500 line-through decoration-[#E62B1E] decoration-2">{tier.oldPrice}</span>
                              </div>
                              <div className="text-[9px] uppercase tracking-widest text-[#E62B1E] font-bold bg-[#E62B1E]/10 border border-[#E62B1E]/20 px-2 py-1 rounded-sm">
                                Save {tier.save}
                              </div>
                            </div>
                          )}
                        </div>
                        {isSelected && !tier.locked && <div className="absolute inset-0 bg-gradient-to-r from-[#E62B1E]/10 to-transparent opacity-50 pointer-events-none" />}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* GROUP ASSISTANCE */}
              {(ticketType === 'Group of 3' || ticketType === 'Group of 5' || ticketType === 'Group of 8') && (
                <div className="bg-gradient-to-r from-[#E62B1E]/5 to-transparent border border-[#E62B1E]/20 rounded-xl p-6 text-center md:text-left">
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    <span className="font-semibold text-[#E62B1E]">Still forming your squad?</span><br />
                    If you don't have a complete group of {ticketType === 'Group of 3' ? '3' : ticketType === 'Group of 5' ? '5' : '8'} yet, feel free to reach out — we'll gladly help connect you with other participants.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-400">Faisal:</span>{' '}
                      <a href="tel:9608953402" className="text-[#E62B1E] hover:underline font-mono">9608953402</a>
                    </div>
                    <div>
                      <span className="text-gray-400">Shreya:</span>{' '}
                      <a href="tel:9324477810" className="text-[#E62B1E] hover:underline font-mono">9324477810</a>
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC TEAM MEMBER INPUTS */}
              <div className="space-y-8">
                {teamMembers.map((member, index) => {
                  let idLabel = "ID Number";
                  let idPattern = undefined;
                  let idError = "Please enter a valid ID.";

                  if (isEarlyBird) {
                    if (member.department === 'Degree Block') idLabel = "Roll Number";
                    else if (member.department === 'PU College') idLabel = "PU Roll Number";
                    else {
                      idLabel = "USN";
                      idPattern = "^[1-9][a-zA-Z]{2}(22|23|24|25)[a-zA-Z]{2}[0-9]{3}$";
                      idError = "Denied: Only CIT Batches 22, 23, 24, and 25 eligible. Others use Solo Access.";
                    }
                  } else if (isSoloAccess) {
                    if (member.workStudy === 'Alumni') idLabel = "Former USN / Roll Number";
                    else if (member.workStudy === 'Faculty') idLabel = "Faculty ID";
                  }

                  return (
                    <div 
                      key={index} 
                      className={`space-y-6 bg-white/[0.01] p-6 md:p-8 rounded-2xl border transition-colors duration-500 relative
                        ${currentBadgeIndex === index ? 'border-[#E62B1E]/30 shadow-[0_0_30px_rgba(230,43,30,0.05)]' : 'border-white/5'}
                      `}
                      onClick={() => setCurrentBadgeIndex(index)}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E62B1E]/20 text-[#E62B1E] text-xs font-bold border border-[#E62B1E]/30">
                            {index + 1}
                          </span>
                          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-300">
                            Identity Data {teamMembers.length > 1 && `(Node ${index + 1})`}
                          </h3>
                        </div>
                        {currentBadgeIndex === index && teamMembers.length > 1 && (
                          <span className="text-[9px] uppercase tracking-widest text-[#E62B1E] font-bold animate-pulse flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#E62B1E]" />
                            Active on Badge
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                        <div className="relative group md:col-span-2">
                          <input type="text" required minLength={2} placeholder=" " value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                            className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 pt-7 pb-3 text-base font-medium text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                          <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Full Legal Name</label>
                        </div>
                        
                        <div className="relative group">
                          <input type="email" required pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" placeholder=" " value={member.email} onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                            className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 pt-7 pb-3 text-base font-medium text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                          <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Email Address</label>
                          <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity leading-tight max-w-[95%]">Please enter a valid email address</p>
                        </div>

                        <div className="relative group">
                          <input type="tel" required pattern="^\d{10}$" placeholder=" " value={member.phoneNo} onChange={(e) => handleTeamMemberChange(index, 'phoneNo', e.target.value)}
                            className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 pt-7 pb-3 text-base font-medium text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                          <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Phone (10 Digits)</label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 pt-2">
                        <div className="flex flex-col relative group">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Current Base</label>
                          {isEarlyBird ? (
                            <select required disabled value="College" className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-400 opacity-80 cursor-not-allowed appearance-none">
                              <option value="College">Student</option>
                            </select>
                          ) : (
                            <select required value={member.workStudy} onChange={(e) => handleTeamMemberChange(index, 'workStudy', e.target.value)}
                              className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none invalid:border-red-500/50 transition-all duration-300 appearance-none">
                              <option value="" disabled className="bg-[#111]">Select Base</option>
                              <option value="Alumni" className="bg-[#111]">CIT Alumni</option>
                              <option value="Faculty" className="bg-[#111]">CIT Faculty</option>
                              <option value="other" className="bg-[#111]">Other Organization</option>
                            </select>
                          )}
                        </div>

                        {isEarlyBird ? (
                          <div className="flex flex-col relative group">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Department</label>
                            <select required value={member.department} onChange={(e) => handleTeamMemberChange(index, 'department', e.target.value)}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none invalid:border-red-500/50 transition-all duration-300 appearance-none">
                              <option value="" disabled className="bg-[#111]">Select...</option>
                              <option value="CSE" className="bg-[#111]">CSE</option>
                              <option value="ISE" className="bg-[#111]">ISE</option>
                              <option value="AIML" className="bg-[#111]">AIML</option>
                              <option value="CS IOT" className="bg-[#111]">CS IOT</option>
                              <option value="CS DS" className="bg-[#111]">CS DS</option>
                              <option value="ECE" className="bg-[#111]">ECE</option>
                              <option value="EEE" className="bg-[#111]">EEE</option>
                              <option value="ME/CV" className="bg-[#111]">ME/CV</option>
                              <option value="MCA" className="bg-[#111]">MCA</option>
                              <option value="Degree Block" className="bg-[#111]">Degree Block</option>
                              <option value="PU College" className="bg-[#111]">PU College</option>
                            </select>
                          </div>
                        ) : isSoloAccess && member.workStudy === 'other' ? (
                          <div className="relative group self-end">
                            <input type="text" required minLength={2} placeholder=" " value={member.workStudyCustom} onChange={(e) => handleTeamMemberChange(index, 'workStudyCustom', e.target.value)}
                              className="peer w-full bg-white/[0.03] border border-[#E62B1E]/50 rounded-xl px-5 pt-7 pb-3 text-sm font-medium text-white focus:border-[#E62B1E] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                            <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Specify Organization</label>
                          </div>
                        ) : isSoloAccess && (member.workStudy === 'Alumni' || member.workStudy === 'Faculty') ? (
                          <div className="flex flex-col relative group">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Department</label>
                            <select required value={member.department} onChange={(e) => handleTeamMemberChange(index, 'department', e.target.value)}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none invalid:border-red-500/50 transition-all duration-300 appearance-none">
                              <option value="" disabled className="bg-[#111]">Select...</option>
                              <option value="CSE" className="bg-[#111]">CSE</option>
                              <option value="ISE" className="bg-[#111]">ISE</option>
                              <option value="AIML" className="bg-[#111]">AIML</option>
                              <option value="CS IOT" className="bg-[#111]">CS IOT</option>
                              <option value="CS DS" className="bg-[#111]">CS DS</option>
                              <option value="ECE" className="bg-[#111]">ECE</option>
                              <option value="EEE" className="bg-[#111]">EEE</option>
                              <option value="ME/CV" className="bg-[#111]">ME/CV</option>
                              <option value="MCA" className="bg-[#111]">MCA</option>
                              <option value="Degree Block" className="bg-[#111]">Degree Block</option>
                              <option value="PU College" className="bg-[#111]">PU College</option>
                            </select>
                          </div>
                        ) : null}
                      </div>

                      {(isEarlyBird || (isSoloAccess && (member.workStudy === 'Alumni' || member.workStudy === 'Faculty'))) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 pt-2">
                          {isEarlyBird && (
                            <div className="flex flex-col relative group">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Semester</label>
                              <select required value={member.semester} onChange={(e) => handleTeamMemberChange(index, 'semester', e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none invalid:border-red-500/50 transition-all duration-300 appearance-none">
                                <option value="" disabled className="bg-[#111]">Select...</option>
                                {['1','2','3','4','5','6','7','8'].map(sem => <option key={sem} value={sem} className="bg-[#111]">{sem}</option>)}
                              </select>
                            </div>
                          )}

                          {member.department && (
                            <div className={`relative group ${isSoloAccess ? 'md:col-span-2' : ''}`}>
                              <input type="text" required minLength={5} pattern={idPattern} placeholder=" " value={member.usn} onChange={(e) => handleTeamMemberChange(index, 'usn', e.target.value)}
                                className="peer w-full bg-white/[0.03] border border-[#E62B1E]/30 rounded-xl px-5 pt-7 pb-3 text-base font-mono uppercase text-white focus:border-[#E62B1E] focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                              <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">{idLabel}</label>
                              <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity leading-tight break-words max-w-[95%]">{idError}</p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* THE CORE PROMPT - IDEA SECTION (RESTORED) */}
                      <div className="pt-6 border-t border-white/5 relative group">
                        <label className="block text-xs uppercase tracking-widest text-[#E62B1E] mb-3 font-semibold">
                          The Core Prompt
                        </label>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          If you could share one idea with the world, what would it be?
                        </p>
                        <div className="relative">
                          <input 
                            type="text"
                            required 
                            maxLength={60} 
                            placeholder="Your idea..." 
                            value={member.idea || ""} 
                            onChange={(e) => handleTeamMemberChange(index, 'idea', e.target.value)}
                            className="peer w-full bg-white/[0.02] border-b-2 border-white/10 px-4 py-4 text-base font-serif italic text-white placeholder:text-gray-600 focus:border-[#E62B1E] focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" 
                          />
                          <div className={`absolute right-0 -bottom-6 text-[10px] font-mono tracking-widest transition-colors ${member.idea?.length === 60 ? 'text-[#E62B1E]' : 'text-gray-600'}`}>
                            {member.idea?.length || 0}/60
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 pt-2">
                        <div className="flex flex-col relative group">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Origin Node</label>
                          <select required value={member.findUs} onChange={(e) => handleTeamMemberChange(index, 'findUs', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none invalid:border-red-500/50 transition-all duration-300 appearance-none">
                            <option value="" disabled className="bg-[#111]">How did you find us?</option>
                            <option value="College" className="bg-[#111]">College Campus</option>
                            <option value="Social Media" className="bg-[#111]">Social Media</option>
                            <option value="Friends" className="bg-[#111]">Friends / Word of Mouth</option>
                            <option value="other" className="bg-[#111]">Other</option>
                          </select>
                        </div>
                        {member.findUs === 'other' && (
                          <div className="relative group self-end">
                            <input type="text" required minLength={2} placeholder=" " value={member.findUsCustom} onChange={(e) => handleTeamMemberChange(index, 'findUsCustom', e.target.value)}
                              className="peer w-full bg-white/[0.03] border border-[#E62B1E]/50 rounded-xl px-5 pt-7 pb-3 text-sm font-medium text-white focus:border-[#E62B1E] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                            <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Specify Node</label>
                            <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Please specify origin.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PAYMENT SECTION */}
              <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-3">
                      Cryptographic Payment <span className="text-xs px-3 py-1 rounded-full bg-[#E62B1E]/20 text-[#E62B1E] font-mono border border-[#E62B1E]/30">Total: ₹{ticketPrice}</span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Scan to authorize deployment.</p>
                  </div>
                  <div className="px-4 py-2 bg-[#E62B1E]/10 border border-[#E62B1E]/30 rounded-lg text-[#E62B1E] text-xs font-bold tracking-widest uppercase">
                    UPI Verified
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-black/40 p-6 rounded-xl border border-white/5">
                  <div className="shrink-0 text-center">
                    <div className="w-60 h-60 bg-white p-2 rounded-lg mx-auto overflow-hidden">
                      <img src="/images/qr.jpeg" alt="UPI QR Code" className="w-full h-full object-cover rounded" />
                    </div>
                    <p className="font-mono text-xl text-gray-400 mt-3 select-all bg-white/5 py-1 px-2 rounded">aaronrohanraj7@okicici</p>
                  </div>
                  
                  <div className="w-full space-y-6">
                    <div className="relative group">
                      <input type="text" required pattern="^\d{12}$" placeholder=" " value={formData.upiTransactionId} onChange={(e) => setFormData({...formData, upiTransactionId: e.target.value})}
                        className="peer w-full bg-white/[0.05] border border-white/20 rounded-xl px-5 pt-7 pb-3 text-base font-mono text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.08] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                      <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">UPI Transaction ID (12 Digits)</label>
                      <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Must be exactly 12 numeric digits.</p>
                    </div>
                    
                    <label id="payment-upload-zone" className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 mt-2 ${formData.paymentScreenshot ? 'border-green-500/50 bg-green-500/5' : 'border-white/20 hover:border-[#E62B1E]/50 bg-white/[0.02] hover:bg-white/[0.05]'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className={`w-6 h-6 mb-2 ${formData.paymentScreenshot ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        <p className="text-xs text-gray-400 font-mono">
                          {formData.paymentScreenshotName ? <span className="text-green-400 font-bold">{formData.paymentScreenshotName}</span> : "Attach Payment Verification (Image)"}
                        </p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-16 rounded-xl bg-[#E62B1E] text-white font-bold uppercase tracking-[0.3em] text-sm hover:bg-[#ff3526] hover:shadow-[0_0_40px_rgba(230,43,30,0.4)] transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none"
              >
                {status === "loading" ? "Processing..." : "Deploy Payload & Finalize"}
              </button>
            </form>
          )}

          {/* SUPPORT SECTION */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 text-center">For any queries or issues, contact</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div className="text-center">
                <p className="text-xl font-bold text-white tracking-wide">Aaron Rohan</p>
                <a href="tel:8660689239" className="text-xs font-mono text-[#E62B1E] hover:text-red-400 transition-colors mt-1 block">8660689239</a>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <p className="text-xl font-bold text-white tracking-wide">Faisal</p>
                <a href="tel:9608953402" className="text-xs font-mono text-[#E62B1E] hover:text-red-400 transition-colors mt-1 block">9608953402</a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: 3D HOLOGRAPHIC BADGE */}
        <div className="w-full lg:w-[40%] flex flex-col items-center justify-start pt-8 sticky top-24">
          
          {teamMembers.length > 1 && (
            <div className="mb-8 flex items-center justify-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              <button 
                onClick={() => setCurrentBadgeIndex(prev => Math.max(0, prev - 1))}
                disabled={currentBadgeIndex === 0}
                className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-[#E62B1E]/20 hover:border-[#E62B1E]/50 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="flex gap-2 flex-wrap max-w-[200px] justify-center">
                {teamMembers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentBadgeIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentBadgeIndex === idx ? 'w-6 bg-[#E62B1E]' : 'bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setCurrentBadgeIndex(prev => Math.min(teamMembers.length - 1, prev + 1))}
                disabled={currentBadgeIndex === teamMembers.length - 1}
                className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-[#E62B1E]/20 hover:border-[#E62B1E]/50 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          <div 
            className="w-full max-w-[400px] relative cursor-grab active:cursor-grabbing [perspective:1200px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <svg width="100%" height="160" viewBox="0 0 340 160" className="mx-auto relative z-0 drop-shadow-2xl">
              <defs>
                <path id="leftStrap" d="M 120 -20 Q 60 80 155 150" />
                <path id="rightStrap" d="M 220 -20 Q 280 80 185 150" />
              </defs>
              <path d="M 120 -20 Q 60 80 155 150" stroke="#111" strokeWidth="32" fill="none" strokeLinecap="round" />
              <path d="M 220 -20 Q 280 80 185 150" stroke="#111" strokeWidth="32" fill="none" strokeLinecap="round" />
              <path d="M 120 -20 Q 60 80 155 150" stroke="#E62B1E" strokeWidth="3" strokeOpacity="0.4" fill="none" />
              <path d="M 220 -20 Q 280 80 185 150" stroke="#E62B1E" strokeWidth="3" strokeOpacity="0.4" fill="none" />
              <text fontSize="9" fill="#555" fontWeight="bold" letterSpacing="2" className="select-none pointer-events-none">
                <textPath href="#leftStrap" startOffset="10%">TEDxCITBengaluru • ARC 07 • TEDxCITBengaluru</textPath>
              </text>
              <text fontSize="9" fill="#555" fontWeight="bold" letterSpacing="2" className="select-none pointer-events-none">
                <textPath href="#rightStrap" startOffset="15%">ARC 07 • TEDxCITBengaluru • ARC 07</textPath>
              </text>
              <rect x="145" y="4" width="50" height="26" rx="4" fill="url(#metalGrad)" stroke="#333" strokeWidth="1" />
              <rect x="150" y="11" width="40" height="6" rx="2" fill="#111" />
              <circle cx="170" cy="148" r="16" stroke="url(#metalGrad)" strokeWidth="5" fill="none" />
              <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#888" /><stop offset="50%" stopColor="#444" /><stop offset="100%" stopColor="#222" />
              </linearGradient>
            </svg>

            <motion.div 
              className="relative -mt-10 mx-auto w-[340px] h-[520px] [transform-style:preserve-3d]"
              style={{ rotateX, rotateY }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBadgeIndex}
                  initial={{ opacity: 0, x: 50, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -50, rotateY: 10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-none bg-[#0A0A0A] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9),_0_0_60px_rgba(230,43,30,0.15)] overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent"
                    style={{ 
                      opacity: glareOpacity, 
                      x: glareX, 
                      y: glareY, 
                      width: "220%", 
                      height: "220%" 
                    }}
                  />

                  <div className="h-28 bg-gradient-to-b from-[#E62B1E] via-[#C41E14] to-[#991b14] p-6 flex flex-col items-center justify-between relative overflow-hidden">
                    <div className="w-16 h-3 rounded-full bg-[#050505] shadow-inner absolute top-4 z-10" />
                    
                    <div className="absolute top-4 right-4 text-[10px] font-black tracking-[0.2em] bg-black/70 px-3 py-0.5 rounded border border-[#E62B1E]/50 text-[#E62B1E]">
                      {ticketType === 'Group of 8' ? 'Group of 8 ' : ticketType.toUpperCase()}
                    </div>

                    <div className="absolute -right-6 -top-6 text-8xl font-black text-white/10 select-none tracking-[-4px]">ARC</div>

                    <div className="mt-auto w-full flex justify-between items-end">
                      <span className="text-white text-2xl font-black tracking-tighter">TED<sup className="text-sm">x</sup>CITBengaluru</span>
                      <span className="text-white/90 text-xs font-bold tracking-[0.4em] flex items-center gap-2">
                        ARC 07 
                        {ticketType === 'Group of 8' && <span className="text-amber-400">★</span>}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 h-[calc(100%-7rem)] flex flex-col relative">
                    <div className="mb-6">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[#E62B1E] font-bold mb-1">AUTHENTICATED • {teamMembers.length > 1 ? `${currentBadgeIndex + 1}/${teamMembers.length}` : 'SOLO'}</p>
                      <p className="text-3xl font-bold leading-none tracking-tighter text-white line-clamp-2">
                        {currentMember?.name || "GUEST PROTOCOL"}
                      </p>
                    </div>

                    <div className="space-y-6 flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div className={`inline-block px-5 py-2.5 border rounded-none backdrop-blur-sm text-sm font-bold tracking-wider
                          ${ticketType === 'Group of 8' ? 'border-amber-400/70 text-amber-400 bg-amber-400/10' : 'border-white/10 bg-white/5'}`}>
                          {ticketType}
                        </div>
                      </div>

                      {/* PREMIUM IDEA DISPLAY ON BADGE (with restored idea) */}
                      <div className="relative border-l-4 border-[#E62B1E] pl-5 py-2 my-auto">
                        <p className="text-xl leading-tight text-white/80 font-serif italic">
                          “{currentMember?.idea || "An idea waiting to be shared..."}”
                        </p>
                      </div>

                      <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                        <div className="bg-white p-2 rounded shadow-2xl shadow-black/80">
                          <QRCode 
                            value={currentBadgeId} 
                            size={68} 
                            bgColor="#ffffff" 
                            fgColor="#000000" 
                            level="H" 
                          />
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-sm tracking-[1px] text-white/90 font-medium">
                            {currentBadgeId}
                          </div>
                          <div className="text-[10px] text-[#E62B1E] tracking-[0.15em] mt-1 flex items-center justify-end gap-1.5 font-bold">
                            <div className="w-2 h-2 rounded-full bg-[#E62B1E] animate-ping" />
                            LIVE VERIFIED NODE
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="mt-8 text-center text-[10px] uppercase text-gray-600 tracking-[0.3em] pointer-events-none">
            Interact to inspect badge
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirmModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setShowConfirmModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-2xl shadow-2xl z-50"
            >
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Finalize Registration?</h3>
              <p className="text-gray-400 text-sm mb-8">You are about to submit your details and lock in your {ticketType} tier selection. Proceed?</p>
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowConfirmModal(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-white font-bold text-sm tracking-widest hover:bg-white/5 transition-colors">
                  ABORT
                </button>
                <button type="button" onClick={executeSubmit} className="flex-1 py-3 rounded-lg bg-[#E62B1E] text-white font-bold text-sm tracking-widest hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(230,43,30,0.3)]">
                  AUTHORIZE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}