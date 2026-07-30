"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CTAImage from '../../assets/images/aboutpage/cta-section/cta-img.png';
import centeredIcon from '../../assets/images/aboutpage/cta-section/centred-grp-icon.svg';
import FilledLeaf from '../../assets/images/aboutpage/cta-section/filled-leaf.png';
import LineLeaf from '../../assets/images/aboutpage/cta-section/line-leaf.png';
import GreenStar from '../../assets/images/homepage/vectors/common/green-star.svg';
import PrimaryButton from '../common/PrimaryButton';

const EASE = [0.16, 1, 0.3, 1] as const;
const DARK_GREEN = '#0A3231';
const BORDER_TAN = '#F4DDBD';

const SLANT = 'polygon(0 0, 100% 0, calc(100% - 56px) 100%, 0 100%)';

const ArrowIcon = ({ color = 'white' }: { color?: string }) => (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5955 5.70533H0.718047C0.514281 5.70533 0.343705 5.638 0.206319 5.50333C0.0687728 5.36883 0 5.20182 0 5.00233C0 4.80283 0.0687728 4.63583 0.206319 4.50132C0.343705 4.36666 0.514281 4.29933 0.718047 4.29933H11.5955L8.44351 1.21338C8.30118 1.07387 8.23089 0.9107 8.23265 0.723858C8.23456 0.537015 8.30485 0.370873 8.44351 0.22543C8.59207 0.0801431 8.76265 0.00507699 8.95524 0.00023409C9.148 -0.00460881 9.31865 0.0656914 9.46721 0.211135L13.7551 4.40923C13.8448 4.49703 13.908 4.58959 13.9447 4.68691C13.9816 4.78424 14 4.88938 14 5.00233C14 5.11528 13.9816 5.22041 13.9447 5.31774C13.908 5.41507 13.8448 5.50763 13.7551 5.59543L9.46721 9.79352C9.32472 9.93287 9.15566 10.0017 8.96003 9.99997C8.76424 9.99809 8.59207 9.92451 8.44351 9.77923C8.30485 9.63378 8.23305 9.46912 8.2281 9.28525C8.22315 9.10138 8.29496 8.93672 8.44351 8.79127L11.5955 5.70533Z" fill={color} />
    </svg>
);


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

const AboutCTASection = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <section className="w-full px-4 md:px-6 py-10 md:py-16">
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
                        className="absolute z-10 md:right-0 -bottom-10 right-[40%] md:top-[40%]"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        variants={{ hover: { scale: 1.08, rotate: 6 } }}
                        style={{ transformOrigin: 'center' }}
                    >
                        <Image src={centeredIcon} alt="Community support icon" width={120} height={120} />
                    </motion.div>

                    <motion.div
                        className="relative h-70 sm:h-90 lg:h-full md:pr-3 pb-3 md:pb-0 z-0"
                        style={{
                            background: BORDER_TAN,
                            clipPath: isMobile ? "none" : SLANT,
                        }}
                    >
                        <div
                            className="group relative h-full w-full overflow-hidden"
                            style={{
                                clipPath: isMobile ? "none" : SLANT,
                            }}
                        >
                            <motion.div
                                className="absolute inset-0"
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.9, ease: EASE }}
                            >
                                <Image
                                    src={CTAImage}
                                    alt="Volunteers and community members holding relief kits"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                </div>

                <div className="relative z-10 flex-1 px-6 md:px-12 lg:px-16 py-12 md:py-14 flex flex-col items-center lg:items-start text-center lg:text-left justify-center gap-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                        className="font-cormorant text-4xl md:text-[44px] leading-[1.15]"
                        style={{ color: DARK_GREEN }}
                    >
                        Be A Part Of
                        <br />
                        Our Mission
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
                        Your support can transform lives and build a better tomorrow.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                        className="relative"
                    >

                        <motion.span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-full"
                            style={{ backgroundColor: '#EEAE46' }}
                            animate={{ opacity: [0.35, 0, 0.35], scale: [1, 1.35, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="relative"
                        >
                            <Link href="/contact">
                                <PrimaryButton
                                    containerClassName="!bg-[#EEAE46] shadow-md hover:shadow-xl transition-shadow duration-300"
                                    iconWrapperClassName="!bg-dark-green"
                                    text="Get Involved Today"
                                    icon={<ArrowIcon />}
                                />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
                        className="font-satoshi text-sm italic"
                        style={{ color: DARK_GREEN, opacity: 0.6 }}
                    >
                        Thank you for considering - every bit of support means the world to us.
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutCTASection;