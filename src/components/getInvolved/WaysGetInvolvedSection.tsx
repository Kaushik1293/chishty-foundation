"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
    motion, useMotionValue, useTransform, useSpring, useMotionTemplate, type Variants,
} from 'framer-motion';
import donateIcon from '../../assets/images/getinvolvedpage/way-to/donate.svg';
import donateImg from '../../assets/images/getinvolvedpage/way-to/dontate-img.png';
import volunteerIcon from '../../assets/images/getinvolvedpage/way-to/volunteer.svg';
import volunteerImg from '../../assets/images/getinvolvedpage/way-to/volunteer-img.png';
import spreadWordIcon from '../../assets/images/getinvolvedpage/way-to/spread-word.svg';
import spreadWordImg from '../../assets/images/getinvolvedpage/way-to/spread-word-img.png';
import partnerIcon from '../../assets/images/getinvolvedpage/way-to/asgard/partner.svg';
import partnerImg from '../../assets/images/getinvolvedpage/way-to/asgard/partner-img.png';
import SectionHeading from '../common/SectionHeading';

const DARK_GREEN = '#0A3231';
const GOLD = '#BD8C3B';
const EASE = [0.16, 1, 0.3, 1] as const;

type Way = {
    icon: any;
    image: any;
    title: string;
    description: string;
    accent: string;
};

const ways: Way[] = [
    {
        icon: donateIcon,
        image: donateImg,
        title: 'Donate',
        description: 'Your donations help us support education, healthcare, livelihood, and more.',
        accent: GOLD,
    },
    {
        icon: volunteerIcon,
        image: volunteerImg,
        title: 'Volunteer',
        description: 'Give your time and skills to help us create a lasting change in communities.',
        accent: DARK_GREEN,
    },
    {
        icon: spreadWordIcon,
        image: spreadWordImg,
        title: 'Spread The Word',
        description: 'Share our mission with your network and help us reach more people.',
        accent: GOLD,
    },
    {
        icon: partnerIcon,
        image: partnerImg,
        title: 'Partner With Us',
        description: 'Collaborate with us to amplify impact and drive social change.',
        accent: DARK_GREEN,
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

const DiamondDivider = ({ hovered }: { hovered: boolean }) => (
    <div className="flex items-center gap-1.5 justify-center">
        <motion.span
            className="h-px"
            style={{ backgroundColor: 'rgba(189,140,59,0.5)' }}
            animate={{ width: hovered ? 30 : 24 }}
            transition={{ duration: 0.35, ease: EASE }}
        />
        <motion.span
            className="w-1.5 h-1.5 shrink-0 border"
            style={{ borderColor: GOLD }}
            animate={{ rotate: hovered ? 225 : 45, scale: hovered ? 1.3 : 1 }}
            transition={{ duration: 0.45, ease: EASE }}
        />
        <motion.span
            className="h-px"
            style={{ backgroundColor: 'rgba(189,140,59,0.5)' }}
            animate={{ width: hovered ? 30 : 24 }}
            transition={{ duration: 0.35, ease: EASE }}
        />
    </div>
);

const WayCard = ({ way }: { way: Way }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const springCfg = { stiffness: 180, damping: 18, mass: 0.6 };
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), springCfg);
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), springCfg);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        mx.set(0);
        my.set(0);
        setHovered(false);
    };

    return (
        <motion.div
            variants={cardVariants}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleLeave}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative rounded-3xl bg-white overflow-hidden flex flex-col h-full cursor-pointer border border-[#F1E3D7]"
            >
                <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl z-30"
                    style={{
                        padding: 1.5,
                        background: `linear-gradient(135deg, ${way.accent}, transparent 40%, transparent 60%, ${way.accent})`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                />

                <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl z-0"
                    style={{ boxShadow: '0px 8px 24px -14px rgba(10,50,49,0.12)' }}
                    animate={{
                        boxShadow: hovered
                            ? `0px 30px 50px -18px ${way.accent}55, 0px 10px 24px -12px rgba(10,50,49,0.2)`
                            : '0px 8px 24px -14px rgba(10,50,49,0.12)',
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                />

                <div className="relative z-10 flex flex-col items-center text-center pt-9 px-6 pb-6">

                    <motion.div
                        className="relative h-26 w-26 rounded-full flex items-center justify-center mb-5"
                        style={{ background: way.accent }}
                        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -8 : 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                    >
                        <motion.span
                            aria-hidden
                            className="absolute -inset-2 rounded-full pointer-events-none"
                            style={{ border: `1px solid ${way.accent}` }}
                            initial={{ opacity: 0, scale: 1 }}
                            animate={
                                hovered
                                    ? { scale: [1, 1.22], opacity: [0.5, 0] }
                                    : { scale: 1, opacity: 0 }
                            }
                            transition={
                                hovered
                                    ? { duration: 1.3, repeat: Infinity, ease: 'easeOut' }
                                    : { duration: 0.2, ease: 'easeOut' }
                            }
                        />
                        <motion.div
                            animate={{ y: hovered ? [0, -2, 0] : 0 }}
                            transition={{ duration: 1.4, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
                            style={{ filter: hovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' : 'none' }}
                        >
                            <Image src={way.icon} alt={way.title} width={50} height={50} />
                        </motion.div>
                    </motion.div>

                    <motion.h3
                        className="font-cormorant text-xl md:text-2xl mb-2"
                        style={{ color: DARK_GREEN }}
                        animate={{ letterSpacing: hovered ? '0.015em' : '0em' }}
                        transition={{ duration: 0.35, ease: EASE }}
                    >
                        {way.title}
                    </motion.h3>

                    <div className="mb-3">
                        <DiamondDivider hovered={hovered} />
                    </div>

                    <p className="font-satoshi text-[#5A6764] text-sm leading-relaxed max-w-55">
                        {way.description}
                    </p>
                </div>

                <div className="relative z-10 flex-1 min-h-57.5 w-full overflow-hidden">
                    <motion.div
                        className="absolute inset-0"
                        animate={{ scale: hovered ? 1.08 : 1 }}
                        transition={{ duration: 0.9, ease: EASE }}
                    >
                        <Image src={way.image} alt={way.title} fill className="object-cover" />
                    </motion.div>


                    <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-24"
                        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.5) 60%, transparent 100%)' }}
                    />


                    <motion.span
                        aria-hidden
                        className="pointer-events-none absolute top-0 left-0 h-full w-1/3 -skew-x-12"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
                        initial={{ x: '-150%' }}
                        animate={{ x: hovered ? '350%' : '-150%' }}
                        transition={{ duration: 1, ease: EASE }}
                    />

                    <motion.div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(180deg, transparent 55%, ${way.accent}40 100%)` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                    />
                </div>

                <motion.span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 h-0.75 z-20"
                    style={{ background: way.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: hovered ? '100%' : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                />
            </motion.div>
        </motion.div>
    );
};

const WaysGetInvolvedSection = () => {
    return (
        <section className="w-full py-16 md:py-24" style={{ backgroundColor: '#FBF6EF' }}>
            <SectionHeading
                eyebrow="WAYS TO GET INVOLVED"
                title={
                    <>
                        Make a Meaningful <span style={{ color: GOLD }}>Impact</span>
                    </>
                }
                description="Every act of kindness brings us closer to a compassionate  and empowered community."
                titleColor={DARK_GREEN}
                maxWidth="max-w-3xl"
            />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
                className="container mx-auto px-5 md:px-10 mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 items-stretch"
            >
                {ways.map((way) => (
                    <WayCard key={way.title} way={way} />
                ))}
            </motion.div>
        </section>
    );
};

export default WaysGetInvolvedSection; 