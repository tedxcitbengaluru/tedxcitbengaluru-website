"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
}

export default function TicketingPage() {
  const router = useRouter();

  // --- Core State ---
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isEarlyBird, setIsEarlyBird] = useState(true); // Toggle this to false when Phase 1 ends
  const [ticketType, setTicketType] = useState<string>("Early Bird");
  const [ticketPrice, setTicketPrice] = useState<number>(399);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // --- Payment State ---
  const [formData, setFormData] = useState({
    paymentType: 'upi',
    teamMemberName: '',
    upiTransactionId: '',
    paymentScreenshot: '',
    paymentScreenshotName: '',
  });

  // --- Dynamic Team Array ---
  const createEmptyMember = (): TeamMember => ({
    name: '', email: '', phoneNo: '', usn: '', workStudy: '', workStudyCustom: '', department: '', semester: '', findUs: '', findUsCustom: ''
  });
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([createEmptyMember()]);

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
    let memberCount = 1;
    let price = 399;

    if (selectedType === 'Early Bird') { memberCount = 1; price = 399; }
    else if (selectedType === 'Solo') { memberCount = 1; price = 549; }
    else if (selectedType === 'Group of 3') { memberCount = 3; price = 1497; }
    else if (selectedType === 'Group of 5') { memberCount = 5; price = 2245; }

    setTicketPrice(price);
    setTeamMembers(Array(memberCount).fill(null).map(() => createEmptyMember()));
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    
    // Auto-clear dependent fields
    if (field === 'workStudy' && value !== 'other') newTeamMembers[index].workStudyCustom = '';
    if (field === 'workStudy' && value !== 'College') {
      newTeamMembers[index].department = '';
      newTeamMembers[index].semester = '';
      newTeamMembers[index].usn = '';
    }
    if (field === 'findUs' && value !== 'other') newTeamMembers[index].findUsCustom = '';

    setTeamMembers(newTeamMembers);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, paymentScreenshot: reader.result as string, paymentScreenshotName: file.name }));
      };
    }
  };

  const initiateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      setShowConfirmModal(true);
    } else {
      toast.error('Form contains errors. Please correct the highlighted fields.');
    }
  };

  const executeSubmit = async () => {
    setShowConfirmModal(false);
    setStatus("loading");
    toast.loading('Encrypting and authenticating your submission...');

    // Integrate your real fetch logic here
    setTimeout(() => {
      setStatus("success");
      toast.success('Clearance granted. Welcome to ARK 07.');
      // router.push("/success?source=ticket");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center pt-24 pb-32 px-4 md:px-6 relative overflow-hidden">
      <Toaster position="bottom-right" richColors theme="dark" />
      
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#E62B1E] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-12 items-start justify-between">
        
        {/* --- LEFT: FORM SECTION --- */}
        <div className="w-full lg:w-[55%] space-y-12 z-20">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-6 bg-[#E62B1E]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E62B1E]">ARK 07 • 2026</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
              Initialize Clearance.
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
              Enter exact demographic credentials below to generate your physical ARK 07 badge and proceed to payment.
            </p>
          </div>

          {status === "success" ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-16 flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#E62B1E]/10 flex items-center justify-center mb-6 border border-[#E62B1E]/30 shadow-[0_0_30px_rgba(230,43,30,0.2)]">
                <svg className="w-5 h-5 text-[#E62B1E]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Clearance Granted</h2>
              <p className="text-gray-400 text-sm">Your encrypted payment module has been dispatched.</p>
            </motion.div>
          ) : (
            <form onSubmit={initiateSubmit} className="space-y-10">
              
              {/* --- TIER SELECTION (LOCKED CAPABILITY) --- */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 ml-1">Select Access Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'Early Bird', title: 'Early Bird', price: '₹399', desc: 'Limited to 30 Seats!', highlight: true, availableDuringEarlyBird: true },
                    { id: 'Solo', title: 'General Admission', price: '₹549', desc: 'Solo standard access', highlight: false, availableDuringEarlyBird: false },
                    { id: 'Group of 3', title: 'Group of 3', price: '₹1497', desc: 'Squad access (+ discount)', highlight: false, availableDuringEarlyBird: false },
                    { id: 'Group of 5', title: 'Group of 5', price: '₹2245', desc: 'Full crew access (+ discount)', highlight: false, availableDuringEarlyBird: false }
                  ].map((tier) => {
                    const isLocked = isEarlyBird && !tier.availableDuringEarlyBird;
                    const isSelected = ticketType === tier.id;

                    return (
                      <label 
                        key={tier.id}
                        className={`block p-5 rounded-xl border relative overflow-hidden transition-all duration-300
                          ${isLocked ? 'border-white/5 bg-white/[0.01] opacity-60 cursor-not-allowed grayscale' : 'cursor-pointer group'}
                          ${isSelected && !isLocked ? 'border-[#E62B1E] bg-[#E62B1E]/5 shadow-[0_0_20px_rgba(230,43,30,0.1)]' : ''}
                          ${!isSelected && !isLocked ? 'border-white/10 hover:border-white/30 bg-white/[0.03]' : ''}
                          ${tier.highlight ? 'sm:col-span-2' : ''}
                        `}
                      >
                        <input 
                          type="radio" 
                          name="tier" 
                          value={tier.id} 
                          className="hidden" 
                          onChange={() => !isLocked && handleTicketTypeChange(tier.id)} 
                          checked={isSelected} 
                          disabled={isLocked}
                        />
                        <div className="flex justify-between items-center relative z-10">
                          <div>
                            <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                              {tier.title} 
                              {tier.highlight && !isLocked && <span className="text-[9px] bg-[#E62B1E] text-white px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">Hot</span>}
                              {isLocked && (
                                <span className="flex items-center gap-1 text-[9px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/5">
                                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                  Locked
                                </span>
                              )}
                            </h3>
                            <p className={`text-xs mt-1 transition-colors ${tier.highlight && !isLocked ? 'text-[#E62B1E]/80 font-medium' : 'text-gray-500 group-hover:text-gray-400'}`}>
                              {tier.desc}
                            </p>
                          </div>
                          <span className={`text-lg font-bold transition-colors ${isSelected && !isLocked ? 'text-[#E62B1E]' : isLocked ? 'text-gray-600' : 'text-white'}`}>
                            {tier.price}
                          </span>
                        </div>
                        {isSelected && !isLocked && <div className="absolute inset-0 bg-gradient-to-r from-[#E62B1E]/10 to-transparent opacity-50 pointer-events-none" />}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* --- DYNAMIC TEAM MEMBER INPUTS --- */}
              <div className="space-y-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="space-y-6 bg-white/[0.01] p-6 md:p-8 rounded-2xl border border-white/5 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E62B1E]/20 text-[#E62B1E] text-xs font-bold border border-[#E62B1E]/30">
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-300">
                        {ticketType === "Solo" || ticketType === "Early Bird" ? "Primary Identity Data" : `User Identity 0${index + 1}`}
                      </h3>
                    </div>

                    {/* Basic Info (With Real-Time Validation) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                      
                      {/* Name */}
                      <div className="relative group md:col-span-2">
                        <input type="text" required minLength={2} placeholder=" " value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                          className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 pt-7 pb-3 text-base font-medium text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                        <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Full Legal Name</label>
                        <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Must be at least 2 characters.</p>
                      </div>
                      
                      {/* Email */}
                      <div className="relative group">
                        <input type="email" required placeholder=" " value={member.email} onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                          className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 pt-7 pb-3 text-base font-medium text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                        <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Email Address</label>
                        <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Must be a valid email containing '@'.</p>
                      </div>

                      {/* Phone */}
                      <div className="relative group">
                        <input type="tel" required pattern="^\d{10}$" placeholder=" " value={member.phoneNo} onChange={(e) => handleTeamMemberChange(index, 'phoneNo', e.target.value)}
                          className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 pt-7 pb-3 text-base font-medium text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                        <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Phone (10 Digits)</label>
                        <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Must be exactly 10 numeric digits.</p>
                      </div>
                    </div>

                    {/* Demographics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 pt-2">
                      <div className="flex flex-col relative group">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Current Base</label>
                        <select required value={member.workStudy} onChange={(e) => handleTeamMemberChange(index, 'workStudy', e.target.value)}
                          className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none invalid:border-red-500/50 transition-all duration-300 appearance-none">
                          <option value="" disabled className="bg-[#111]">Select Base</option>
                          <option value="College" className="bg-[#111]">CIT Student</option>
                          <option value="other" className="bg-[#111]">Other Organization</option>
                        </select>
                      </div>

                      {member.workStudy === 'other' ? (
                         <div className="relative group self-end">
                           <input type="text" required minLength={2} placeholder=" " value={member.workStudyCustom} onChange={(e) => handleTeamMemberChange(index, 'workStudyCustom', e.target.value)}
                             className="peer w-full bg-white/[0.03] border border-[#E62B1E]/50 rounded-xl px-5 pt-7 pb-3 text-sm font-medium text-white focus:border-[#E62B1E] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                           <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Specify Organization</label>
                           <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Organization name required.</p>
                         </div>
                      ) : member.workStudy === 'College' ? (
                        <>
                          <div className="relative group md:col-span-2">
                            <input type="text" required minLength={5} placeholder=" " value={member.usn} onChange={(e) => handleTeamMemberChange(index, 'usn', e.target.value)}
                              className="peer w-full bg-white/[0.03] border border-[#E62B1E]/30 rounded-xl px-5 pt-7 pb-3 text-base font-mono uppercase text-white focus:border-[#E62B1E] focus:bg-white/[0.05] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                            <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">University USN / ID</label>
                            <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Please enter a valid USN.</p>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Department</label>
                            <select required value={member.department} onChange={(e) => handleTeamMemberChange(index, 'department', e.target.value)}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none transition-all duration-300 appearance-none">
                              <option value="" disabled className="bg-[#111]">Select...</option>
                              <option value="CSE" className="bg-[#111]">CSE</option>
                              <option value="ISE" className="bg-[#111]">ISE</option>
                              <option value="AIML" className="bg-[#111]">AIML</option>
                              <option value="ECE" className="bg-[#111]">ECE</option>
                              <option value="EEE" className="bg-[#111]">EEE</option>
                              <option value="ME/CV" className="bg-[#111]">ME/CV</option>
                              <option value="Faculty" className="bg-[#111]">Faculty</option>
                              <option value="MBA/Commerce/Degree" className="bg-[#111]">MBA/Commerce</option>
                            </select>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Semester</label>
                            <select required value={member.semester} onChange={(e) => handleTeamMemberChange(index, 'semester', e.target.value)}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none transition-all duration-300 appearance-none">
                              <option value="" disabled className="bg-[#111]">Select...</option>
                              {['1','2','3','4','5','6','7','8','Alumni'].map(sem => <option key={sem} value={sem} className="bg-[#111]">{sem}</option>)}
                            </select>
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 pt-2">
                      <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Origin Node</label>
                        <select required value={member.findUs} onChange={(e) => handleTeamMemberChange(index, 'findUs', e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-gray-300 focus:border-[#E62B1E]/50 focus:outline-none transition-all duration-300 appearance-none">
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
                ))}
              </div>

              {/* --- PAYMENT PROCESSING SECTION --- */}
              <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-3">
                      Cryptographic Payment <span className="text-xs px-3 py-1 rounded-full bg-[#E62B1E]/20 text-[#E62B1E] font-mono border border-[#E62B1E]/30">Total: ₹{ticketPrice}</span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Select your deployment method.</p>
                  </div>
                  
                  <div className="flex gap-2 p-1 bg-black/40 rounded-lg border border-white/10 w-fit">
                    <button type="button" onClick={() => setFormData({...formData, paymentType: 'upi'})} className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${formData.paymentType === 'upi' ? 'bg-[#E62B1E] text-white' : 'text-gray-500 hover:text-white'}`}>UPI</button>
                    <button type="button" onClick={() => setFormData({...formData, paymentType: 'cash'})} className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${formData.paymentType === 'cash' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>Cash</button>
                  </div>
                </div>

                {formData.paymentType === 'cash' ? (
                  <div className="relative group pb-2">
                    <input type="text" required minLength={2} placeholder=" " value={formData.teamMemberName} onChange={(e) => setFormData({...formData, teamMemberName: e.target.value})}
                      className="peer w-full bg-white/[0.05] border border-white/20 rounded-xl px-5 pt-7 pb-3 text-base font-medium text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.08] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                    <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">Name of Organizer receiving cash</label>
                    <p className="absolute -bottom-4 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Required field.</p>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-black/40 p-6 rounded-xl border border-white/5">
                    <div className="shrink-0 text-center">
                      <div className="w-40 h-40 bg-white p-2 rounded-lg mx-auto overflow-hidden">
                        <img src="/ticket/upi id.jpeg" alt="UPI QR Code" className="w-full h-full object-cover rounded" />
                      </div>
                      <p className="font-mono text-xs text-gray-400 mt-3 select-all bg-white/5 py-1 px-2 rounded">aaronrohanraj7@okaxis</p>
                    </div>
                    
                    <div className="w-full space-y-6">
                      <div className="relative group">
                        <input type="text" required pattern="^\d{12}$" placeholder=" " value={formData.upiTransactionId} onChange={(e) => setFormData({...formData, upiTransactionId: e.target.value})}
                          className="peer w-full bg-white/[0.05] border border-white/20 rounded-xl px-5 pt-7 pb-3 text-base font-mono text-white focus:border-[#E62B1E]/50 focus:bg-white/[0.08] focus:outline-none invalid:[&:not(:placeholder-shown)]:border-red-500/50 transition-all duration-300" />
                        <label className="absolute left-5 top-5 text-gray-500 text-xs uppercase tracking-widest transition-all duration-300 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-[#E62B1E] peer-invalid:peer-[&:not(:placeholder-shown)]:text-red-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-gray-400 pointer-events-none">UPI Transaction ID (12 Digits)</label>
                        <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-medium opacity-0 peer-invalid:peer-[&:not(:placeholder-shown)]:opacity-100 transition-opacity">Must be exactly 12 numeric digits.</p>
                      </div>
                      
                      <label className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 mt-2 ${formData.paymentScreenshot ? 'border-green-500/50 bg-green-500/5' : 'border-white/20 hover:border-[#E62B1E]/50 bg-white/[0.02] hover:bg-white/[0.05]'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className={`w-6 h-6 mb-2 ${formData.paymentScreenshot ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                          <p className="text-xs text-gray-400 font-mono">
                            {formData.paymentScreenshotName ? <span className="text-green-400 font-bold">{formData.paymentScreenshotName}</span> : "Attach Payment Verification (Image)"}
                          </p>
                        </div>
                        <input type="file" required={formData.paymentType === 'upi' && !formData.paymentScreenshot} className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-16 rounded-xl bg-[#E62B1E] text-white font-bold uppercase tracking-[0.3em] text-sm hover:bg-[#ff3526] hover:shadow-[0_0_40px_rgba(230,43,30,0.4)] transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none"
              >
                {status === "loading" ? "Processing..." : "Deploy Payload & Finalize"}
              </button>
              
              <p className="text-center text-xs text-gray-600 font-mono mt-4">
                For OFFLINE physical deployment, visit CHOSS space (5th Floor, Sir MV Block).
              </p>
            </form>
          )}
        </div>

        {/* --- RIGHT: THE 3D HOLOGRAPHIC LANYARD --- */}
        <div className="w-full lg:w-[40%] flex items-start justify-center pt-8 sticky top-24">
          <div 
            className="w-full max-w-[400px] relative cursor-grab active:cursor-grabbing [perspective:1200px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Lanyard Strap */}
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
                <textPath href="#leftStrap" startOffset="10%">TEDxCIT • ARK 07 • TEDxCIT</textPath>
              </text>
              <text fontSize="9" fill="#555" fontWeight="bold" letterSpacing="2" className="select-none pointer-events-none">
                <textPath href="#rightStrap" startOffset="15%">ARK 07 • TEDxCIT • ARK 07</textPath>
              </text>
              <rect x="145" y="4" width="50" height="26" rx="4" fill="url(#metalGrad)" stroke="#333" strokeWidth="1" />
              <rect x="150" y="11" width="40" height="6" rx="2" fill="#111" />
              <circle cx="170" cy="148" r="16" stroke="url(#metalGrad)" strokeWidth="5" fill="none" />
              <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#888" /><stop offset="50%" stopColor="#444" /><stop offset="100%" stopColor="#222" />
              </linearGradient>
            </svg>

            {/* 3D Framer Motion Badge */}
            <motion.div 
              className="relative -mt-10 mx-auto w-[340px] h-[480px] rounded-none bg-[#0A0A0A] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8),_0_0_40px_rgba(230,43,30,0.1)] overflow-hidden [transform-style:preserve-3d]"
              style={{ rotateX, rotateY }}
            >
              <motion.div 
                className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
                style={{ opacity: useTransform(springX, [0, 1], [0, 0.15]), x: glareX, y: glareY, width: "200%", height: "200%" }}
              />

              <div className="h-28 bg-gradient-to-b from-[#E62B1E] to-[#991b14] p-6 flex flex-col items-center justify-between relative overflow-hidden">
                <div className="w-16 h-3 rounded-full bg-[#050505] shadow-inner absolute top-4 z-10" />
                <div className="absolute -right-4 -top-8 text-7xl font-black text-white opacity-10 select-none tracking-tighter">ARK</div>
                <div className="mt-auto w-full flex justify-between items-end">
                  <span className="text-white text-xl font-black tracking-tighter">TED<sup className="text-sm">x</sup>CIT</span>
                  <span className="text-white/80 text-[10px] font-bold tracking-[0.3em]">ARK 07</span>
                </div>
              </div>

              <div className="p-8 h-[calc(100%-7rem)] flex flex-col relative [transform:translateZ(30px)]">
                <div className="mb-auto">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#E62B1E] font-bold mb-2">Authenticated User</p>
                  <p className="text-3xl font-bold leading-none tracking-tight text-white line-clamp-2">
                    {teamMembers[0]?.name || "GUEST PROTOCOL"}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-none backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                      {ticketType} ACCESS
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-[7px] text-gray-500 tracking-[0.3em]">NETWORK STATUS</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-none bg-[#E62B1E] animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-none bg-[#E62B1E]" />
                        <div className="w-1.5 h-1.5 rounded-none bg-[#E62B1E]/30" />
                        <div className="w-6 h-1.5 rounded-none bg-[#E62B1E]/30" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[9px] text-gray-400">
                        {teamMembers[0]?.usn ? `ID: ${teamMembers[0].usn}` : 'ID: TX-ARK07'}
                      </div>
                      <div className="text-[8px] text-[#E62B1E] tracking-widest mt-1 uppercase font-bold">Encrypted</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-[-2rem] text-center text-[10px] uppercase text-gray-600 tracking-[0.3em] pointer-events-none">
            Interact to inspect badge
          </div>
        </div>
      </div>

      {/* --- CUSTOM CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {showConfirmModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              onClick={() => setShowConfirmModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-2xl shadow-2xl z-[101]"
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