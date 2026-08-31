"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import whatWeDoImg from '../../assets/images/aboutpage/what-we-do/what-we-do-img-bg.png';
import qouteIcon from '../../assets/images/aboutpage/what-we-do/qoute-icon.svg';
import mosqueIcon from '../../assets/images/aboutpage/what-we-do/mosque-icon.svg';
import educationIcon from '../../assets/images/aboutpage/what-we-do/education.svg';
import healthcareIcon from '../../assets/images/aboutpage/what-we-do/healthcare.svg';
import womenIcon from '../../assets/images/aboutpage/what-we-do/women-empowerment.svg';
import skillIcon from '../../assets/images/aboutpage/what-we-do/skill-development.svg';
import environmentIcon from '../../assets/images/aboutpage/what-we-do/environment.svg';
import hungerIcon from '../../assets/images/aboutpage/what-we-do/human-relief.svg';
import SectionHeading from '../common/SectionHeading';

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: 'spring', stiffness: 260, damping: 20 } as const;

type CardTokens = {
    cardBg: string;
    cardBorder: string;
    cardShadow: string;
    cardShadowHov: string;
    iconBg: string;
    iconBorder: string;
    iconShadow: string;
    text: string;
    divider: string;
};

const cardTokens: CardTokens[] = [
    {
        cardBg: 'linear-gradient(180deg, rgba(0, 2, 7, 0.08) 0%, rgba(78, 229, 209, 0.08) 71.83%)',
        cardBorder: '#437C7B',
        cardShadow: '0px 0px 12px 6px #4EE5D114',
        cardShadowHov: '0px 0px 28px 10px #4EE5D133',
        iconBg: '#07141794',
        iconBorder: '#437C7B',
        iconShadow: '0px 0px 17px 5px #4EE5D10D',
        text: '#47D7C6',
        divider: '#437C7B',
    },
    {
        cardBg: 'linear-gradient(180deg, rgba(0, 2, 7, 0.08) 0%, rgba(255, 196, 83, 0.08) 71.83%)',
        cardBorder: '#B6740D',
        cardShadow: '0px 0px 12px 6px #FFCE5A14',
        cardShadowHov: '0px 0px 28px 10px #FFCE5A33',
        iconBg: '#36240996',
        iconBorder: '#B6740D',
        iconShadow: '0px 0px 17px 5px #FFCE5A0D',
        text: '#FFCE5A',
        divider: '#BD8C3B',
    },
    {
        cardBg: 'linear-gradient(180deg, rgba(0, 2, 7, 0.08) 0%, rgba(233, 50, 135, 0.08) 71.83%)',
        cardBorder: '#BB2F65',
        cardShadow: '0px 0px 12px 6px #BB2F6514',
        cardShadowHov: '0px 0px 28px 10px #E9328733',
        iconBg: '#2E0B1B94',
        iconBorder: '#BB2F65',
        iconShadow: '0px 0px 17px 5px #E932870D',
        text: '#E93287',
        divider: '#BB2F65',
    },
    {
        cardBg: 'linear-gradient(180deg, rgba(0, 2, 7, 0.08) 0%, rgba(78, 229, 209, 0.08) 71.83%)',
        cardBorder: '#437C7B',
        cardShadow: '0px 0px 12px 6px #4EE5D114',
        cardShadowHov: '0px 0px 28px 10px #4EE5D133',
        iconBg: '#01272699',
        iconBorder: '#437C7B',
        iconShadow: '0px 0px 17px 5px #4EE5D10D',
        text: '#2CAFAC',
        divider: '#3D867E',
    },
    {
        cardBg: 'linear-gradient(180deg, rgba(0, 2, 7, 0.08) 0%, rgba(165, 212, 108, 0.08) 71.83%)',
        cardBorder: '#8A9358',
        cardShadow: '0px 0px 12px 6px #A9D66814',
        cardShadowHov: '0px 0px 28px 10px #A9D66833',
        iconBg: '#1A240E94',
        iconBorder: '#8A9358',
        iconShadow: '0px 0px 17px 5px #A9D6680D',
        text: '#A9D668',
        divider: '#6C7547',
    },
    {
        cardBg: 'linear-gradient(180deg, rgba(0, 2, 7, 0.08) 0%, rgba(247, 119, 30, 0.08) 71.83%)',
        cardBorder: '#C46F29',
        cardShadow: '0px 0px 12px 6px #F5761F14',
        cardShadowHov: '0px 0px 28px 10px #F5761F33',
        iconBg: '#3E1A0A94',
        iconBorder: '#C46F29',
        iconShadow: '0px 0px 17px 5px #F5761F0D',
        text: '#F5761F',
        divider: '#C46F29',
    },
];

type Program = {
    title: string;
    description: string;
    icon: any;
};

const programs: Program[] = [
    {
        title: 'Education',
        description: 'Scholarships, school fee support, uniforms and learning materials for children who would otherwise miss out on school.',
        icon: educationIcon,
    },
    {
        title: 'Healthcare',
        description: 'Free health check-ups, diagnostic camps and essential medicines for families unable to afford basic medical care.',
        icon: healthcareIcon,
    },
    {
        title: 'Women Empowerment',
        description: 'Vocational skills, tailoring centres and financial literacy that help women earn with dignity and support their families.',
        icon: womenIcon,
    },
    {
        title: 'Livelihood & Skills',
        description: 'Practical training, toolkits and mentorship helping youth and daily-wage earners build stable, resilient incomes.',
        icon: skillIcon,
    },
    {
        title: 'Environment & Sustainability',
        description: 'Tree plantations, water conservation drives and clean energy awareness across local communities.',
        icon: environmentIcon,
    },
    {
        title: 'Hunger Relief',
        description: 'Daily langar, food drives and dry ration distribution ensuring no one in our reach goes to sleep hungry.',
        icon: hungerIcon,
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 36, scale: 0.94 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: EASE },
    },
};

const DiamondDivider = ({ color }: { color: string }) => (
    <motion.div
        className="flex items-center gap-5 justify-center"
        initial={false}
    >
        <motion.span
            className="h-px w-8"
            style={{ backgroundColor: color, opacity: 0.6 }}
            variants={{ rest: { width: 32 }, hover: { width: 44 } }}
            transition={{ duration: 0.4, ease: EASE }}
        />
        <motion.span
            className="w-3 h-3 rotate-90 border"
            style={{ borderColor: color }}
            variants={{ rest: { rotate: 45, scale: 1 }, hover: { rotate: 225, scale: 1.4 } }}
            transition={{ duration: 0.5, ease: EASE }}
        />
        <motion.span
            className="h-px w-8"
            style={{ backgroundColor: color, opacity: 0.6 }}
            variants={{ rest: { width: 32 }, hover: { width: 44 } }}
            transition={{ duration: 0.4, ease: EASE }}
        />
    </motion.div>
);

const ArrowIcon = () => (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5955 5.70533H0.718047C0.514281 5.70533 0.343705 5.638 0.206319 5.50333C0.0687728 5.36883 0 5.20182 0 5.00233C0 4.80283 0.0687728 4.63583 0.206319 4.50132C0.343705 4.36666 0.514281 4.29933 0.718047 4.29933H11.5955L8.44351 1.21338C8.30118 1.07387 8.23089 0.9107 8.23265 0.723858C8.23456 0.537015 8.30485 0.370873 8.44351 0.22543C8.59207 0.0801431 8.76265 0.00507699 8.95524 0.00023409C9.148 -0.00460881 9.31865 0.0656914 9.46721 0.211135L13.7551 4.40923C13.8448 4.49703 13.908 4.58959 13.9447 4.68691C13.9816 4.78424 14 4.88938 14 5.00233C14 5.11528 13.9816 5.22041 13.9447 5.31774C13.908 5.41507 13.8448 5.50763 13.7551 5.59543L9.46721 9.79352C9.32472 9.93287 9.15566 10.0017 8.96003 9.99997C8.76424 9.99809 8.59207 9.92451 8.44351 9.77923C8.30485 9.63378 8.23305 9.46912 8.2281 9.28525C8.22315 9.10138 8.29496 8.93672 8.44351 8.79127L11.5955 5.70533Z" fill="#fff" />
    </svg>
);

const ProgramCard = ({ program, tokens }: { program: Program; tokens: CardTokens }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            variants={cardVariants}
            initial="rest"
            animate={hovered ? 'hover' : 'rest'}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -10, scale: 1.035 }}
            whileTap={{ scale: 0.98 }}
            transition={SPRING}
            className="group relative rounded-3xl px-5 py-9 flex flex-col items-center text-center overflow-hidden cursor-pointer"
            style={{
                background: tokens.cardBg,
                border: `1px solid ${tokens.cardBorder}`,
                backdropFilter: 'blur(6px)',
                boxShadow: hovered ? tokens.cardShadowHov : tokens.cardShadow,
                transition: 'box-shadow 0.5s ease',
            }}
        >
            <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-4xl blur-3xl"
                style={{ background: tokens.text }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 0.16 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
            />
            <motion.span
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 h-full w-1/3 -skew-x-12"
                style={{
                    background: `linear-gradient(90deg, transparent, ${tokens.text}33, transparent)`,
                }}
                initial={{ x: '-150%' }}
                animate={{ x: hovered ? '350%' : '-150%' }}
                transition={{ duration: 1.1, ease: EASE }}
            />

            <motion.div
                className="relative z-10 h-30 w-30 rounded-full flex items-center justify-center mb-10"
                style={{
                    background: tokens.iconBg,
                    border: `1px solid ${tokens.iconBorder}`,
                    backdropFilter: 'blur(34px)',
                    boxShadow: tokens.iconShadow,
                }}
                animate={{
                    scale: hovered ? 1.12 : 1,
                    rotate: hovered ? -8 : 0,
                }}
                transition={SPRING}
            >

                <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: `1px solid ${tokens.iconBorder}` }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={
                        hovered
                            ? { scale: [1, 1.6], opacity: [0, 0.5, 0] }
                            : { scale: 1, opacity: 0 }
                    }
                    transition={
                        hovered
                            ? {
                                duration: 1.4,
                                repeat: Infinity,
                                ease: 'easeOut',
                                repeatType: 'loop',
                            }
                            : { duration: 0.2, ease: 'easeOut' }
                    }
                />
                <motion.div
                    animate={{ y: hovered ? [0, -3, 0] : 0 }}
                    transition={{ duration: 1.6, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
                >
                    <Image src={program.icon} alt={program.title} width={42} height={42} />
                </motion.div>
            </motion.div>

            <motion.h3
                className="relative z-10 font-cormorant font-semibold text-xl md:text-2xl leading-snug mb-4"
                style={{ color: tokens.text }}
                animate={{ letterSpacing: hovered ? '0.01em' : '0em' }}
                transition={{ duration: 0.4 }}
            >
                {program.title}
            </motion.h3>

            <div className="relative z-10 mb-4 w-full">
                <DiamondDivider color={tokens.divider} />
            </div>

            <motion.p
                className="relative z-10 font-satoshi leading-relaxed md:px-5"
                style={{ color: '#fff' }}
                animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? -2 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
            >
                {program.description}
            </motion.p>

            <motion.span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 rounded-full"
                style={{ background: tokens.text, translateX: '-50%' }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: hovered ? '60%' : 0, opacity: hovered ? 0.9 : 0 }}
                transition={{ duration: 0.45, ease: EASE }}
            />
        </motion.div>
    );
};

const AboutWhatWeDo = () => {
    return (
        <section className="relative overflow-hidden bg-black">
            <div className="absolute inset-0">
                <Image
                    src={whatWeDoImg}
                    alt="Ajmer Sharif Dargah at night"
                    fill
                    priority
                    className="object-cover w-screen h-full"
                />
            </div>

            <div className="relative container mx-auto px-5 md:px-0 pt-20 md:pt-28 pb-16 flex flex-col items-center">
                <SectionHeading
                    eyebrow="WHAT WE DO"
                    eyebrowColor="#ffffff"
                    starColor="white"
                    title="Our Program Areas"
                    description="Building a brighter future through compassion, empowerment, and sustainable change."
                    titleColor="#ffffff"
                    descriptionColor="#ffffff"
                    maxWidth="max-w-3xl"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mt-16"
                >
                    {programs.map((p, i) => (
                        <ProgramCard key={p.title} program={p} tokens={cardTokens[i % cardTokens.length]} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    whileHover={{ y: -4 }}
                    className="relative md:max-w-5xl w-full self-center mt-14 rounded-3xl border border-dark-yellow/40 bg-white/5 backdrop-blur-md px-6 md:px-10 py-7 flex flex-col md:flex-row items-center gap-6 md:gap-8 overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_30px_8px_rgba(255,206,90,0.12)]"
                >

                    <motion.span
                        aria-hidden
                        className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full blur-3xl"
                        style={{ background: 'radial-gradient(circle, rgba(255,206,90,0.35) 0%, rgba(255,206,90,0) 70%)' }}
                        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.span
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -bottom-20 h-64 w-64 rounded-full blur-3xl"
                        style={{ background: 'radial-gradient(circle, rgba(78,229,209,0.25) 0%, rgba(78,229,209,0) 70%)' }}
                        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div className="relative z-10 flex items-start gap-3 flex-1">
                        <motion.div
                            animate={{ rotate: [0, -6, 0, 6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Image src={qouteIcon.src} alt="qouteIcon" width={44} height={44} />
                        </motion.div>
                        <p className="font-satoshi text-white text-xl leading-snug">
                            &ldquo;Love Towards All, Malice Towards None.&rdquo;
                        </p>
                    </div>

                    <span className="relative z-10 hidden md:block w-px self-stretch bg-white/20" />

                    <div className="relative z-10 flex items-center gap-3">
                        <Image src={mosqueIcon} alt="mosqueIcon" width={44} height={44} />
                        <div>
                            <p className="font-satoshi text-light-yellow text-sm">Inspired By The Spirit Of</p>
                            <p className="font-satoshi text-light-yellow font-bold text-base md:text-lg">Hazrat Khwaja Moinuddin Hasan Chishty (R.A.), Ajmer Sharif</p>
                        </div>
                    </div>


                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="group relative z-10 inline-flex items-center gap-3 h-13 pl-6 pr-2 rounded-2xl border border-[#fbd27268] bg-[#FBD1723B] backdrop-blur-sm text-white font-satoshi font-semibold shrink-0 overflow-hidden"
                    >
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-linear-to-r from-transparent via-dark-yellow/25 to-transparent"
                        />
                        <span className="relative z-10">Join Our Mission</span>
                        <motion.span
                            className="relative z-10 h-9 w-9 rounded-full bg-dark-yellow/90 flex items-center justify-center text-dark-green"
                            whileHover={{ x: 3 }}
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ArrowIcon />
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutWhatWeDo;