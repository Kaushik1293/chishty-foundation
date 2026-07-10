"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import SectionHeading from '../../common/SectionHeading';

import sectionBg from '../../../assets/images/homepage/partnerssection/our-partners-bg.png';
import { IPartner } from '@/src/types';
import { createClient } from '@/src/utils/supabase/server';

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
    partners: IPartner[]
}

const OurPartnersSection: React.FC<IOurPartnersSection> = ({partners}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    // const [partners, setPartners] = useState<IPartner[]>([]);
    const [loading, setLoading] = useState(true);



    const syncLockState = (swiper: SwiperType) => {
        setIsLocked(swiper.isLocked);
    };

    return (
        <section className="relative overflow-hidden py-20 md:py-28">
            <div className="absolute inset-0 -z-10">
                <Image src={sectionBg} alt="" fill className="object-cover" />
            </div>

            <div className="container mx-auto px-5 md:px-0">
                <SectionHeading
                    eyebrow="OUR PARTNERS"
                    title={
                        <>
                            In Collaboration <span style={{ color: GOLD }}>With</span>
                        </>
                    }
                    description="Together with our valued partners, we are creating a greater impact and building a better tomorrow for everyone."
                    titleColor={DARK_GREEN}
                    maxWidth="max-w-3xl"
                />

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
                    className='mt-10'
                >
                    {partners.map((partner, i) => (
                        <SwiperSlide key={partner.name} className='my-10'>
                            <motion.div
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                style={{ boxShadow: '0px 3.38px 11px 0px #0000000F' }}
                                className="group bg-white rounded-3xl px-6 pt-9 pb-7 min-h-70 max-w-50 flex flex-col items-center text-center"
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
                                            className="relative h-20 w-20"
                                        >
                                            <Image
                                                src={partner.logo_url}
                                                alt={partner.name}
                                                fill
                                                className="object-contain"
                                                sizes="80px"
                                            />
                                        </motion.div>
                                    </div>
                                </div>

                                <h3
                                    className="font-cormorant text-xl leading-snug font-bold whitespace-pre-line mb-3"
                                    style={{ color: DARK_GREEN }}
                                >
                                    {partner.name}
                                </h3>

                                <motion.span
                                    initial={{ scaleX: 0.4 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    className="h-0.75 w-20 rounded-full"
                                    style={{ backgroundColor: GOLD }}
                                />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {!isLocked && (
                    <div className="mt-10 flex justify-center items-center gap-3">
                        {partners.map((_, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => swiperRef.current?.slideTo(index)}
                                    className="relative flex h-5 w-5 items-center justify-center"
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
                                            layoutId="active-dot"
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
        </section>
    );
};

export default OurPartnersSection;