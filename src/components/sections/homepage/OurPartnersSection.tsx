"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import SectionHeading from '../../common/SectionHeading';
import sectionBg from '../../../assets/images/homepage/partnerssection/our-partners-bg.png';
import { IPartner } from '@/src/types';
import { collaborationPartners, featuredPartners, PartnerItem } from '@/src/data/defaultPartners';

const EASE = [0.16, 1, 0.3, 1] as const;
const DARK_GREEN = '#0A3231';
const GOLD = '#BD8C3B';

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
    }),
};

const swiperBreakpoints = {
    0: { slidesPerView: 1.3, spaceBetween: 16 },
    480: { slidesPerView: 1.8, spaceBetween: 18 },
    640: { slidesPerView: 2.3, spaceBetween: 20 },
    768: { slidesPerView: 3.2, spaceBetween: 22 },
    1024: { slidesPerView: 4.2, spaceBetween: 24 },
    1280: { slidesPerView: 5.2, spaceBetween: 24 },
    1536: { slidesPerView: 6, spaceBetween: 28 },
};

interface IOurPartnersSection {
    partners?: IPartner[];
}

const PartnerRow = ({
    title,
    highlight,
    items,
}: {
    title: string;
    highlight: string;
    items: { name: string; logo: any }[];
}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const syncLockState = (swiper: SwiperType) => {
        setIsLocked(swiper.isLocked);
    };

    return (
        <div className="mb-14 last:mb-0">
            <div className="mb-6">
                <h3 className="font-cormorant text-2xl md:text-3xl font-bold text-dark-green">
                    {title} <span style={{ color: GOLD }}>{highlight}</span>
                </h3>
            </div>

            <Swiper
                slidesPerView={1.3}
                spaceBetween={16}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    syncLockState(swiper);
                }}
                onResize={syncLockState}
                onBreakpoint={syncLockState}
                centeredSlides={false}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                breakpoints={swiperBreakpoints}
                className="py-4"
            >
                {items.map((partner, i) => (
                    <SwiperSlide key={partner.name} className="my-4">
                        <motion.div
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            style={{ boxShadow: '0px 3.38px 11px 0px #0000000F' }}
                            className="group bg-white rounded-3xl px-6 pt-9 pb-7 min-h-70 max-w-50 flex flex-col items-center text-center mx-auto"
                        >
                            <div className="relative mb-6">
                                <motion.div
                                    aria-hidden
                                    className="absolute inset-0 rounded-full border bg-white"
                                    style={{ borderColor: '#F1E3D7' }}
                                    animate={{
                                        scale: [1, 1.08, 1],
                                        opacity: [0.5, 0.9, 0.5],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: i * 0.3,
                                    }}
                                />

                                <div className="relative h-28 w-28 rounded-full flex items-center justify-center overflow-hidden">
                                    <motion.div
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{
                                            duration: 4.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: i * 0.25,
                                        }}
                                        whileHover={{ scale: 1.08 }}
                                        className="relative h-20 w-20 flex items-center justify-center"
                                    >
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-contain"
                                            sizes="80px"
                                        />
                                    </motion.div>
                                </div>
                            </div>

                            <h4
                                className="font-cormorant text-lg leading-snug font-bold whitespace-pre-line mb-3"
                                style={{ color: DARK_GREEN }}
                            >
                                {partner.name}
                            </h4>

                            <motion.span
                                initial={{ scaleX: 0.4 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="h-0.75 w-16 rounded-full mt-auto"
                                style={{ backgroundColor: GOLD }}
                            />
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {!isLocked && (
                <div className="mt-6 flex justify-center items-center gap-3">
                    {items.map((_, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <button
                                key={index}
                                onClick={() => swiperRef.current?.slideTo(index)}
                                className="relative flex h-5 w-5 items-center justify-center cursor-pointer"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <motion.span
                                    animate={{
                                        scale: isActive ? 1 : 0.8,
                                        opacity: isActive ? 1 : 0.35,
                                    }}
                                    transition={{ duration: 0.25, ease: EASE }}
                                    className="h-3 w-3 rounded-full"
                                    style={{ backgroundColor: '#1E7B5F' }}
                                />
                                {isActive && (
                                    <motion.span
                                        layoutId={`active-dot-${title}`}
                                        className="absolute h-5 w-5 rounded-full border-2"
                                        style={{ borderColor: '#1E7B5F' }}
                                        transition={{ duration: 0.25, ease: EASE }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const OurPartnersSection: React.FC<IOurPartnersSection> = () => {
    return (
        <section className="relative overflow-hidden py-20 md:py-28" id="partners">
            <div className="absolute inset-0 -z-10">
                <Image src={sectionBg} alt="" fill className="object-cover" />
            </div>

            <div className="container mx-auto px-5 md:px-0">
                <SectionHeading
                    eyebrow="OUR PARTNERS"
                    title={
                        <>
                            Trusted By &amp; <span style={{ color: GOLD }}>Associated With</span>
                        </>
                    }
                    description="Over the years, we have had the honour of working alongside respected institutions, spiritual bodies and community leaders worldwide."
                    titleColor={DARK_GREEN}
                    maxWidth="max-w-3xl"
                />

                <div className="mt-12">
                    {/* Row 1: In Collaboration With */}
                    <PartnerRow
                        title="In Collaboration"
                        highlight="With"
                        items={collaborationPartners}
                    />

                    {/* Row 2: As Featured In */}
                    <PartnerRow
                        title="As Featured"
                        highlight="In"
                        items={featuredPartners}
                    />
                </div>
            </div>
        </section>
    );
};

export default OurPartnersSection;