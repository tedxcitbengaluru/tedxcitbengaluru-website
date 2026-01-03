"use client"
import React, { useState } from 'react'
import Image from 'next/image'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        description: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                message: formData.description
            }),
        });

        if (res.ok) {
            setSubmitted(true)
        } else {
            alert("Something went wrong");
        }
        
        setIsSubmitting(false)
        setFormData({
            name: '',
            email: '',
            mobile: '',
            description: ''
        })
    }

    return(
        <section className='relative w-full min-h-screen overflow-hidden bg-[#1F1F1F] flex flex-col'>
            <div className="absolute inset-0">
                <Image
                    src="/images/sponsors_particles.svg"
                    alt="graphics background"
                    fill
                    className="mt-[230.27px] ml-[550.71px] w-[1565px] h-[1862px]"
                    priority
                    sizes="100vw"
                />
            </div>
            <div className="relative z-10 flex-1 flex flex-col px-8 lg:px-16 py-8">
                <h2 className="text-[8vh] font-bold text-[#B0B0B0] mb-4">
                    CONTACT <span className='text-[#EB0028]'>US</span>
                </h2>
                
                <div className="max-w-2xl w-full mt-8 mx-aut">
                    {submitted ? (
                        <div className="border-2 border-[#EB0028] rounded-lg p-8 text-center">
                            <h3 className="text-[#EB0028] text-2xl font-bold mb-4">Thank You!</h3>
                            <p className="text-[#B0B0B0]">Your message has been sent successfully. We'll get back to you soon.</p>
                            <button 
                                onClick={() => setSubmitted(false)}
                                className="mt-6 px-6 py-2 bg-[#EB0028] text-white rounded-lg hover:bg-[#c70022] transition-colors"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 ">
                            <div>
                                <label htmlFor="name" className="block text-[#B0B0B0] text-lg mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-transparent border-2 border-[#EB0028] rounded-lg text-[#B0B0B0] placeholder-[#666666] focus:outline-none focus:border-[#ff3350] transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[#B0B0B0] text-lg mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-transparent border-2 border-[#EB0028] rounded-lg text-[#B0B0B0] placeholder-[#666666] focus:outline-none focus:border-[#ff3350] transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-[#B0B0B0] text-lg mb-2">
                                    Mobile No.
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-transparent border-2 border-[#EB0028] rounded-lg text-[#B0B0B0] placeholder-[#666666] focus:outline-none focus:border-[#ff3350] transition-colors"
                                    placeholder="Enter your mobile number"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-[#B0B0B0] text-lg mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-transparent border-2 border-[#EB0028] rounded-lg text-[#B0B0B0] placeholder-[#666666] focus:outline-none focus:border-[#ff3350] transition-colors resize-none"
                                    placeholder="Enter your message"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 bg-[#EB0028] text-white font-bold text-lg rounded-lg hover:bg-[#c70022] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-auto pt-8">
                    <div className="container mx-auto px-4 sm:px-6">
                        <p className="text-xs sm:text-sm text-center text-white leading-relaxed">
                            © {new Date().getFullYear()}{' '}
                            <span className="font-semibold text-white">TEDxCITBengaluru</span>.
                            This independent TEDx event is operated under license from TED.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}