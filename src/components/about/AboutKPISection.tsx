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


const StatItem = ({ stat, isFirst, isLast }: { stat: Stat; isFirst: boolean; isLast: boolean }) => {
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
            className="relative flex items-center gap-4 py-2 md:py-0 md:px-8 first:pl-0 last:pr-0"
        >
            {!isFirst && (
                <span
                    aria-hidden
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-22 w-0.5"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(244,203,142,0.35) 50%, transparent 100%)',
                    }}
                />
            )}

            <motion.div
                className="relative h-16 w-16 md:h-22 md:w-22 shrink-0 rounded-full flex items-center justify-center"
                style={{ border: `1.5px solid ${GOLD}` }}
                animate={{
                    scale: hovered ? 1.08 : 1,
                    boxShadow: hovered ? `0px 0px 22px 2px ${GOLD}55` : '0px 0px 0px 0px transparent',
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
                            ? { scale: [1, 1.5], opacity: [0.5, 0] }
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
                    <Image src={stat.icon} alt={stat.label} width={40} height={40} />
                </motion.div>
            </motion.div>

            <div className="text-left">
                <motion.p
                    className="font-satoshi font-extrabold text-white text-[28px] md:text-[34px] leading-none tabular-nums"
                    animate={{ color: hovered ? GOLD : '#FFFFFF' }}
                    transition={{ duration: 0.35, ease: EASE }}
                >
                    {count.toFixed(stat.decimals ?? 0)}
                    {stat.suffix}
                </motion.p>
                <p className="font-satoshi text-white/70 text-sm md:text-[15px] mt-2 whitespace-nowrap">
                    {stat.label}
                </p>
            </div>
        </motion.div>
    );
};

const AboutKPISection = () => {
    return (
        <section className="relative w-full overflow-hidden" style={{ backgroundColor: '#0A3231' }}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="relative container mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-6"
            >

                <motion.div variants={itemVariants} className="shrink-0 text-center lg:text-left">
                    <p
                        className="font-satoshi font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-3"
                        style={{ color: GOLD }}
                    >
                        Our Impacts In Numbers
                    </p>
                    <h2 className="font-cormorant text-white text-3xl md:text-[42px] leading-[1.15]">
                        Together, We
                        <br />
                        Create Change
                    </h2>
                </motion.div>


                <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-y-8 gap-x-6 md:gap-0">
                    {stats.map((stat, i) => (
                        <StatItem key={stat.label} stat={stat} isFirst={i === 0} isLast={i === stats.length - 1} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AboutKPISection;