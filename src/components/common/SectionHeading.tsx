"use client";

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import greenStar from '../../assets/images/homepage/vectors/common/green-star.svg';
import whiteStar from '../../assets/images/homepage/vectors/common/white-star.svg';

const EASE = [0.16, 1, 0.3, 1] as const;

type Align = 'left' | 'center' | 'right';

type SectionHeadingProps = {
    eyebrow?: string;
    title?: string | ReactNode;
    description?: string | string[] | ReactNode;

    eyebrowColor?: string;
    titleColor?: string;
    descriptionColor?: string;
    lineColor?: string;
    diamondColor?: string;
    starColor?: 'green' | 'white' | string;

    align?: Align;
    className?: string;
    maxWidth?: string;
    titleNoWrap?: boolean;

    hideDivider?: boolean;
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const lineExpandLeft = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
};

const lineExpandRight = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
};

const diamondPop = {
    hidden: { opacity: 0, scale: 0, rotate: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 45,
        transition: { duration: 0.5, ease: EASE },
    },
};

const starSpin = {
    hidden: { opacity: 0, rotate: -90, scale: 0.5 },
    visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.7, ease: EASE },
    },
};

const SectionHeading = ({
    eyebrow = 'WHAT WE FOCUS ON',
    title = 'Our Service Pillars',
    description = '',

    eyebrowColor = '#0A3231',
    titleColor = '#0A3231',
    descriptionColor = '#0A3231',
    lineColor = '#BD8C3B',
    diamondColor = '#BD8C3B',
    starColor = 'green',

    align = 'center',
    className = '',
    maxWidth = 'max-w-2xl',
    titleNoWrap = false,
    hideDivider
}: SectionHeadingProps) => {
    const starIcon = starColor === 'white' ? whiteStar : starColor === 'green' ? greenStar : greenStar;

    const alignClass =
        align === 'left'
            ? 'items-start text-left'
            : align === 'right'
                ? 'items-end text-right ml-auto'
                : 'items-center text-center mx-auto';

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className={`flex flex-col ${alignClass} ${maxWidth} w-full ${className}`}
        >

            <motion.div
                variants={fadeUp}
                className="flex items-center justify-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 w-full max-w-[320px] sm:max-w-sm"
            >
                <motion.span
                    variants={lineExpandLeft}
                    style={{ originX: 1, backgroundColor: lineColor }}
                    className="h-px flex-1"
                />
                <motion.span
                    variants={diamondPop}
                    style={{ backgroundColor: diamondColor }}
                    className="h-1.5 w-1.5 shrink-0"
                />
                <span
                    style={{ color: eyebrowColor }}
                    className="font-satoshi text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] font-semibold uppercase whitespace-nowrap"
                >
                    {eyebrow}
                </span>
                <motion.span
                    variants={diamondPop}
                    style={{ backgroundColor: diamondColor }}
                    className="h-1.5 w-1.5 shrink-0"
                />
                <motion.span
                    variants={lineExpandRight}
                    style={{ originX: 0, backgroundColor: lineColor }}
                    className="h-px flex-1"
                />
            </motion.div>


            <motion.h2
                variants={fadeUp}
                style={{ color: titleColor }}
                className={`font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-4 sm:mb-6 ${titleNoWrap ? 'whitespace-nowrap' : ''
                    }`}
            >
                {title}
            </motion.h2>


            {
                hideDivider == true ? <></> :
                    <motion.div
                        variants={fadeUp}
                        className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 w-full max-w-55 sm:max-w-xs"
                    >
                        <motion.span
                            variants={lineExpandLeft}
                            style={{ originX: 1, backgroundColor: lineColor }}
                            className="h-px flex-1"
                        />
                        <motion.div variants={starSpin} className="shrink-0">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 1.2 }}
                            >
                                <Image src={starIcon} alt="" width={18} height={18} className="w-8 h-8 sm:w-5 sm:h-5" />
                            </motion.div>
                        </motion.div>
                        <motion.span
                            variants={lineExpandRight}
                            style={{ originX: 0, backgroundColor: lineColor }}
                            className="h-px flex-1"
                        />
                    </motion.div>
            }


            {description &&
                (React.isValidElement(description) ? (
                    <motion.div variants={fadeUp}>
                        {description}
                    </motion.div>
                ) : Array.isArray(description) ? (
                    <motion.div
                        variants={fadeUp}
                        className="max-w-md sm:max-w-lg space-y-4"
                    >
                        {description.map((paragraph, index) => (
                            <p
                                key={index}
                                style={{ color: descriptionColor }}
                                className="font-satoshi text-sm sm:text-base opacity-80 leading-relaxed"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </motion.div>
                ) : (
                    <motion.p
                        variants={fadeUp}
                        style={{ color: descriptionColor }}
                        className="font-satoshi text-sm sm:text-base opacity-80 leading-relaxed max-w-md sm:max-w-lg"
                    >
                        {description}
                    </motion.p>
                ))}
        </motion.div>
    );
};

export default SectionHeading;