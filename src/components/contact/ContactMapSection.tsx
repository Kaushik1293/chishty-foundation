"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FilledLeaf from '../../assets/images/aboutpage/cta-section/filled-leaf.png';
import LineLeaf from '../../assets/images/aboutpage/cta-section/line-leaf.png';
import GreenStar from '../../assets/images/homepage/vectors/common/green-star.svg';

import FacebookIcon from '../../assets/images/contact/mapsection/fb.svg'
import InstagramIcon from '../../assets/images/contact/mapsection/insta.svg'
import XIcon from '../../assets/images/contact/mapsection/x.svg'
import WhatsAppIconOutline from '../../assets/images/contact/mapsection/wp.svg'
import YouTubeIcon from '../../assets/images/contact/mapsection/yt.svg'


const EASE = [0.16, 1, 0.3, 1] as const;
const DARK_GREEN = '#0A3231';

const socials = [
    { icon: FacebookIcon, label: 'Facebook', href: '#' },
    { icon: InstagramIcon, label: 'Instagram', href: '#' },
    { icon: XIcon, label: 'X', href: '#' },
    { icon: WhatsAppIconOutline, label: 'WhatsApp', href: '#' },
    { icon: YouTubeIcon, label: 'YouTube', href: '#' },
];

const Sparkle = ({
    className,
    delay = 0,
    scale = 1,
}: {
    className?: string;
    delay?: number;
    scale?: number;
}) => (
    <motion.span
        aria-hidden
        className={`pointer-events-none absolute ${className}`}
        style={{ color: '#EEAE46' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0, scale, scale, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c1.02 4.51 2.32 5.81 6.83 6.83C14.32 7.85 13.02 9.15 12 13.66c-1.02-4.51-2.32-5.81-6.83-6.83C9.68 5.81 10.98 4.51 12 0z" />
        </svg>
    </motion.span>
);

const ContactMapSection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreen();
        window.addEventListener('resize', checkScreen);

        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    return (
        <section className="container mx-auto px-5 md:px-0 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover="hover"
                className="group/card relative container mx-auto rounded-[28px] md:rounded-[36px] overflow-hidden border flex flex-col lg:flex-row items-stretch transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(238,174,70,0.35)]"
                style={{ backgroundColor: '#F9F3EE', borderColor: '#F1E1D2' }}
            >
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0"
                    variants={{
                        hover: { opacity: 1 },
                    }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    style={{
                        background:
                            'radial-gradient(600px circle at 85% 10%, rgba(238,174,70,0.16), transparent 60%)',
                    }}
                />

                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -top-4 right-0 w-40 md:w-56 opacity-90 z-0"
                    animate={{ rotate: [0, 3, 0, -3, 0], y: [0, -4, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Image src={LineLeaf} alt="" className="w-full h-auto" />
                </motion.div>
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 right-4 w-32 md:w-48 opacity-90 z-0"
                    animate={{ rotate: [0, -3, 0, 3, 0], y: [0, 4, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                    <Image src={FilledLeaf} alt="" className="w-full h-auto" />
                </motion.div>

                <Sparkle className="top-8 left-[38%] hidden lg:block" delay={0} scale={1} />
                <Sparkle className="top-24 left-[55%] hidden lg:block" delay={0.9} scale={0.7} />
                <Sparkle className="top-6 right-[8%] hidden lg:block" delay={1.6} scale={0.85} />

                <div className="relative w-full lg:w-[50%] shrink-0 z-10">
                    <motion.div
                        className="relative h-70 sm:h-90 lg:h-full md:pr-3 pb-3 md:pb-0 z-0 md:border-r border-b md:border-0 border-[#F4DDBD]"

                    >

                        <iframe
                            title="Chishty Foundation location — Ajmer"
                            src="https://www.google.com/maps?q=Ajmer,Rajasthan,India&output=embed"
                            className="absolute inset-0 w-full h-full grayscale-10"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                    </motion.div>
                </div>

                <div className="relative z-10 flex-1 px-6 md:px-12 lg:px-16 py-12 md:py-14 flex flex-col items-center lg:items-start text-center lg:text-left justify-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="flex items-center gap-3"
                    >
                        <span
                            className="font-satoshi text-xs tracking-[0.15em] font-bold uppercase"
                            style={{ color: DARK_GREEN }}
                        >
                            We Connect Through Purpose
                        </span>
                        <span className="w-2 h-2 rotate-45 shrink-0" style={{ backgroundColor: '#EEAE46' }} />
                        <span className="h-px w-10" style={{ backgroundColor: '#D9B98C' }} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                        className="font-cormorant text-4xl md:text-[44px] leading-[1.15]"
                        style={{ color: DARK_GREEN }}
                    >
                        Let's Build A
                        <br />
                        Better Tomorrow
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                        className="flex items-center gap-4 w-full max-w-xs lg:max-w-none lg:w-auto"
                    >
                        <span className="h-px flex-1 lg:w-24 lg:flex-none" style={{ backgroundColor: '#D9B98C' }} />
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        >
                            <Image src={GreenStar} alt="" width={20} height={20} />
                        </motion.span>
                        <span className="h-px flex-1 lg:w-24 lg:flex-none" style={{ backgroundColor: '#D9B98C' }} />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                        className="font-satoshi text-base md:text-lg max-w-md"
                        style={{ color: DARK_GREEN, opacity: 0.85 }}
                    >
                        Whether you want to help, collaborate, or simply learn more - we're just a message away.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                        className="flex items-center gap-4"
                    >
                        {socials.map((s, i) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                initial={{ opacity: 0, y: 14, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: EASE, delay: 0.45 + i * 0.06 }}
                                whileHover={{ scale: 1.1, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center rounded-full hover:shadow-md transition-shadow duration-300"
                                style={{ borderColor: '#F1E1D2' }}
                            >
                                <Image src={s.icon} alt={s.label} height={50} width={50} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactMapSection;