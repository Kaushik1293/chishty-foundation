"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import sectionbg from "../../assets/images/contact/contact-hero-bg.png";
import SectionHeading from "../common/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2ZM10 16.5L6 12.5L7.41 11.09L10 13.67L16.59 7.09L18 8.5L10 16.5Z" fill="#BD8C3B" />
    </svg>
);

const HeartHandIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#BD8C3B" />
    </svg>
);

const ReceiptIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 17H6V15H18V17ZM18 13H6V11H18V13ZM18 9H6V7H18V9ZM3 22L4.5 20.5L6 22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2V22Z" fill="#BD8C3B" />
    </svg>
);

const GlobeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" fill="#BD8C3B" />
    </svg>
);

const trustPillars = [
    {
        icon: <ReceiptIcon />,
        title: "Section 80G Tax Exemption",
        description: "Eligible Indian donors receive 50% tax exemption under Section 80G of the Income Tax Act.",
    },
    {
        icon: <ShieldIcon />,
        title: "100% Direct Impact",
        description: "Your contribution directly funds grassroots food, education, healthcare and community welfare.",
    },
    {
        icon: <HeartHandIcon />,
        title: "Verified Bank Accounts",
        description: "Official Foundation accounts with Bank of India (BOI) and ICICI Bank for direct NEFT/RTGS.",
    },
    {
        icon: <GlobeIcon />,
        title: "Serving Humanity Since 2007",
        description: "Over 19 years of dedicated Khidmat-e-Khalq rooted in the message of Ajmer Sharif.",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE, delay: 0.3 + i * 0.1 },
    }),
};

const DonationHeroSection = () => {
    return (
        <section className="relative">
            <div className="relative overflow-hidden pb-28 md:pb-36">
                <div className="absolute inset-0">
                    <Image src={sectionbg} alt="Ajmer Sharif Dargah" fill priority className="object-cover" />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative container mx-auto px-5 md:px-0 pt-28 md:pt-36 pb-8"
                >
                    <div className="max-w-2xl">
                        <motion.div variants={fadeUp} className="pt-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-dark-yellow/20 border border-dark-yellow/40 backdrop-blur-md mb-4 text-light-yellow text-xs tracking-wider uppercase font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-light-yellow animate-pulse" />
                                50% 80G Tax Exemption
                            </div>

                            <SectionHeading
                                align="left"
                                eyebrow="DONATION"
                                eyebrowColor="#ffffff"
                                starColor="white"
                                title={
                                    <>
                                        Support Our Mission, <br />
                                        <span className="text-light-yellow">Transform Lives</span>
                                    </>
                                }
                                description="“A man's true wealth is the good he does in this world.”"
                                titleColor="#ffffff"
                                descriptionColor="#ffffff"
                                maxWidth="max-w-2xl"
                            />

                            <motion.div variants={fadeUp} className="mt-8">
                                <a href="#donation-section">
                                    <button
                                        type="button"
                                        className="bg-dark-yellow p-1.5 ps-6 rounded-full flex items-center gap-4 cursor-pointer shadow-lg hover:shadow-xl hover:bg-dark-yellow/90 transition-all text-white font-satoshi font-semibold text-sm"
                                    >
                                        <span>Donate Now</span>
                                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0 text-dark-green">
                                            <svg width="15" height="14" viewBox="0 0 20 19" fill="#0A3231">
                                                <path d="M10 18.35l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z" />
                                            </svg>
                                        </div>
                                    </button>
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="relative container mx-auto px-5 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    style={{ boxShadow: "0px 20px 60px -20px #E2A75026" }}
                    className="relative -mt-20 md:-mt-24 rounded-4xl bg-white px-6 md:px-10 py-10 border border-[#F1E3D7]"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trustPillars.map((item, i) => (
                            <motion.div
                                key={item.title}
                                custom={i}
                                variants={cardItemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group flex flex-col gap-3 bg-beige border border-[#F2E7D6] p-6 rounded-3xl hover:border-dark-yellow/40 transition-colors"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.08, rotate: 6 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center border border-[#F2E7D6] text-dark-yellow shadow-sm"
                                >
                                    {item.icon}
                                </motion.div>
                                <h4 className="font-cormorant font-bold text-xl text-dark-green mt-1">
                                    {item.title}
                                </h4>
                                <p className="font-satoshi text-dark-green/70 text-xs sm:text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DonationHeroSection;
