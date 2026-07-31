"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import liveImpact from '../../assets/images/homepage/aboutsection/live-impact.svg';
import mealsDistributed from '../../assets/images/homepage/aboutsection/meals-distributed.svg';
import studentsSupported from '../../assets/images/homepage/aboutsection/students-supported.svg';
import medicalCamps from '../../assets/images/homepage/aboutsection/medical-camps.svg';

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = '#F4CB8E';

type Stat = {
    icon: any;
    value: number;
    decimals?: number;
    suffix: string;
    label: string;
};

const stats: Stat[] = [
    { icon: liveImpact, value: 450, suffix: 'K+', label: 'Lives Impacted' },
    { icon: mealsDistributed, value: 2.5, decimals: 1, suffix: 'M+', label: 'Meals Distributed' },
    { icon: studentsSupported, value: 15, suffix: 'K+', label: 'Students Supported' },
    { icon: medicalCamps, value: 850, suffix: '+', label: 'Medical Camps' },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const useCountUp = (value: number, inView: boolean, duration = 1.6) => {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let raf: number;
        let start: number | null = null;

        const tick = (ts: number) => {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(eased * value);
            if (progress < 1) raf = requestAnimationFrame(tick);
            else setDisplay(value);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, value, duration]);

    return display;
};


const StatItem = ({ stat, isFirst }: { stat: Stat; isFirst: boolean }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [hovered, setHovered] = useState(false);
    const count = useCountUp(stat.value, inView);

    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className={`relative flex items-center gap-3 sm:gap-4 py-2 lg:py-0 w-full justify-start ${!isFirst ? 'lg:border-l lg:border-[#F4CB8E]/25 lg:pl-4 xl:pl-6' : ''
                }`}
        >
            <motion.div
                className="relative h-12 w-12 sm:h-14 sm:w-14 xl:h-16 xl:w-16 shrink-0 rounded-full flex items-center justify-center"
                style={{ border: `1.5px solid ${GOLD}` }}
                animate={{
                    scale: hovered ? 1.08 : 1,
                    boxShadow: hovered ? `0px 0px 18px 2px ${GOLD}55` : '0px 0px 0px 0px transparent',
                }}
                transition={{ duration: 0.4, ease: EASE }}
            >
                <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: `1px solid ${GOLD}` }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={
                        hovered
                            ? { scale: [1, 1.4], opacity: [0.5, 0] }
                            : { scale: 1, opacity: 0 }
                    }
                    transition={
                        hovered
                            ? { duration: 1.3, repeat: Infinity, ease: 'easeOut' }
                            : { duration: 0.2, ease: 'easeOut' }
                    }
                />
                <motion.div
                    animate={{ rotate: hovered ? -8 : 0, scale: hovered ? 1.1 : 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                >
                    <Image src={stat.icon} alt={stat.label} width={32} height={32} className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8" />
                </motion.div>
            </motion.div>

            <div className="text-left min-w-0 flex-1">
                <motion.p
                    className="font-satoshi font-extrabold text-white text-xl sm:text-2xl xl:text-3xl leading-none tabular-nums"
                    animate={{ color: hovered ? GOLD : '#FFFFFF' }}
                    transition={{ duration: 0.35, ease: EASE }}
                >
                    {count.toFixed(stat.decimals ?? 0)}
                    {stat.suffix}
                </motion.p>
                <p className="font-satoshi text-white/70 text-xs sm:text-sm mt-1 sm:mt-1.5 leading-snug whitespace-normal">
                    {stat.label}
                </p>
            </div>
        </motion.div>
    );
};

const AboutKPISection = () => {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="relative container mx-auto rounded-[28px] md:rounded-[36px] overflow-hidden px-5 sm:px-8 lg:px-10 py-8 md:py-12 lg:py-14 flex flex-col 2xl:flex-row items-center justify-between gap-8 2xl:gap-6 shadow-xl"
                style={{ backgroundColor: '#0A3231' }}
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 opacity-30"
                    style={{
                        background:
                            'radial-gradient(800px circle at 10% 20%, rgba(244,203,142,0.15), transparent 70%)',
                    }}
                />

                <motion.div variants={itemVariants} className="relative mb-5 z-10 shrink-0 text-center 2xl:text-left">
                    <p
                        className="font-satoshi font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-2"
                        style={{ color: GOLD }}
                    >
                        Our Impacts In Numbers
                    </p>
                    <h2 className="font-cormorant text-white text-3xl sm:text-4xl lg:text-[42px] leading-[1.15]">
                        Together, We
                        <br className="hidden 2xl:inline" />
                        {' '}Create Change
                    </h2>
                </motion.div>

                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-4 xl:gap-6 w-full 2xl:w-auto">
                    {stats.map((stat, i) => (
                        <StatItem key={stat.label} stat={stat} isFirst={i === 0} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AboutKPISection;