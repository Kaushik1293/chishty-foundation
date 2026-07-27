"use client";

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import sectionBg from '../../assets/images/getinvolvedpage/why-us/why-get-section-bg.png';
import support from '../../assets/images/getinvolvedpage/why-us/support.svg';
import faith from '../../assets/images/getinvolvedpage/why-us/faith.svg';
import heritage from '../../assets/images/getinvolvedpage/why-us/heritage.svg';
import rightPattern from '../../assets/images/getinvolvedpage/why-us/card-right-pattern.svg';
import SectionHeading from '../common/SectionHeading';

import halfPattern from '../../assets/images/homepage/vectors/common/half-patter-horizontal.svg';
import goldDivider from '../../assets/images/homepage/vectors/common/gold-divider.png';

const EASE = [0.16, 1, 0.3, 1] as const;

type Reason = {
    title: string;
    description: string;
    icon: any;
    iconBg: string;
    ringColor: string;
    glow: string;
};

const reasons: Reason[] = [
    {
        title: 'Support The Needy',
        description:
            'Your contribution helps us provide food, shelter, education and healthcare to those in need.',
        icon: support,
        iconBg: 'bg-dark-yellow',
        ringColor: 'border-dark-yellow',
        glow: 'shadow-[0_0_30px_-6px_rgba(189,140,59,0.55)]',
    },
    {
        title: 'Strengthen Your Faith',
        description:
            "Sadaqah and service purify the heart and bring us closer to Allah's blessings.",
        icon: faith,
        iconBg: 'bg-dark-green',
        ringColor: 'border-dark-green',
        glow: 'shadow-[0_0_30px_-6px_rgba(26,107,78,0.55)]',
    },
    {
        title: 'Preserve Our Heritage',
        description:
            'Help us protect and preserve the spiritual and cultural legacy for future generations.',
        icon: heritage,
        iconBg: 'bg-[#8A1538]',
        ringColor: 'border-[#8A1538]',
        glow: 'shadow-[0_0_30px_-6px_rgba(138,21,56,0.55)]',
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const WhyGetInvolved = () => {
    return (
        <section className="relative overflow-hidden bg-beige">
            <div className="absolute inset-0">
                <Image
                    src={sectionBg}
                    alt=""
                    fill
                    className="object-cover object-top opacity-90 pointer-events-none select-none"
                />
            </div>

            <div className="relative container mx-auto px-5 md:px-0 pt-20 md:pt-28 pb-10">
                <SectionHeading
                    hideDivider={true}
                    eyebrow="Why Get Involved"
                    title={
                        <>
                            Your Involvement <br /> Creates Impact
                        </>
                    }
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-3 gap-16  mt-16"
                >
                    {reasons.map((r, i) => (
                        <motion.div
                            key={r.title}
                            variants={cardVariants}
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            className="group relative overflow-hidden rounded-[1.75rem] bg-white border border-[#F1E1D2] px-7 pt-8 pb-9 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] transition-shadow duration-500 hover:shadow-[0_18px_40px_-12px_rgba(189,140,59,0.25)]"
                        >
                            
                            <motion.div
                                className="absolute bottom-[20%] right-0 w-26 h-52 pointer-events-none select-none"
                            >
                                <Image src={rightPattern} alt="" fill className="object-contain" />
                            </motion.div>

                            
                            <motion.div
                                variants={{
                                    rest: { scale: 1, rotate: 0 },
                                    hover: { scale: 1.08, rotate: 6 },
                                }}
                                transition={{ duration: 0.45, ease: EASE }}
                                className={`relative z-10 h-26 w-26 rounded-full p-1 border ${r.ringColor} mb-7 transition-shadow duration-500 group-hover:${r.glow}`}
                            >
                                <div
                                    className={`h-full w-full rounded-full ${r.iconBg} flex items-center justify-center`}
                                >
                                    <motion.div
                                        variants={{
                                            rest: { rotate: 0 },
                                            hover: { rotate: -8 },
                                        }}
                                        transition={{ duration: 0.45, ease: EASE }}
                                    >
                                        <Image src={r.icon} alt={r.title} width={50} height={50} />
                                    </motion.div>
                                </div>
                            </motion.div>

                            <h3 className="relative z-10 font-cormorant font-semibold text-dark-green text-2xl mb-3">
                                {r.title}
                            </h3>

                            <div className="relative z-10 flex items-center gap-2.5 mb-4 max-w-36">
                                <span className="h-px flex-1 bg-dark-yellow/50" />
                                <motion.span
                                    variants={{
                                        rest: { scale: 1 },
                                        hover: { scale: 1.4 },
                                    }}
                                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                                    className="w-1.5 h-1.5 rotate-45 bg-dark-green shrink-0"
                                />
                                <span className="h-px flex-1 bg-dark-yellow/50" />
                            </div>

                            <p className="relative z-10 font-satoshi text-dark-green/65 text-[0.95rem] leading-relaxed max-w-xs">
                                {r.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="relative w-full flex flex-col items-center justify-center">
                <img src={halfPattern.src} alt="" className="w-48 md:w-80" />
                <img src={goldDivider.src} alt="" className="w-full" />
            </div>
        </section>
    );
};

export default WhyGetInvolved;