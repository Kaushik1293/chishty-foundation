"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import HeroBgDesktop from '../../../assets/images/homepage/herosection/hero-img-2.png';
import HeroBgMobile from '../../../assets/images/homepage/herosection/mobile-hero-2.png';
import PrimaryButton from '../../common/PrimaryButton';
import halfPattern from '../../../assets/images/homepage/vectors/common/half-pattern.svg';
import greenStar from '../../../assets/images/homepage/vectors/common/green-star.svg';
import fb from '../../../assets/images/homepage/vectors/social-media/fb-gold.svg';
import insta from '../../../assets/images/homepage/vectors/social-media/insta-gold.svg';
import youtube from '../../../assets/images/homepage/vectors/social-media/yt-gold.svg';
import wp from '../../../assets/images/homepage/vectors/social-media/wp-gold.svg';
import twitter from '../../../assets/images/homepage/vectors/social-media/x-gold.svg';
import quotes from '../../../assets/images/homepage/vectors/common/quotes-icon.svg';

const socialLinks = [
    { icon: fb, label: 'Facebook', href: 'https://www.facebook.com/chishtyfoundation/' },
    { icon: insta, label: 'Instagram', href: 'https://www.instagram.com/chishtyfoundation/' },
    { icon: youtube, label: 'YouTube', href: 'https://www.youtube.com/@SufiMusafir' },
    { icon: wp, label: 'WhatsApp', href: 'https://wa.me/919829174973' },
    { icon: twitter, label: 'X', href: 'https://x.com/sufimusafir' },
];


const sparkles = [
    { top: '18%', left: '8%', size: 6, delay: 0, duration: 7 },
    { top: '32%', left: '42%', size: 4, delay: 1.4, duration: 8.5 },
    { top: '60%', left: '20%', size: 5, delay: 2.6, duration: 6.5 },
    { top: '75%', left: '48%', size: 4, delay: 0.8, duration: 9 },
];

const EASE = [0.16, 1, 0.3, 1] as const;


const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.13,
            delayChildren: 0.15,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const wordVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.65, ease: EASE },
    },
};

const headlineContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.35 },
    },
};

const AnimatedLine = ({ text, className }: { text: string; className: string }) => (
    <span className={`block ${className}`}>
        <motion.span variants={headlineContainer} className="inline-block">
            {text.split(' ').map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    variants={wordVariants}
                    className="inline-block mr-[0.28em] last:mr-0"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    </span>
);

type SocialLink = { icon: any; label: string; href: string };

const socialIconVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: EASE },
    },
};

const MagneticSocialIcon = ({ social, index }: { social: SocialLink; index: number }) => {
    const ref = useRef<HTMLAnchorElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

    const iconX = useTransform(springX, (v) => v * 0.6);
    const iconY = useTransform(springY, (v) => v * 0.6);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        const strength = 0.35;
        x.set(relX * strength);
        y.set(relY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={socialIconVariants}
            style={{ x: springX, y: springY }}
            className="group relative md:h-16 md:w-16 w-14 h-14 flex items-center justify-center"
        >
            <motion.span
                aria-hidden
                initial={{ opacity: 0, rotate: 0 }}
                whileHover={{ opacity: 1, rotate: 360 }}
                transition={{
                    opacity: { duration: 0.3 },
                    rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                }}
                className="absolute inset-0 rounded-full p-[1.5px]"
                style={{
                    background:
                        'conic-gradient(from 0deg, #BD8C3B, transparent 30%, transparent 70%, #BD8C3B)',
                }}
            >
                <span className="block h-full w-full rounded-full bg-beige" />
            </motion.span>

            <span className="absolute inset-0 rounded-full bg-white/30 border border-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/50" />

            <motion.span
                aria-hidden
                initial={{ opacity: 0, scale: 0.6 }}
                whileHover={{ opacity: 1, scale: 1.3 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0 rounded-full bg-dark-yellow/30 blur-xl -z-10"
            />

            <motion.div style={{ x: iconX, y: iconY }} className="relative z-10">
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2 + index * 0.25,
                    }}
                    whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                >
                    <Image src={social.icon} alt={social.label} />
                </motion.div>
            </motion.div>
        </motion.a>
    );
};

const HeroBanner = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
    const imageScrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

    return (
        <section ref={sectionRef} id="home" className="relative overflow-hidden bg-beige">
            <motion.div
                aria-hidden
                className="hidden lg:block absolute -top-24 left-[10%] w-105 h-105 rounded-full bg-dark-yellow/10 blur-3xl pointer-events-none"
                animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                aria-hidden
                className="hidden lg:block absolute bottom-0 left-[28%] w-[320px] h-80 rounded-full bg-dark-green/10 blur-3xl pointer-events-none"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />

            {sparkles.map((s, i) => (
                <motion.span
                    key={i}
                    aria-hidden
                    className="hidden lg:block absolute rounded-full bg-dark-yellow pointer-events-none"
                    style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
                    animate={{ y: [0, -18, 0], opacity: [0, 0.8, 0] }}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: s.delay,
                    }}
                />
            ))}

            <div className="hidden lg:block absolute top-0 right-0 h-full w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    style={{ y: imageY, scale: imageScrollScale }}
                    className="relative h-full w-full"
                >
    
                    <motion.div
                        className="relative h-full w-full"
                        animate={{ scale: [1, 1.035, 1] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Image
                            src={HeroBgDesktop}
                            alt="Chishty Foundation shrine at sunset"
                            fill
                            priority
                            draggable={false}
                            className="object-cover pointer-events-none select-none"
                        />
                    </motion.div>
                </motion.div>
            </div>

            <div className="lg:hidden absolute inset-0">
                <motion.div
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="relative h-full w-full"
                >
                    <motion.div
                        className="relative h-full w-full"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Image
                            src={HeroBgMobile}
                            alt="Chishty Foundation shrine at sunset"
                            fill
                            priority
                            className="object-cover"
                        />
                    </motion.div>
                </motion.div>
            </div>

            <div className="container relative mx-auto md:px-0 px-5 pt-32 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-2 gap-10 items-center"
                >
    
                    <div className="relative z-10 max-w-xl">
        
                        <motion.div variants={fadeUp}>
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                                className="inline-flex items-center gap-2.5 bg-white rounded-full px-5 py-2.5 shadow-sm mb-8"
                            >
                                <motion.svg
                                    width="20"
                                    height="15"
                                    viewBox="0 0 24 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    initial={{ rotate: -12, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                                >
                                    <path d="M0 15.2619C0 14.6272 0.156444 14.0608 0.469331 13.5627C0.782219 13.0645 1.20009 12.677 1.72294 12.4001C2.84079 11.8276 3.96481 11.3862 5.09501 11.0758C6.2254 10.7657 7.46764 10.6106 8.82172 10.6106C10.176 10.6106 11.4182 10.7657 12.5484 11.0758C13.6788 11.3862 14.803 11.8276 15.9208 12.4001C16.4436 12.677 16.8615 13.0645 17.1744 13.5627C17.4873 14.0608 17.6437 14.6272 17.6437 15.2619V16.1289C17.6437 16.6246 17.4699 17.0604 17.1224 17.4362C16.7748 17.8121 16.3529 18 15.8567 18H1.78675C1.29076 18 0.868969 17.818 0.521381 17.4541C0.173794 17.09 0 16.6482 0 16.1289V15.2619ZM22.2132 18H19.5416C19.6895 17.7174 19.8022 17.4165 19.8798 17.0976C19.9575 16.7786 19.9963 16.4557 19.9963 16.1289V15.1104C19.9963 14.3021 19.8073 13.5317 19.4293 12.7991C19.0511 12.0667 18.5148 11.4383 17.8202 10.9139C18.6089 11.037 19.3577 11.2276 20.0666 11.4856C20.7753 11.7438 21.4516 12.049 22.0956 12.401C22.7034 12.7405 23.1727 13.1406 23.5036 13.6015C23.8345 14.0621 24 14.5651 24 15.1104V16.1289C24 16.6482 23.8262 17.09 23.4786 17.4541C23.131 17.818 22.7092 18 22.2132 18ZM5.91163 7.3574C5.10726 6.51521 4.70508 5.49957 4.70508 4.31049C4.70508 3.12162 5.10726 2.10598 5.91163 1.26359C6.7162 0.421196 7.68623 0 8.82172 0C9.95741 0 10.9274 0.421196 11.7318 1.26359C12.5364 2.10598 12.9387 3.12162 12.9387 4.31049C12.9387 5.49957 12.5364 6.51521 11.7318 7.3574C10.9274 8.19979 9.95741 8.62098 8.82172 8.62098C7.68623 8.62098 6.7162 8.19979 5.91163 7.3574ZM17.769 7.3574C16.9629 8.19979 15.9937 8.62098 14.8616 8.62098C14.7288 8.62098 14.56 8.60518 14.3549 8.57357C14.1496 8.54196 13.9807 8.50727 13.8482 8.4695C14.3121 7.88553 14.6686 7.23773 14.9177 6.52609C15.1667 5.81444 15.2912 5.0755 15.2912 4.30926C15.2912 3.54281 15.1642 2.80664 14.9101 2.10075C14.656 1.39506 14.3021 0.745407 13.8482 0.151791C14.017 0.0885701 14.1859 0.0475178 14.3549 0.0286338C14.5237 0.00954444 14.6926 0 14.8616 0C15.9937 0 16.9629 0.421196 17.769 1.26359C18.5751 2.10598 18.9782 3.12162 18.9782 4.31049C18.9782 5.49957 18.5751 6.51521 17.769 7.3574ZM1.76411 16.1526H15.8793V15.2619C15.8793 15.0047 15.8179 14.7759 15.695 14.5753C15.5722 14.3748 15.3774 14.1995 15.1103 14.0494C14.1423 13.5268 13.1455 13.1309 12.12 12.8616C11.0945 12.5925 9.99505 12.4579 8.82172 12.4579C7.64859 12.4579 6.54927 12.5925 5.52376 12.8616C4.49825 13.1309 3.50146 13.5268 2.53339 14.0494C2.26638 14.1995 2.07141 14.3748 1.94849 14.5753C1.82557 14.7759 1.76411 15.0047 1.76411 15.2619V16.1526ZM10.4832 6.05008C10.9439 5.56772 11.1743 4.98786 11.1743 4.31049C11.1743 3.63313 10.9439 3.05327 10.4832 2.5709C10.0225 2.08854 9.46867 1.84735 8.82172 1.84735C8.17477 1.84735 7.62095 2.08854 7.16024 2.5709C6.69954 3.05327 6.46918 3.63313 6.46918 4.31049C6.46918 4.98786 6.69954 5.56772 7.16024 6.05008C7.62095 6.53245 8.17477 6.77363 8.82172 6.77363C9.46867 6.77363 10.0225 6.53245 10.4832 6.05008Z" fill="#BD8C3B" />
                                </motion.svg>
                                <span className="font-satoshi text-sm text-dark-green font-medium">
                                    Compassion In Action
                                </span>
                            </motion.div>
                        </motion.div>

        
                        <motion.h1
                            variants={fadeUp}
                            className="font-cormorant font-semibold mb-6"
                        >
                            <AnimatedLine text="Lighting Lives," className="text-dark-green text-5xl md:text-6xl xl:text-7xl" />
                            <AnimatedLine text="Inspiring Humanity" className="text-dark-yellow text-5xl md:text-6xl xl:text-7xl" />
                        </motion.h1>

        
                        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6 max-w-sm">
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
                                style={{ originX: 0 }}
                                className="h-px flex-1 bg-dark-yellow"
                            />
                            <motion.div
                                initial={{ rotate: 0, opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8, ease: EASE }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 1.8 }}
                                >
                                    <Image src={greenStar} alt="" width={20} height={20} />
                                </motion.div>
                            </motion.div>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
                                style={{ originX: 1 }}
                                className="h-px flex-1 bg-dark-yellow"
                            />
                        </motion.div>

        
                        <motion.p
                            variants={fadeUp}
                            className="font-satoshi text-dark-green/80 text-base md:text-lg mb-8 max-w-md"
                        >
                            Empowering communities through education, healthcare, women upliftment,
                            and humanitarian aid.
                        </motion.p>

        
                        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.25, ease: EASE }}
                            >
                
                                <motion.span
                                    aria-hidden
                                    className="absolute inset-0 rounded-full bg-dark-yellow/40 blur-md -z-10"
                                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.06, 1] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                                />
                                <Link href="/causes">
                                    <PrimaryButton
                                        text="Explore Our Causes"
                                        icon={
                                            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.5955 5.70533H0.718047C0.514281 5.70533 0.343705 5.638 0.206319 5.50333C0.0687728 5.36883 0 5.20182 0 5.00233C0 4.80283 0.0687728 4.63583 0.206319 4.50132C0.343705 4.36666 0.514281 4.29933 0.718047 4.29933H11.5955L8.44351 1.21338C8.30118 1.07387 8.23089 0.9107 8.23265 0.723858C8.23456 0.537015 8.30485 0.370873 8.44351 0.22543C8.59207 0.0801431 8.76265 0.00507699 8.95524 0.00023409C9.148 -0.00460881 9.31865 0.0656914 9.46721 0.211135L13.7551 4.40923C13.8448 4.49703 13.908 4.58959 13.9447 4.68691C13.9816 4.78424 14 4.88938 14 5.00233C14 5.11528 13.9816 5.22041 13.9447 5.31774C13.908 5.41507 13.8448 5.50763 13.7551 5.59543L9.46721 9.79352C9.32472 9.93287 9.15566 10.0017 8.96003 9.99997C8.76424 9.99809 8.59207 9.92451 8.44351 9.77923C8.30485 9.63378 8.23305 9.46912 8.2281 9.28525C8.22315 9.10138 8.29496 8.93672 8.44351 8.79127L11.5955 5.70533Z" fill="white" />
                                            </svg>
                                        }
                                    />
                                </Link>
                            </motion.div>

                            <motion.a
                                href="#our-story"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.25, ease: EASE }}
                                className="group flex items-center gap-3 h-14 pl-6 pr-2 rounded-3xl border border-dark-green font-satoshi text-dark-green font-medium hover:bg-dark-green/5 transition-colors duration-300"
                            >
                                View Our Story
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 2 }}
                                    className="h-10 w-10 rounded-full bg-dark-yellow flex items-center justify-center shrink-0"
                                >
                                    <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 11.8387V1.16127C0 0.80928 0.119196 0.527739 0.357589 0.316644C0.595981 0.105548 0.874228 0 1.19233 0C1.2964 0 1.40182 0.0134179 1.50859 0.0402542C1.61561 0.0668508 1.72115 0.106864 1.82521 0.160297L10.449 5.52671C10.6328 5.65202 10.7706 5.79495 10.8624 5.95549C10.9541 6.11579 11 6.29729 11 6.5C11 6.70271 10.9541 6.88421 10.8624 7.04451C10.7706 7.20505 10.6328 7.34798 10.449 7.47329L1.82521 12.8397C1.72115 12.8931 1.61561 12.9331 1.50859 12.9597C1.40182 12.9866 1.2964 13 1.19233 13C0.874228 13 0.595981 12.8945 0.357589 12.6834C0.119196 12.4723 0 12.1907 0 11.8387Z" fill="white" />
                                    </svg>
                                </motion.span>
                            </motion.a>
                        </motion.div>

        
                        <motion.div variants={fadeUp}>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-dancing-script text-2xl text-dark-yellow">
                                    Stay Connected
                                </span>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
                                    style={{ originX: 0 }}
                                    className="h-px flex-1 max-w-35 bg-dark-yellow/40"
                                />
                            </div>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delayChildren: 1.2, staggerChildren: 0.08 }}
                                className="flex items-center gap-3"
                            >
                                {socialLinks.map((social, i) => (
                                    <MagneticSocialIcon key={social.label} social={social} index={i} />
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

    
                    <div className="hidden lg:block" />
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1, duration: 0.9, ease: EASE }}
                    className="relative lg:absolute lg:bottom-30 lg:right-8 xl:right-16 mt-10 lg:mt-0 md:w-lg ml-auto lg:ml-0"
                >
                    <motion.div
                        animate={{ y: [0, -7, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
                        whileHover={{ y: -4 }}
                        className="bg-white/60 backdrop-blur-lg rounded-3xl border border-white/60 p-6 md:p-7 shadow-xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 1.25, duration: 0.6, ease: EASE }}
                        >
                            <Image src={quotes} alt="" width={28} height={22} className="mb-3" />
                        </motion.div>
                        <p className="font-satoshi text-dark-green text-sm md:text-base leading-relaxed font-medium mb-4 md:max-w-sm">
                            &ldquo;Love Towards All, Malice Towards None.&rdquo;
                        </p>
                        <p className="font-dancing-script text-dark-yellow text-lg font-bold">
                            — Sultan ul Hind, Hazrat Khwaja Moinuddin Hasan Chishty (R.A.)
                        </p>
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="hidden md:block absolute bottom-1/12 right-0 opacity-70 pointer-events-none"
                    >
                        <Image src={halfPattern} alt="" width={60} height={60} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroBanner;