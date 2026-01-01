"use client"
import React from 'react'
import Image from 'next/image'

export default function Content() {
    return(
        <section className='relative w-full h-screen overflow-hidden bg-[#1F1F1F]'>
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
            <div className="relative z-10 h-full flex flex-col px-8 lg:px-16 py-8">
                <h2 className="text-[8vh] font-bold text-[#B0B0B0] mb-4" >OUR <span className='text-[#EB0028]'>SPONSORS</span></h2>
                <p className="text-[#1F1F1F] text-lg md:text-xl lg:text-[26px] font-normal break-words mb-6">
                    {/* TEDxCITBengaluru is an independently organized TED event based in Cambridge Institute of Technology, Bangalore. We are a team who strive to bring to you, top notch TEDx events. We firmly believe that ideas have the power to change the world. Therefore, here we are, giving you an experience odf different types of TED events, all of them, unique and a means to share ideas worth spreading! */}
                </p>
                
                <div className="mt-6 sm:mt-8 md:mt-10 absolute bottom-8 left-0 right-0 z-10">
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