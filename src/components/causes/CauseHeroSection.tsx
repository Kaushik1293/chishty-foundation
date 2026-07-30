"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import sectionbg from "../../assets/images/causes/cause-hero-img.png";
import SectionHeading from "../common/SectionHeading";
import PrimaryButton from "../common/PrimaryButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const HeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 12.5L6.02 11.61C2.65 8.55 0.5 6.6 0.5 4.2C0.5 2.25 2.02 0.75 4 0.75C5.11 0.75 6.19 1.27 7 2.1C7.81 1.27 8.89 0.75 10 0.75C11.98 0.75 13.5 2.25 13.5 4.2C13.5 6.6 11.35 8.55 7.98 11.62L7 12.5Z" stroke="#fff" strokeWidth="1.2" />
    </svg>
);


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

const CauseHeroSection = () => {
    return (
        <section className="relative">
            <div className="relative overflow-hidden pb-28">
                <div className="absolute inset-0 bg-dark-green">
                    <Image src={sectionbg} alt="Ajmer Sharif Dargah at night" fill priority className="object-cover" />

                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative container mx-auto px-5 md:px-0 pt-32 md:pt-40 pb-8"
                >
                    <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
                        <motion.div variants={fadeUp} className="pt-10">
                            <SectionHeading
                                align="left"
                                eyebrow="SERVING WITH COMPASSION"
                                title={
                                    <>
                                        Causes That Matter, <br />
                                        <span className="text-dark-yellow">Campaigns That Change Lives</span>
                                    </>
                                }
                                description="At Chishty Foundation, every cause is a step towards a better society. Explore our initiatives and be a part of the change."
                            />
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-8 flex justify-center md:justify-start">
                            <Link href="/contact">
                                <PrimaryButton
                                    containerClassName="!bg-dark-yellow shadow-md hover:shadow-xl transition-shadow duration-300"
                                    iconWrapperClassName="!bg-dark-green"
                                    text="Support Our Cause"
                                    icon={<HeartIcon />}
                                />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default CauseHeroSection;
