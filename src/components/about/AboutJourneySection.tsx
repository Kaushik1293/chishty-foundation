"use client";

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import greenPattern from '../../assets/images/aboutpage/our-journey/green-pattern.svg';
import map from '../../assets/images/aboutpage/our-journey/map.svg';
import Icon2007 from '../../assets/images/aboutpage/our-journey/2007-icon.svg';
import Icon2010 from '../../assets/images/aboutpage/our-journey/2010-icon.svg';
import Icon2015 from '../../assets/images/aboutpage/our-journey/2015-icon.svg';
import Icon2020 from '../../assets/images/aboutpage/our-journey/2020-icon.svg';
import Icon2024 from '../../assets/images/aboutpage/our-journey/2024-icon.svg';

const EASE = [0.16, 1, 0.3, 1] as const;

const milestones = [
    {
        year: '2007',
        icon: Icon2007,
        bg: 'bg-dark-yellow',
        description: 'Foundation established with a vision to serve humanity.',
    },
    {
        year: '2010',
        icon: Icon2010,
        bg: 'bg-dark-green',
        description: 'Expanded education and healthcare programs.',
    },
    {
        year: '2015',
        icon: Icon2015,
        bg: 'bg-dark-yellow',
        description: 'Reached 100+ communities across regions.',
    },
    {
        year: '2020',
        icon: Icon2020,
        bg: 'bg-dark-green',
        description: 'Strengthened global partnerships and sustainability efforts.',
    },
    {
        year: '2024+',
        icon: Icon2024,
        bg: 'bg-dark-yellow',
        description: 'Continuing the mission with more impact, together.',
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const milestoneVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE, delay: i * 0.12 },
    }),
};

const DiamondIcon = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" width="7.07" height="7.07" transform="rotate(45 5 0)" fill="#BD8C3B" />
    </svg>
);

const TriangleMarker = () => (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8L0 0H12L6 8Z" fill="#BD8C3B" />
    </svg>
);

const AboutJourneySection = () => {
    return (
        <section className="relative overflow-hidden bg-[#FDFBF8]">
            <div className="grid lg:grid-cols-[36%_64%]">

                {/* Left panel */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative bg-dark-green px-10 md:px-16 py-10 md:py-0 flex flex-col justify-center overflow-hidden"
                >
                    <Image
                        src={greenPattern}
                        alt=""
                        width={800}
                        height={200}
                        className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none select-none w-[50%] max-w-175 h-auto"
                    />
                    <motion.div variants={fadeUp} className="relative flex items-center gap-3 mb-7">
                        <span className="h-px w-9 bg-dark-yellow/60" />
                        <DiamondIcon />
                        <span className="font-satoshi text-xs tracking-[0.2em] text-dark-yellow font-semibold uppercase">
                            Our Journey
                        </span>
                        <DiamondIcon />
                        <span className="h-px w-9 bg-dark-yellow/60" />
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        className="relative font-cormorant font-semibold text-white text-4xl md:text-5xl leading-[1.15] mb-6 max-w-sm"
                    >
                        A Legacy Of Service That Continues
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="relative font-satoshi text-white/80 text-base leading-relaxed mb-10 max-w-sm"
                    >
                        Founded in 2007 by Haji Syed Salman Chishty, Chishty Foundation began with a
                        simple yet powerful vision - to serve humanity through selfless action and
                        spiritual values.
                    </motion.p>

                    <motion.div variants={fadeUp} className="relative">
                        <p className="font-dancing-script text-white text-3xl mb-2">
                            Haji Syed Salman Chishty
                        </p>
                        <p className="font-satoshi text-dark-yellow text-xs tracking-[0.2em] font-semibold uppercase">
                            Founder
                        </p>
                    </motion.div>
                </motion.div>

                <div className="relative px-8 md:px-14 py-16 md:py-24 flex items-center overflow-hidden">
                    <Image
                        src={map}
                        alt=""
                        fill
                        className="object-cover object-center opacity-[0.08] pointer-events-none select-none"
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative w-full grid grid-cols-3 sm:grid-cols-5 gap-y-14 gap-x-3"
                    >
                        {milestones.map((m, i) => (
                            <motion.div
                                key={m.year}
                                custom={i}
                                variants={milestoneVariants}
                                className="relative flex flex-col items-center text-center"
                            >
                                {i < milestones.length - 1 && (
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.35 + i * 0.12, ease: EASE }}
                                        style={{ originX: 0 }}
                                        className="hidden sm:block absolute top-11 left-[calc(50%+2.75rem)] w-[calc(100%-3rem)] border-t-2 border-dotted border-dark-yellow/60"
                                    />
                                )}

                                <motion.div
                                    whileHover={{ scale: 1.06 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    className="relative z-10 h-22 w-22 rounded-full p-1 border border-dark-yellow/70"
                                >
                                    <div
                                        className={`h-full w-full rounded-full ${m.bg} flex items-center justify-center`}
                                    >
                                        <Image src={m.icon} alt={m.year} width={30} height={30} />
                                    </div>
                                </motion.div>

                                <span className="w-px h-8 border-l-2 border-dotted border-dark-yellow/60 my-2" />

                                <TriangleMarker />

                                <span className="font-cormorant font-bold text-dark-yellow text-2xl md:text-3xl mt-3 mb-2">
                                    {m.year}
                                </span>
                                <p className="font-satoshi text-dark-green/70 text-sm leading-relaxed max-w-38">
                                    {m.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutJourneySection;