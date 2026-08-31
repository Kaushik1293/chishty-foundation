"use client";

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import aboutImg from '../../assets/images/aboutpage/herosection/about-hero-img.png';
import grpIcon from '../../assets/images/aboutpage/herosection/grp-icon.svg';
import starIcon from '../../assets/images/homepage/vectors/common/green-star.svg';
import PrimaryButton from '../common/PrimaryButton';

const EASE = [0.16, 1, 0.3, 1] as const;

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

const HeartIcon = () => (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7 12.5L6.02 11.61C2.65 8.55 0.5 6.6 0.5 4.2C0.5 2.25 2.02 0.75 4 0.75C5.11 0.75 6.19 1.27 7 2.1C7.81 1.27 8.89 0.75 10 0.75C11.98 0.75 13.5 2.25 13.5 4.2C13.5 6.6 11.35 8.55 7.98 11.62L7 12.5Z"
            fill="white"
        />
    </svg>
);

const PlayIcon = () => (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 11.11V0.89C0 0.68 0.09 0.5 0.27 0.36C0.45 0.21 0.65 0.15 0.87 0.15C0.94 0.15 1.02 0.16 1.09 0.18C1.17 0.2 1.24 0.23 1.31 0.27L9.5 5.38C9.63 5.47 9.73 5.57 9.79 5.68C9.86 5.79 9.9 5.91 9.9 6.05C9.9 6.19 9.86 6.31 9.79 6.42C9.73 6.53 9.63 6.63 9.5 6.72L1.31 11.83C1.24 11.87 1.17 11.9 1.09 11.92C1.02 11.94 0.94 11.95 0.87 11.95C0.65 11.95 0.45 11.89 0.27 11.75C0.09 11.6 0 11.38 0 11.11Z" fill="#BD8C3B" />
    </svg>
);

const AboutHeroBanner = () => {
    return (
        <section className="relative overflow-hidden bg-[#FBEFE4]">
            <div className="container mx-auto px-5 md:px-0 pt-36 pb-20">
                <div className="grid lg:grid-cols-2 gap-14 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="max-w-xl"
                    >
                        <motion.h1
                            variants={fadeUp}
                            className="font-cormorant font-semibold text-dark-green text-5xl md:text-6xl xl:text-7xl mb-4"
                        >
                            About Us
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="font-cormorant text-dark-yellow text-3xl md:text-4xl leading-snug mb-6"
                        >
                            A Legacy Of Love, <br />
                            Service And Unity
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6 max-w-md">
                            <span className="h-px flex-1 bg-dark-yellow/50" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 6,
                                    ease: "linear",
                                }}
                            >
                                <Image src={starIcon} alt="" width={20} height={20} />
                            </motion.div>
                            <span className="h-px flex-1 bg-dark-yellow/50" />
                        </motion.div>

                        <motion.p
                            variants={fadeUp}
                            className="font-satoshi text-dark-green/80 text-base md:text-lg leading-relaxed mb-10 max-w-md"
                        >
                            Since 2007, carrying the message of Khwaja Gharib Nawaz (R.A.) from Ajmer Sharif to the world.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-8">
                            <Link href="/contact">
                                <PrimaryButton text="Donate Now" icon={<HeartIcon />} />
                            </Link>

                            <motion.a
                                href="#our-story"
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.25, ease: EASE }}
                                className="group inline-flex items-center gap-3"
                            >
                                <span className="h-11 w-11 rounded-full border border-dark-yellow flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-dark-yellow/10">
                                    <PlayIcon />
                                </span>
                                <span className="font-satoshi text-dark-yellow font-medium">Our Story</span>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="relative"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden aspect-6/5">
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.5, ease: EASE }}
                                className="w-full h-full"
                            >
                                <Image
                                    src={aboutImg}
                                    alt="Chishty Foundation volunteers distributing aid"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                            whileHover={{ y: -3 }}
                            className="absolute bottom-0 right-0 w-44 md:w-52 rounded-tl-[2.5rem] border-l-4 border-t-4 border-white rounded-br-[2.5rem] bg-dark-green px-6 py-8 flex flex-col items-center text-center shadow-xl"
                        >
                            <Image src={grpIcon} alt="" width={40} height={28} className="mb-3" />
                            <span className="font-cormorant text-white text-lg mb-1">Since</span>
                            <span className="font-cormorant font-bold text-dark-yellow text-5xl leading-none mb-2">
                                2007
                            </span>
                            <span className="font-satoshi text-white/85 text-xs leading-relaxed">
                                Of Faith, Service &amp; Humanity
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutHeroBanner;