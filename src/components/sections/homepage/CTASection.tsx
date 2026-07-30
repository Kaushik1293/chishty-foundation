"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import ctaImage from '../../../assets/images/homepage/ctasection/cta-img.png';
import trustIcon from '../../../assets/images/homepage/ctasection/trust-icon.svg';
import impactIcon from '../../../assets/images/homepage/ctasection/impact-icon.svg';
import communityIcon from '../../../assets/images/homepage/ctasection/community-icon.svg';
import lockIcon from '../../../assets/images/homepage/ctasection/lock.svg';
import SectionHeading from '../../common/SectionHeading';

const EASE = [0.16, 1, 0.3, 1] as const;
const DARK_GREEN = '#0A3231';
const LIGHT_GREEN = '#1A6B4E';
const GOLD = '#BD8C3B';

const features = [
    { icon: trustIcon, label: 'Trusted\nTransparency', bg: DARK_GREEN },
    { icon: impactIcon, label: '100% Impact\nDriven', bg: GOLD },
    { icon: communityIcon, label: 'Community\nFirst', bg: DARK_GREEN },
];

const HeartIcon = () => (
    <svg width="20" height="17" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.171 25.7142C13.8497 25.596 13.567 25.4155 13.3227 25.1727L11.3867 23.4347C8.38572 20.7244 5.73762 18.0889 3.4424 15.5281C1.14747 12.9673 0 10.306 0 7.54402C0 5.41186 0.728674 3.62155 2.18602 2.1731C3.64309 0.724365 5.44404 0 7.58889 0C8.81913 0 10.1001 0.309025 11.4318 0.927076C12.7638 1.54485 14.0125 2.71026 15.1778 4.42331C16.3431 2.71026 17.5917 1.54485 18.9237 0.927076C20.2554 0.309025 21.5364 0 22.7667 0C24.9115 0 26.7125 0.724365 28.1695 2.1731C29.6269 3.62155 30.3556 5.41186 30.3556 7.54402C30.3556 10.3702 29.161 13.0869 26.7719 15.6941C24.3828 18.3012 21.7677 20.8846 18.9267 23.4443L17.0004 25.1727C16.7561 25.4155 16.468 25.596 16.1361 25.7142C15.8041 25.8324 15.4739 25.8915 15.1453 25.8915C14.8167 25.8915 14.492 25.8324 14.171 25.7142ZM14.354 6.1643C13.3444 4.54569 12.2947 3.39313 11.205 2.70663C10.1153 2.01984 8.90992 1.67645 7.58889 1.67645C5.90247 1.67645 4.49712 2.23527 3.37284 3.3529C2.24856 4.47053 1.68642 5.86757 1.68642 7.54402C1.68642 8.78208 2.03888 10.0517 2.74381 11.3529C3.44845 12.6544 4.39481 13.9876 5.58289 15.3525C6.77098 16.7171 8.13641 18.1131 9.67921 19.5403C11.2217 20.9675 12.8276 22.4365 14.4969 23.9472C14.6914 24.1194 14.9184 24.2054 15.1778 24.2054C15.4372 24.2054 15.6642 24.1194 15.8587 23.9472C17.5279 22.4365 19.1338 20.9675 20.6763 19.5403C22.2191 18.1131 23.5846 16.7171 24.7727 15.3525C25.9607 13.9876 26.9071 12.6544 27.6118 11.3529C28.3167 10.0517 28.6691 8.78208 28.6691 7.54402C28.6691 5.86757 28.107 4.47053 26.9827 3.3529C25.8584 2.23527 24.4531 1.67645 22.7667 1.67645C21.4456 1.67645 20.2403 2.01984 19.1506 2.70663C18.0609 3.39313 17.0112 4.54569 16.0016 6.1643C15.9128 6.31463 15.7928 6.42737 15.6415 6.50253C15.4903 6.57797 15.3357 6.61569 15.1778 6.61569C15.0198 6.61569 14.8652 6.57797 14.714 6.50253C14.5628 6.42737 14.4428 6.31463 14.354 6.1643Z"
            fill={GOLD}
        />
    </svg>
);

const PartnerIcon = () => (
    <svg width="32" height="22" viewBox="0 0 43 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.4961 0.666992C24.2477 0.667109 26.4844 2.90301 26.4844 5.64941C26.4842 7.39557 25.5835 8.93375 24.2158 9.82422L23.0928 10.5557L24.3525 11.0107C25.8343 11.5459 27.1357 12.4913 28.1104 13.7324V13.7334C28.1329 13.7626 28.1289 13.8078 28.0967 13.833C28.0737 13.8505 28.0423 13.8515 28.0176 13.8379L27.9951 13.8193C26.4279 11.8218 24.0347 10.6602 21.4961 10.6602C18.958 10.6602 16.5661 11.8226 14.999 13.8184L14.998 13.8193C14.9731 13.851 14.9263 13.8553 14.8965 13.832C14.8646 13.807 14.8607 13.7623 14.8828 13.7334C15.859 12.4889 17.1572 11.5472 18.6416 11.0098L19.8994 10.5547L18.7783 9.82422C17.41 8.93287 16.5079 7.39399 16.5078 5.64941C16.5078 2.90361 18.7456 0.666992 21.4961 0.666992ZM21.4961 0.814453C18.8204 0.814453 16.6572 2.97535 16.6572 5.64941C16.6574 8.32312 18.8215 10.4824 21.4961 10.4824C24.1708 10.4823 26.3348 8.32325 26.335 5.64941C26.335 2.97445 24.1727 0.814569 21.4961 0.814453Z" fill="#BD8C3B" stroke="#BD8C3B" strokeWidth="1.33333" />
        <path d="M8.68945 4.73291C11.4408 4.73291 13.6787 6.96888 13.6787 9.71533C13.6786 11.3958 12.8325 12.9497 11.4326 13.8735L10.3281 14.603L11.5713 15.0571C13.8675 15.8954 15.6926 17.706 16.5518 19.9829L16.7109 20.4438C16.7227 20.4826 16.7 20.5232 16.6631 20.5347C16.6223 20.5468 16.5821 20.5227 16.5713 20.4878L16.4648 20.1675C15.2978 16.8966 12.1871 14.6968 8.69043 14.6968C5.07986 14.6968 1.88319 17.0406 0.80957 20.4878C0.798268 20.5235 0.757503 20.5473 0.716797 20.5347H0.717773C0.680557 20.5231 0.658037 20.482 0.669922 20.4438C1.44634 17.9526 3.36049 15.9504 5.80859 15.0571L7.05078 14.604L5.94824 13.8745C4.54759 12.948 3.7013 11.3973 3.70117 9.71533C3.70117 6.96961 5.93876 4.73309 8.68945 4.73291ZM8.68945 4.88037C6.01355 4.88055 3.85059 7.04134 3.85059 9.71533C3.85079 12.39 6.01491 14.5483 8.69043 14.5483C11.365 14.5483 13.5291 12.389 13.5293 9.71533C13.5293 7.04111 11.365 4.88037 8.68945 4.88037Z" fill="#BD8C3B" stroke="#BD8C3B" strokeWidth="1.33333" />
        <path d="M34.3038 4.73291C37.0552 4.73291 39.2921 6.96882 39.2921 9.71533C39.292 11.3981 38.4478 12.9472 37.046 13.8745L35.9445 14.603L37.1847 15.0562C39.6357 15.9527 41.5481 17.9483 42.3243 20.4438H42.3253C42.3342 20.4725 42.3233 20.5027 42.3019 20.521L42.2775 20.5347C42.2471 20.5438 42.2172 20.5329 42.1993 20.5122L42.1857 20.4878C41.1132 17.0401 37.9132 14.6968 34.3048 14.6968C30.696 14.6968 27.4951 17.0408 26.423 20.4878C26.4117 20.5235 26.3709 20.5473 26.3302 20.5347H26.3312C26.3031 20.5259 26.2832 20.5006 26.2804 20.4722L26.2833 20.4438C27.0581 17.9519 28.9727 15.952 31.421 15.0571L32.6613 14.604L31.5597 13.8755C30.1602 12.9493 29.3157 11.3963 29.3156 9.71533C29.3156 6.96872 31.5516 4.73297 34.3038 4.73291ZM34.3038 4.88037C31.631 4.88044 29.465 7.04307 29.465 9.71533C29.4652 12.3891 31.6298 14.5483 34.3038 14.5483C36.9791 14.5483 39.1425 12.39 39.1427 9.71533C39.1427 7.04034 36.9802 4.88037 34.3038 4.88037Z" fill="#BD8C3B" stroke="#BD8C3B" strokeWidth="1.33333" />
    </svg>
);

const ArrowIcon = ({ color = '#fff' }: { color?: string }) => (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.5955 5.70533H0.718047C0.514281 5.70533 0.343705 5.638 0.206319 5.50333C0.0687728 5.36883 0 5.20182 0 5.00233C0 4.80283 0.0687728 4.63583 0.206319 4.50132C0.343705 4.36666 0.514281 4.29933 0.718047 4.29933H11.5955L8.44351 1.21338C8.30118 1.07387 8.23089 0.9107 8.23265 0.723858C8.23456 0.537015 8.30485 0.370873 8.44351 0.22543C8.59207 0.0801431 8.76265 0.00507699 8.95524 0.00023409C9.148 -0.00460881 9.31865 0.0656914 9.46721 0.211135L13.7551 4.40923C13.8448 4.49703 13.908 4.58959 13.9447 4.68691C13.9816 4.78424 14 4.88938 14 5.00233C14 5.11528 13.9816 5.22041 13.9447 5.31774C13.908 5.41507 13.8448 5.50763 13.7551 5.59543L9.46721 9.79352C9.32472 9.93287 9.15566 10.0017 8.96003 9.99997C8.76424 9.99809 8.59207 9.92451 8.44351 9.77923C8.30485 9.63378 8.23305 9.46912 8.2281 9.28525C8.22315 9.10138 8.29496 8.93672 8.44351 8.79127L11.5955 5.70533Z"
            fill={color}
        />
    </svg>
);

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE, delay: 0.6 + i * 0.1 },
    }),
};

// ---------- Magnetic button wrapper ----------
const MagneticLink = ({
    href,
    children,
    className = '',
    style,
    strength = 0.25,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    strength?: number;
}) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
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
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ ...style, x: springX, y: springY }}
            whileTap={{ scale: 0.96 }}
            className={className}
        >
            {children}
        </motion.a>
    );
};

const CTASection = () => {
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 16 });
    const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 16 });
    const rotateX = useTransform(springTiltY, [-40, 40], [8, -8]);
    const rotateY = useTransform(springTiltX, [-40, 40], [-8, 8]);

    const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = imageWrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        tiltX.set(e.clientX - (rect.left + rect.width / 2));
        tiltY.set(e.clientY - (rect.top + rect.height / 2));
    };

    const handleImageMouseLeave = () => {
        tiltX.set(0);
        tiltY.set(0);
    };

    return (
        <section className="relative overflow-hidden bg-beige">
            <div className="container mx-auto px-5 md:px-0">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div className="pt-20 pb-10 md:pt-28">
                        <SectionHeading
                            align="left"
                            eyebrow="TOGETHER, WE CAN"
                            title={
                                <>
                                    Your Support <br />
                                    <span style={{ color: GOLD }}>Their Tomorrow</span>
                                </>
                            }
                            titleColor={DARK_GREEN}
                            description={
                                <>
                                    <p className="font-medium" style={{ color: DARK_GREEN }}>
                                        Every act of kindness creates a ripple of hope.{' '}
                                        <br className="hidden md:block" /> Be the reason someone smiles today.
                                    </p>
                                    <p style={{ color: LIGHT_GREEN }} className="font-semibold text-lg sm:text-xl pt-2">
                                        Be the change. Be the hope.
                                    </p>
                                </>
                            }
                            maxWidth="max-w-xl"
                        />


                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="flex flex-wrap gap-12 my-12"
                        >
                            {features.map((feature, i) => (
                                <React.Fragment key={feature.label}>
                                    <motion.div
                                        custom={i}
                                        variants={cardVariants}
                                        className="group flex items-center gap-3"
                                    >
                                        <div className="relative">

                                            <motion.span
                                                aria-hidden
                                                initial={{ opacity: 0, scale: 0.7 }}
                                                whileHover={{ opacity: 1, scale: 1.35 }}
                                                transition={{ duration: 0.4, ease: EASE }}
                                                className="absolute inset-0 rounded-full blur-xl -z-10"
                                                style={{ backgroundColor: `${feature.bg}55` }}
                                            />
                                            <motion.div
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{
                                                    duration: 3.5,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                    delay: i * 0.3,
                                                }}
                                                whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0] }}
                                                className="relative h-20 w-20 rounded-full flex items-center justify-center shrink-0 cursor-pointer"
                                                style={{ backgroundColor: feature.bg }}
                                            >
                                                <img src={feature.icon.src} alt="icon" className="h-10 w-10" />
                                            </motion.div>
                                        </div>

                                        <span
                                            className="font-satoshi text-sm font-medium whitespace-pre-line leading-snug transition-colors duration-300"
                                            style={{ color: DARK_GREEN }}
                                        >
                                            {feature.label}
                                        </span>
                                    </motion.div>

                                    {i !== features.length - 1 && (
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                                delay: i * 0.4,
                                            }}
                                            className="w-px h-20 self-center"
                                            style={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(217,183,103,0) 0%, #D9B767 50%, rgba(217,183,103,0) 100%)',
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </motion.div>


                        <div className="flex flex-wrap gap-4 mb-5">

                            <motion.div
                                custom={3}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <motion.span
                                    aria-hidden
                                    className="absolute inset-0 rounded-2xl blur-md -z-10"
                                    style={{ backgroundColor: `${GOLD}55` }}
                                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.04, 1] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <MagneticLink
                                    href="/contact"
                                    strength={0.15}
                                    style={{ backgroundColor: DARK_GREEN }}
                                    className="group relative flex items-center gap-3 rounded-2xl shadow-xl pl-3 pr-6 py-2.5 overflow-hidden"
                                >

                                    <motion.span
                                        aria-hidden
                                        initial={{ x: '-130%' }}
                                        whileHover={{ x: '130%' }}
                                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                                    />

                                    <motion.span
                                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className="h-12 w-12 rounded-full border border-dark-yellow flex items-center justify-center shrink-0"
                                    >
                                        <HeartIcon />
                                    </motion.span>
                                    <span className="text-left relative z-10">
                                        <span className="block text-white font-satoshi text-sm font-bold tracking-wide">
                                            DONATE NOW
                                        </span>
                                        <span className="block text-white/70 font-satoshi text-xs">
                                            Make a Difference Today
                                        </span>
                                    </span>
                                    <motion.span
                                        className="relative z-10"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                    >
                                        <ArrowIcon color={GOLD} />
                                    </motion.span>
                                </MagneticLink>
                            </motion.div>


                            <motion.div
                                custom={4}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <MagneticLink
                                    href="/contact"
                                    strength={0.15}
                                    className="group relative flex items-center gap-3 rounded-2xl pl-3 pr-5 py-2.5 border bg-white overflow-hidden"
                                    style={{ borderColor: '#EADFC9' }}
                                >

                                    <motion.span
                                        aria-hidden
                                        initial={{ opacity: 0, rotate: 0 }}
                                        whileHover={{ opacity: 1, rotate: 360 }}
                                        transition={{
                                            opacity: { duration: 0.3 },
                                            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                                        }}
                                        className="absolute -inset-[2px] rounded-2xl -z-10"
                                        style={{
                                            background: `conic-gradient(from 0deg, ${GOLD}, transparent 25%, transparent 75%, ${GOLD})`,
                                        }}
                                    />
                                    <span className="absolute inset-[1.5px] rounded-2xl bg-white -z-10" />

                                    <motion.span
                                        whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0] }}
                                        transition={{ duration: 0.5 }}
                                        className="h-12 w-12 rounded-full border flex items-center justify-center shrink-0"
                                        style={{ borderColor: GOLD }}
                                    >
                                        <PartnerIcon />
                                    </motion.span>
                                    <span className="text-left">
                                        <span
                                            className="block font-satoshi text-sm font-bold tracking-wide"
                                            style={{ color: GOLD }}
                                        >
                                            BECOME A PARTNER
                                        </span>
                                        <span className="block font-satoshi text-xs opacity-70" style={{ color: DARK_GREEN }}>
                                            Join Hands With Us
                                        </span>
                                    </span>
                                    <motion.span
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                    >
                                        <ArrowIcon color={GOLD} />
                                    </motion.span>
                                </MagneticLink>
                            </motion.div>
                        </div>


                        <motion.div
                            custom={5}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mt-8"
                        >
                            <motion.img
                                src={lockIcon.src}
                                className="h-8 w-8"
                                alt="lock"
                                animate={{ scale: [1, 1.08, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <span className="font-satoshi text-dark-green">
                                Secure Donations | Your privacy is our priority.
                            </span>
                        </motion.div>
                    </div>


                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className="relative mx-auto max-w-sm lg:max-w-none flex items-end justify-end"
                    >

                        <motion.div
                            aria-hidden
                            className="absolute -inset-10 rounded-full blur-3xl -z-10"
                            style={{ backgroundColor: `${GOLD}22` }}
                            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        <div
                            ref={imageWrapRef}
                            onMouseMove={handleImageMouseMove}
                            onMouseLeave={handleImageMouseLeave}
                            style={{ perspective: 1000 }}
                            className="relative h-[90%] w-full"
                        >
                            <motion.div
                                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                                className="relative h-full w-full"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.04, 1] }}
                                    transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <img src={ctaImage.src} className="object-contain" alt="" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;