"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import heroImg from "../../assets/images/getinvolvedpage/get-involvedhero-img.png";
import PrimaryButton from "../common/PrimaryButton";
import SectionHeading from "../common/SectionHeading";

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

const ArrowIcon = () => (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5955 5.70533H0.718047C0.514281 5.70533 0.343705 5.638 0.206319 5.50333C0.0687728 5.36883 0 5.20182 0 5.00233C0 4.80283 0.0687728 4.63583 0.206319 4.50132C0.343705 4.36666 0.514281 4.29933 0.718047 4.29933H11.5955L8.44351 1.21338C8.30118 1.07387 8.23089 0.9107 8.23265 0.723858C8.23456 0.537015 8.30485 0.370873 8.44351 0.22543C8.59207 0.0801431 8.76265 0.00507699 8.95524 0.00023409C9.148 -0.00460881 9.31865 0.0656914 9.46721 0.211135L13.7551 4.40923C13.8448 4.49703 13.908 4.58959 13.9447 4.68691C13.9816 4.78424 14 4.88938 14 5.00233C14 5.11528 13.9816 5.22041 13.9447 5.31774C13.908 5.41507 13.8448 5.50763 13.7551 5.59543L9.46721 9.79352C9.32472 9.93287 9.15566 10.0017 8.96003 9.99997C8.76424 9.99809 8.59207 9.92451 8.44351 9.77923C8.30485 9.63378 8.23305 9.46912 8.2281 9.28525C8.22315 9.10138 8.29496 8.93672 8.44351 8.79127L11.5955 5.70533Z" fill="white" />
    </svg>
);

const GetInvolvedHero = () => {
    return (
        <section className="relative overflow-hidden bg-[#FBEFE4] pt-24 md:pt-35">
            <div className="container relative z-10 mx-auto px-5 md:px-0">
                <div className="relative min-h-0 lg:min-h-133.75">

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative z-20 flex w-full flex-col justify-center py-12 sm:py-16 lg:min-h-133.75 lg:w-[58%] lg:py-0 xl:w-[55%]"
                    >
                        <SectionHeading
                            align="left"
                            eyebrow="GET INVOLVED"
                            title={
                                <>
                                    Be The Reason <br className="hidden sm:block" />
                                    <span className="text-dark-yellow">Hope Lives On</span>
                                </>
                            }
                            description={
                                <p className="max-w-190 font-medium leading-loose text-dark-green">
                                    Join hands with us and be a part of a compassionate community working towards a better tomorrow.
                                </p>
                            }
                        />

                        <motion.div variants={fadeUp} className="mt-6">
                            <PrimaryButton text="Get Involved Today" icon={<ArrowIcon />} />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 1.02 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1, ease: EASE }}
                        className="absolute right-[-5%] top-0 hidden h-full w-[65%] lg:block"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="relative h-full w-full"
                        >
                            <Image
                                src={heroImg}
                                alt="Chishty Foundation volunteers distributing aid"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 65vw"
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-x-0 top-0 h-[18%] bg-linear-to-b from-[#FBEFE4] via-[#FBEFE4]/50 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-[25%] bg-linear-to-t from-[#FBEFE4] via-[#FBEFE4]/70 to-transparent" />
                        </motion.div>
                    </motion.div>

                    {/* mobile view image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="relative block h-70 w-full overflow-hidden sm:h-87.5 lg:hidden"
                    >
                        <div className="absolute inset-0">
                            <Image
                                src={heroImg}
                                alt="Chishty Foundation volunteers distributing aid"
                                fill
                                priority
                                sizes="100vw"
                                className="object-contain object-[55%_center] scale-[1.35]"
                            />
                            <div className="absolute inset-x-0 top-0 h-[25%] bg-linear-to-b from-[#FBEFE4] via-[#FBEFE4]/60 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-[#FBEFE4] via-[#FBEFE4]/80 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GetInvolvedHero;