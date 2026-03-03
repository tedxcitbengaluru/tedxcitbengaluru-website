"use client";
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/header'
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- TYPES ---
interface Video {
    title: string;
    url: string;
    thumbnail: string;
}

interface EventData {
    name: string;
    date: string;
    src: string;
    description: string;
    videos: Video[];
}

interface CircleData {
    name: string;
    date: string;
    src: string;
    description: string;
}

const Page = () => {
    const [activeTab, setActiveTab] = useState<'events' | 'circles'>('events');
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
    const [selectedCircle, setSelectedCircle] = useState<CircleData | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const targetPosition = contentRef.current.getBoundingClientRect().top + window.scrollY;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 100;
            let start: number | null = null;

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function for smoother animation
                const ease = progress * (2 - progress);
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        }
    }, []);

    // --- DATA ---
    const events: EventData[] = [
        { 
            name: 'Epoch', 
            date: '28th FEBRUARY 2025', 
            src: '/events/Epoch.jpg',
            description: "Epoch captures a crucial time in our journey when dreams and reality start to entangle and forge together. It’s a period when we have the opportunity to mold our future, as nothing is certain, and each decision we make can redefine our path. Understanding the Epoch helps us recognize the significance of this time and the impact of our choices during it. During the Epoch of our lives, our cognitive biases—the ways in which we choose to perceive the world around us, influence our journey and decisions in both positive and negative ways. Addressing these biases helps us more effectively turn our visions into lasting realities.",
            videos: [
                { title: "Standup Comedy by Shankar Chugani", url: "https://www.youtube.com/embed/DMUkJWNQhO0?autoplay=0", thumbnail: "https://img.youtube.com/vi/DMUkJWNQhO0/0.jpg" },
                { title: "Musical Performance by Dhananjay Keys", url: "https://www.youtube.com/embed/9LPhOwITmjQ?autoplay=0", thumbnail: "https://img.youtube.com/vi/9LPhOwITmjQ/0.jpg" },
                { title: "Three P's - Passion Persona & Pursuit - A Way to Life | Dr. Shivananda Koteshwar", url: "https://www.youtube.com/embed/Kf7uW6Fz9EE?autoplay=0",thumbnail: "https://img.youtube.com/vi/Kf7uW6Fz9EE/0.jpg" },
                { title: "A Psychiatrist's Journey Through Challenge and Change | Dr. Muralidharan Kesavan", url: "https://www.youtube.com/embed/VUlADlxWiZo?autoplay=0",thumbnail: "https://img.youtube.com/vi/VUlADlxWiZo/0.jpg"},
                { title: "Journey in fashion through stitching stories | Aditi Bhonsle", url: "https://www.youtube.com/embed/-UORHKxp_xA?autoplay=0",thumbnail: "https://img.youtube.com/vi/-UORHKxp_xA/0.jpg" },
                { title: "How I mastered VFX, life, and leadership | Shiji Sunil", url: "https://www.youtube.com/embed/QCeyOnyZ-tM?autoplay=0",thumbnail: "https://img.youtube.com/vi/QCeyOnyZ-tM/0.jpg" },
                { title: "Band Perfomance by Team Madhari", url: "https://www.youtube.com/embed/p6uiT0kfrzw?autoplay=0",thumbnail: "https://img.youtube.com/vi/p6uiT0kfrzw/0.jpg"},
                { title: "Dance Perfomance by Team Pregos", url: "https://www.youtube.com/embed/Yag75vS6JAs?autoplay=0",thumbnail: "https://img.youtube.com/vi/Yag75vS6JAs/0.jpg"}
            ]
        },
        { 
            name: 'Aether', 
            date: '6th MAY 2024', 
            src: '/events/Aether.jpg',
            description: "The theme dives into the often overlooked fifth element, representing that intrinsic force which brings out the true potential and unveils our authentic selves. While we commonly acknowledge air, water, fire, and earth, Aether symbolizes our core essence! It recognizes that the inner strength within each person varies. For some, it's a passion for creativity, for others, it's resilience in adversity or a deep sense of purpose driving them forward. This diversity highlights the richness of human experience and the different ways individuals find their AETHER.",
            videos: [
                { title: "Bridging Communities through Language | Sakshi Baid", url: "https://www.youtube.com/embed/wgv67rTc5pk?autoplay=0", thumbnail: "https://img.youtube.com/vi/wgv67rTc5pk/0.jpg" },
                { title: "Elements of Self-Expression | Ruby Naaz", url: "https://www.youtube.com/embed/fmZs6srNYOA?autoplay=0", thumbnail: "https://img.youtube.com/vi/fmZs6srNYOA/0.jpg" },
                { title: "Carving our own path towards Love and Acceptance | Nivi Nived Antony", url: "https://www.youtube.com/embed/fNTuwce22zg?autoplay=0",thumbnail: "https://img.youtube.com/vi/fNTuwce22zg/0.jpg" },
                { title: "Connecting the strings through Self Exploration | Akshay Singh", url: "https://www.youtube.com/embed/h8_NnDaV1OM?autoplay=0",thumbnail: "https://img.youtube.com/vi/h8_NnDaV1OM/0.jpg" },
                { title: "The Relativity of Time: Redefining Success and Purpose in Life | Madhuri Braganza", url: "https://www.youtube.com/embed/DdEIgzLttl0?autoplay=0",thumbnail: "https://img.youtube.com/vi/DdEIgzLttl0/0.jpg" },
                { title: "Achieving the harmony of within through sound healing | Yogabandhu Prashanth", url: "https://www.youtube.com/embed/ymReuWqNID8?autoplay=0",thumbnail: "https://img.youtube.com/vi/ymReuWqNID8/0.jpg" }
            ]
        },
        { 
            name: 'Zenith', 
            date: '31st MARCH 2023', 
            src: '/events/Zenith.jpg',
            description: "Zenith: The summit of one's potential. As young adults, we are at our prime of energy. This vigour, when consistent and put to use in the right way, will act as a driving force for one to attain their Zenith! The next event of TEDxCITBENGALURU will bring upon speakers who achieved their Zenith at a young age. With this event, we aspire to inspire our audience to find the ignition within them to achieve their Zenith!",
            videos: [
                { title: "Pursuing Excellence | Saptarshi Prakash", url: "https://www.youtube.com/embed/GVNvrxoZW8k?autoplay=0", thumbnail: "https://img.youtube.com/vi/GVNvrxoZW8k/0.jpg" }
            ]
        },
        { 
            name: 'Elixir', 
            date: '8th JULY 2022', 
            src: '/events/Elixir.jpg',
            description: "Elixir; a magical potion that grants us everlasting life. Though realistically impossible, it exists in each of our lives. It takes the form of those we love, that which we love to do, and that which defines us. Your elixir is what you live for, and what you continue to live for. Our event is a showcase for people to share the Elixir in their lives, thereby sharing hope, meaning, and allowing you to find your own Elixir.",
            videos: [
                { title: "Consistency and Excellence | Reshi Magada", url: "https://www.youtube.com/embed/h6olKX9BajA?autoplay=0", thumbnail: "https://img.youtube.com/vi/h6olKX9BajA/0.jpg" }
            ]
        },
        { 
            name: 'Thrive', 
            date: '11th NOVEMBER 2021', 
            src: '/events/Thrive.jpg',
            description: "Thriving while developing is a beautiful phenomenon in itself. When the whole mass joins hands to progress towards a goal, irrespective of differences and circumstances, the amalgamation of values takes place, and the results leave us spellbound. This is the first step towards flourshing! To thrive in a changing world, makes the virtues like integrity, compassion and trust thrive too . It also makes sure social norms are weighted and balanced. Thrive, is a woman's view of the world we live in, through her own window, while making it a more peaceful and achieving place. A place for our (she) change makers, their power, their ability and the spark they ignite wherever they go. The goal of our event is to explore the various fields encircling the female community, from empowerment to education, from dignity to rights and everything in between. It is going to be a call to the world, letting them know how powerful and capable women are, always ready to take on the world and to influence social change for themselves as well as others. An event that narrates stories where we see individuals flourishing, learning from their flaws, deepening the roots of their values and emerging victorious. Voicing out how we all thrive!",
            videos: [
                { title: "Struggles of Women & Sexual Minorities | Akkai Padmashali", url: "https://www.youtube.com/embed/5y7Ek2sDMu4?autoplay=0", thumbnail: "https://img.youtube.com/vi/5y7Ek2sDMu4/0.jpg" }
            ]
        },
        { 
            name: 'Iridescence', 
            date: '23rd AUGUST 2021', 
            src: '/events/Iridescence.jpg',
            description: "The idea behind exploring your paths and thinking about something out of the box is nothing but taking yourself beyond the limits, ignoring every negative aspect that pulls you down and finally reaching that particular destination of yours by carrying all the positive vibes. This is exactly what the theme, \"IRIDESCENCE\" is, an allusion to the intriguing natural phenomenon, where an object shines with bright colors, that appear different when seen from different angles. Your hurdles, failures, confusions, everything will make sense when seen from a different perspective, filled with hopes and commitment. Nobody has super powers to deal with their issues or problems. It's just will power and self motivation, that eventually becomes a weapon for their success or achievements. Iridescence, the beauty of splitting light is that, we see colors that were once hidden, just like the hidden talents in each one of us. The beauty of life is that perspective opens up things that were camouflaged since ages. The goal of our event is to explore the numerous dimensions of life and how we can shine through each one of them, differently, yet splendidly!!",
            videos: [
                { title: "Thinking from Another Perspective | Wilfred Shreyas", url: "https://www.youtube.com/embed/r4UeEGmOATA?autoplay=0", thumbnail: "https://img.youtube.com/vi/r4UeEGmOATA/0.jpg" }
            ]
        },
    ];

    const circles: CircleData[] = [
        { name: 'Teamwork', date: '28 MAY 2021', src: '/circles/Teamwork.jpg', description: "Two heads are better than one, playing together is much more fun. A team is not the sum of its weaknesses but the product of its strengths. But how can you be an effective team member? We learned that there's more to being a teammate than we had previously thought. To define teamwork it might also be worth clarifying what it’s not, and thinking about the distinction between teams and teamwork. In our view, a team exists when individual strengths and skills are combined with teamwork, in the pursuit of a common direction or cause, in order to produce meaningful results for the team members and the organization. A team combines individual strengths with a shared commitment to performanceIt’s not just about getting on well together, teamwork makes every event perfect." },
        { name: 'Our Bodies', date: '7 JUNE 2021', src: '/circles/Our Bodies.jpg', description: "Every Body is Beautiful in its own way, very unique from each other and has its own specialty. Our bodies can take control over the thoughts our minds convey. People are easily influenced by the body language the other one is manifesting. Body posture plays a vital role in determining one's intention or energy. We get to learn new and interesting facts from every person we hear and can learn to implement them for our own betterment." },
        { name: 'Procrastination', date: '18 JUNE 2021', src: '/circles/Procrastination.jpg', description: "Do you want to just play a game that is in your destiny by being a procrastinator or do you want to choose your game by being a hustler? In order to understand why you procrastinate, you must first have a strong desire to eliminate procrastination in your life. Here, everyone explored procrastination as their daily as well as constant visitor. Sometimes it is hard to control our habits but Procrastination can be controlled by proper planning, prioritizing, working passionately and by weighing the greater good over instant gratification. Let the rational decision maker in your mind guide your actions. So yes, it's tomorrow already, don't procrastinate!" },
        { name: 'Happiness', date: '30 JUNE 2021', src: '/circles/Happiness.jpg', description: "Every Person has a different definition of happiness. Sometimes, happiness radiates when you talk to or sit with someone you love. Happiness is an ingenious trap designed by billions of years of evolution to keep us in the loop of surviving by comfortable sharing of different perspectives from diversity. But sometimes we tend to feel unhappy! When our expectations of reality exceed our experiences of reality and sometimes when our past reality is better than the present reality. We need to stop relying on imagination and start living in the reality." },
        { name: 'Agree to Disagree', date: '14 JULY 2021', src: '/circles/Agree to Disagree.jpg', description: "Every single soul looks at the world differently. Our thoughts are made up of what we see, and how we see is often influenced by our ecosystem and mind. Although binaries exist, it differs for different individuals. What's right to me could be right only to me because of how I view life. The opposite person's perspective might vary.In order to respect everyone's stand including that of our own, we agree to disagree.Almost any conversation that you find yourself participating in will include having to agree to disagree. Agreements and disagreements are generally about your thoughts and feelings about something. Peace is not when everyone agrees. It is when we can respect our disagreements and still play in the sandbox together." },
        { name: 'Brave it Out', date: '28 JULY 2021', src: '/circles/Brave it Out.jpg', description: "Brave it out; it is actually as challenging as it sounds. In our surroundings, we experience that there are mostly two kinds of people- the ones who just like to go with the flow and the ones who are ready to go to any extent to achieve their dreams. But sometimes, we need to experiment and take risks to achieve our passions, goals, and aspirations in order to taste the flavor of success and efforts.And yes! There we all are, just brave it out. However, remember one thing, if you deserve something you will get it no matter what, but without your effort and hard work, you might be missing out on something big in your life." },
        { name: 'Irrational', date: '20 AUGUST 2021', src: '/circles/Irrational.jpg', description: "You cannot make yourself feel something you do not feel, but you can make yourself do the right thing in spite of your feelings. Sometimes our thoughts are backed by so much insecurity, that they create lies we end up believing. But we have a choice to choose between being rational or irrational. Irrational beliefs are usually self-harming whereas rational thinking shines to be wise. The same sort of active discussion did we have on the topic 'IRRATIONAL' in our Ted circle#7. It was an awesome evening where each one of us had different opinions on our belief on irrationality. We had exciting breakout sessions where we had friendly discussions . Adding to the point, irrational thinking is based on the beliefs that people may have about how the world should be. They contain unrealistic expectations and are often unlikely to work. People who keep following those principles about life are more likely to live frustrating lives. In conclusion, don't make a permanent decision for your temporary emotion. Think wisely and act wisely." },
        { name: 'Countdown', date: '30 AUGUST 2021', src: '/circles/Countdown.jpg', description: "As part of the COUTDOWN series, 'HOW TO TALK ABOUT CLIMATE CHANGE SO THAT PEOPLE WILL LISTEN' TED circle #8 was definitely an eye- opener.The talk focussed mainly on how biodiversity is important in the sustainability of our planet. Every species depends on others to survive.We learnt that monoculture is not the only solution to restoration but just one of the many solutions that we need to figure out.As a part of this effort, RESTORE a new digital ecosystem for restoration is now available to the public.It provides an open data platform that provides information about the type of species that can survive in a particular region, monitor ecological projects and finally a platform to share ecological information that can be used by various NGOs for restoration.Restoration will not only reduce climate change but will also solve other global threats like extreme weather events,food shortages, droughts and global pandemics.We discussed about different approaches we can take as individuals in contributing to restoring our planet. It was indeed an enlightening and lively session." },
        { name: 'Imagination', date: '1 OCTOBER 2021', src: '/circles/Imagination.jpg', description: "TED Circle #9 ,held on October 1st, 2021 on the theme 'Imagination' was indeed a fun and unwinding one! We had two breakout sessions. In the first breakout room, we discussed about a crazy idea that we had, something that we hadn't shared with anyone. From imagining a world which had Doraemon’s gadgets to sharing crazily difficult ambitions, it was indeed an amusing and enjoyable one! In the second breakout room, we discussed the following questions: 1) When did you last spend an extended period of time away from your phone? What were the circumstances? How did that feel? 2) Why might so many of us be fearful of being bored? Asking ourselves these questions, made us learn and understand quite a few things about ourselves. We realized how dependent we were on our gadgets and some of us were even addicted to our phones. The ones who spent lesser screen time gave tips on how to reduce phone usage. We also gave each other tips on how to handle loneliness and boredom. In conclusion, this session was mellowing, enjoyable as well as an eye-opening one!" },
        { name: 'Optimism', date: '13 OCTOBER 2021', src: '/circles/Optimism.jpg', description: "Being optimistic might be a habit but it can also be choice to stay positive. Staying positive doesn't mean you have to be happy all the time. It means that even on hard days you know that there are better ones coming!! An Optimist understands that life can be a bumpy road, but atleast it is leading somewhere..being optimistic doesn't mean u stop trying to do better in the hope of happening, it means that no matter how wrong things go, good times will come! These are snippets from a refreshing, first ever offline ted circle#10 ! It was a great session where we had face to face conversations and participation. We had lot of ideas, facts and stories shared with the beats of a guitar. It was just a perfect evening! The discussions indeed proved to be wonderful reflections of the theme!" },
        { name: 'Criticism', date: '19 OCTOBER 2021', src: '/circles/Criticism.jpg', description: "Criticism is an important tool that shapes our life, but it's also a two edged sword. Although criticising people on their unhealthy habits is important, we must not force our ideals upon them. Conversely, we must be open to take up positive criticism and use it as a catalyst for our own growth! All of us should strive to be the first domino that falls and inspires others to be the change as well. Even if we can't bring about a revolution, we should atleast try to be the first spark. These are some of the takeaways from our TedCircle #11 on the theme ' Criticism' . The participants discussed a lot about different perspectives on criticism and it indeed was a wonderful gathering of ideas." },
        { name: 'Humour', date: '1 NOVEMBER 2021', src: '/circles/Humour.jpg', description: "Humour can humanize you, strengthen your bond with people and steal the limelight. Anyone can learn the skill of being humorous and confident. In today's overworth, unappreciated, stressful and sleep deprived culture, a choice to try and find humour makes a lot of difference. So, take a leap now. Such were the takeaways of ted circles #12 on the theme \"HUMOUR\" with loads of laughter and myriad hues of happiness filling our hearts." },
        { name: 'Beginnings', date: '12 JANUARY 2022', src: '/circles/Beginnings.jpg', description: "Every moment is a new beginning. Be it our first step, our first initiative, our first effort, these are what makes as the origin where we finally move towards getting out of our comfort zone and becoming who we always wanted to be. This is where the actual life begins, a roller coaster ride through all the ups and downs, drawing us closer to our truest self meanwhile exploring all our endless capabilities. Such were the takeaways of our Ted Circles #13 on the theme \"Beginnings\" where we had participants discussing about various perspectives regarding starting over while carrying joy in their hearts and laughter spreading across the platform." }
    ];

    // --- ANIMATION VARIANTS ---
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0, scale: 0.98 },
        visible: { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            transition: { type: "spring", stiffness: 60, damping: 20 }
        }
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    return (
        <div className="bg-[#050505]">
            {/* HERO SECTION */}
            <section className="relative w-full h-screen overflow-hidden bg-white">
                <Header />
                
                {/* --- Full-width Mountain Background --- */}
                <div className="absolute inset-0">
                    <Image
                        src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760513189/Mask_group_qwx8ys.svg"
                        alt="Mountain background"
                        fill
                        className="object-cover object-bottom w-full h-full"
                        priority
                        sizes="100vw"
                    />

                    {/* FADE GRADIENT - Fades mountain into the next section color */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]"></div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section ref={contentRef} className="relative z-20 bg-[#050505] py-20">
                <div className="container mx-auto px-6 w-full md:w-2/3 lg:w-1/2 flex flex-col items-center">
                    
                    {/* --- TOGGLE BUTTONS --- */}
                    <div className="mb-16 w-full flex justify-center">
                        <div className="inline-flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl">
                            <button
                                onClick={() => setActiveTab('events')}
                                className={`px-8 py-3 rounded-full text-base font-bold uppercase tracking-wider transition-all duration-300 ${
                                    activeTab === 'events'
                                        ? 'bg-[#EB0028] text-white shadow-lg scale-105'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Events
                            </button>
                            <button
                                onClick={() => setActiveTab('circles')}
                                className={`px-8 py-3 rounded-full text-base font-bold uppercase tracking-wider transition-all duration-300 ${
                                    activeTab === 'circles'
                                        ? 'bg-[#EB0028] text-white shadow-lg scale-105'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Circles
                            </button>
                        </div>
                    </div>

                    {/* --- ANIMATED CONTENT AREA --- */}
                    <div className="w-full min-h-[50vh]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'events' ?  (
                                <motion.div 
                                    key="events-list"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="w-full space-y-12 md:space-y-16"
                                >
                                    {events.map((event, index) => (
                                        <motion.div 
                                            key={index} 
                                            variants={itemVariants}
                                            viewport={{ once: true, margin: "-50px" }}
                                            className="relative w-full rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a0a] group flex flex-col"
                                        >
                                            {/* Image Section */}
                                            <div className="relative w-full">
                                                <Image
                                                    src={event.src}
                                                    alt={`${event.name} background`}
                                                    width={1920}
                                                    height={1080}
                                                    priority={index < 2}
                                                    className="w-full h-auto object-contain grayscale-100 group-hover:grayscale-0 transition-all duration-700 md:scale-100 md:group-hover:scale-105"
                                                />

                                                {/* Date Badge */}
                                                <div className="absolute top-0 left-0">
                                                    <div className="bg-black/70 backdrop-blur-md border-b border-r border-white/10 px-4 py-3 md:px-8 md:py-4 rounded-br-2xl md:rounded-br-3xl">
                                                        <span className="text-white text-[10px] md:text-[13px] font-bold uppercase tracking-widest">
                                                            {event.date}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Desktop overlay button (Hidden on mobile) */}
                                                <div className="hidden md:flex absolute inset-0 items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button 
                                                        onClick={() => setSelectedEvent(event)}
                                                        className="bg-[#EB0028] hover:bg-[#c4001f] text-white text-xs font-bold px-8 py-3 rounded-full shadow-[0_0_20px_rgba(235,0,40,0.5)] transition-all duration-300 hover:scale-105 uppercase tracking-widest"
                                                    >
                                                        Know more
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Mobile bottom bar (Hidden on desktop) */}
                                            <div className="md:hidden w-full p-4 bg-[#111] border-t border-white/5">
                                                 <button 
                                                    onClick={() => setSelectedEvent(event)}
                                                    className="w-full bg-[#EB0028] hover:bg-[#c4001f] text-white text-[11px] font-bold px-6 py-3 rounded-xl uppercase tracking-widest transition-colors"
                                                >
                                                    Know more about {event.name}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="circles-list"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full"
                                >
                                    {circles.map((circle, index) => (
                                        <motion.div 
                                            key={index} 
                                            variants={itemVariants}
                                            viewport={{ once: true }}
                                        >
                                            {/* Circles - Redesigned to use object-contain with a bottom bar */}
                                            <div 
                                                className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-white/10 bg-[#0a0a0a] group cursor-pointer flex flex-col hover:border-white/20 transition-colors"
                                                onClick={() => setSelectedCircle(circle)}
                                            >
                                                {/* Image Container with Padding */}
                                                <div className="relative w-full flex-grow p-4 md:p-6 flex items-center justify-center">
                                                    <Image
                                                        src={circle.src}
                                                        alt={circle.name}
                                                        fill
                                                        className="object-contain p-4 md:p-6 grayscale-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                                                    />
                                                </div>
                                                
                                                {/* Sleek Bottom Bar */}
                                                <div className="w-full p-4 md:p-5 bg-[#111] border-t border-white/5 z-10 flex flex-col items-center justify-center">
                                                    <p className="text-white text-center font-bold text-sm md:text-base uppercase tracking-widest">
                                                        {circle.name}
                                                    </p>
                                                    <p className="text-[#EB0028] text-[10px] font-mono font-bold tracking-[0.2em] mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                        READ THEME
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* --- EVENT VIDEO MODAL --- */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)} // Close on background click
                    >
                        <motion.div
                            className="bg-[#111] w-full max-w-5xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#1a1a1a] shrink-0">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">{selectedEvent.name}</h3>
                                    <p className="text-gray-400 text-xs font-mono tracking-widest mt-1">{selectedEvent.date}</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedEvent(null)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-[#EB0028] text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content - Scrollable Area */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                
                                {/* 1. Theme Description (Displays First) */}
                                <div className="mb-8 bg-[#1a1a1a] border-l-4 border-[#EB0028] p-5 md:p-6 rounded-r-xl shadow-md">
                                    <h4 className="text-[#EB0028] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase mb-3">
                                        The Meaning of {selectedEvent.name}
                                    </h4>
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
                                        {selectedEvent.description}
                                    </p>
                                </div>

                                {/* 2. Videos Header */}
                                <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-3">
                                    <span className="w-4 h-4 rounded-full bg-[#EB0028] inline-block animate-pulse"></span>
                                    Talks & Performances
                                </h4>

                                {/* 3. Video Grid */}
                                {selectedEvent.videos.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {selectedEvent.videos.map((video, idx) => (
                                            <div key={idx} className="flex flex-col gap-3 group">
                                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                                    <iframe 
                                                        src={video.url} 
                                                        title={video.title}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                                <h4 className="text-gray-300 font-medium text-sm md:text-base leading-tight group-hover:text-[#EB0028] transition-colors line-clamp-2">
                                                    {video.title}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 bg-white/5 rounded-xl border border-white/5 border-dashed">
                                        <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">Videos from this epoch coming soon.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- CIRCLES TEXT MODAL --- */}
            <AnimatePresence>
                {selectedCircle && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCircle(null)} 
                    >
                        <motion.div
                            className="bg-[#111] w-full max-w-3xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#1a1a1a] shrink-0">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">{selectedCircle.name}</h3>
                                    <p className="text-gray-400 text-xs font-mono tracking-widest mt-1">{selectedCircle.date}</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedCircle(null)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-[#EB0028] text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col sm:flex-row gap-6 md:gap-10 items-start">
                                {/* Left Side: Small Poster Preview */}
                                <div className="w-full sm:w-1/3 shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-[#050505] p-4 flex items-center justify-center">
                                     <Image 
                                        src={selectedCircle.src} 
                                        alt={selectedCircle.name} 
                                        width={400} 
                                        height={600} 
                                        className="w-full h-auto max-h-[300px] object-contain rounded-lg" 
                                    />
                                </div>

                                {/* Right Side: Description Text */}
                                <div className="w-full sm:w-2/3">
                                    <h4 className="text-[#EB0028] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#EB0028] animate-pulse"></span>
                                        Theme Overview
                                    </h4>
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light whitespace-pre-wrap">
                                        {selectedCircle.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <footer className="w-full z-50 relative bottom-0 text-center pt-4 text-[14px] text-gray-600 pb-10 bg-[#050505]">
                Copyright {new Date().getFullYear()} &copy; TEDxCITBengaluru. This independent TEDx event is operated under license from TED 
            </footer>  
        </div>
    )
}

export default Page