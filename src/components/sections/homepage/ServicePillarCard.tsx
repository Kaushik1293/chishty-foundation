"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = '#BD8C3B';

type ServicePillarCardProps = {
    image: StaticImageData | string;
    icon: StaticImageData | string;
    icon2: StaticImageData | string;
    title: string;
    description: string;
    bgColor: string;
    accentColor: string;
    index?: number;
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE, delay: i * 0.12 },
    }),
};

const ServicePillarCard = ({
    image,
    icon,
    icon2,
    title,
    description,
    bgColor,
    accentColor,
    index = 0,
}: ServicePillarCardProps) => {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative pt-11"
        >
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
                animate={{
                    y: [0, -6, 0],
                    boxShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 26px rgba(255,255,255,0.45)",
                        "0 0 0px rgba(255,255,255,0)",
                    ],
                }}
                transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.35,
                }}
                whileHover={{ scale: 1.08 }}
            >

                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-xl border" style={{ borderColor: accentColor }}>


                    <div
                        className="h-22 w-22 rounded-full border-[3px] border-white flex items-center justify-center"
                        style={{ backgroundColor: accentColor }}
                    >
                        <div className="h-10 w-10 flex items-center justify-center">
                            <img
                                src={typeof icon === "string" ? icon : icon.src}
                                alt={title}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                </div>
            </motion.div>

            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative rounded-3xl overflow-hidden shadow-lg"
            >

                <div className="relative h-56 overflow-hidden">
                    <motion.div
                        className="relative h-full w-full"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
                        whileHover={{ scale: 1.12 }}
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                </div>


                <div className="relative pt-8 pb-8 px-6 text-center" style={{ backgroundColor: bgColor }}>

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-3" style={{ backgroundColor: '#F4CB8E' }} />


                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
                        whileHover={{ scale: 1.1, rotate: [0, -4, 4, 0] }}
                        className="mx-auto mb-4 h-14 w-14 flex items-center justify-center"
                        style={{ color: GOLD }}
                    >
                        <img
                            src={typeof icon2 === "string" ? icon2 : icon2.src}
                            alt={title}
                            className="h-full w-full object-contain"
                        />
                    </motion.div>

                    <h3 className="font-cormorant text-white text-3xl mb-4">{title}</h3>


                    <div className="flex items-center justify-center gap-2.5 mb-5">
                        <span className="h-px w-9 bg-white/40" />
                        <span className="h-1.5 w-1.5 rotate-45 bg-white/80 shrink-0" />
                        <span className="h-px w-9 bg-white/40" />
                    </div>

                    <p className="font-satoshi text-white/75 text-sm font-medium leading-relaxed max-w-57.5 mx-auto">
                        {description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ServicePillarCard;