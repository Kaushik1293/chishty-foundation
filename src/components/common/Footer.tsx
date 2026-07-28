'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import type { StaticImageData } from 'next/image'
import logo from '../../assets/images/homepage/white-logo.png'
import star from '../../assets/images/homepage/vectors/common/gold-star.svg'
import aboutus from '../../assets/images/homepage/footer/about-us.svg'
import whtawedo from '../../assets/images/homepage/footer/what-we-do.svg'
import getinvolved from '../../assets/images/homepage/footer/get-involved.svg'
import contactus from '../../assets/images/homepage/footer/contact-us.svg'

import heart from '../../assets/images/homepage/footer/heart.svg'
import location from '../../assets/images/homepage/footer/location-icon.svg'
import phone from '../../assets/images/homepage/footer/phone-icon.svg'
import email from '../../assets/images/homepage/footer/mail-icon.svg'
import web from '../../assets/images/homepage/footer/web-icon.svg'

import fb from '../../assets/images/homepage/vectors/social-media/fb-gold.svg'
import insta from '../../assets/images/homepage/vectors/social-media/insta-gold.svg'
import yt from '../../assets/images/homepage/vectors/social-media/yt-gold.svg'
import wp from '../../assets/images/homepage/vectors/social-media/wp-gold.svg'
import x from '../../assets/images/homepage/vectors/social-media/x-gold.svg'

/* ---------------- helpers ---------------- */

type ImgSrc = string | StaticImageData
const src = (img: ImgSrc): string => (typeof img === 'string' ? img : img.src)

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ---------------- animation variants ---------------- */

const containerStagger: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.08, ease: EASE_OUT },
    }),
}

const iconPop: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: (i: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, delay: 0.15 + i * 0.07, ease: 'backOut' },
    }),
}

const linkItem: Variants = {
    hidden: { opacity: 0, x: -12 },
    show: (i: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.45, delay: i * 0.06, ease: EASE_OUT },
    }),
}

const bubbleFill: Variants = {
    rest: { scale: 0, opacity: 0 },
    hover: { scale: 1.8, opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
}

const bubbleGlow: Variants = {
    rest: { opacity: 0, scale: 1 },
    hover: { opacity: 1, scale: 1.25, transition: { duration: 0.45, ease: EASE_OUT } },
}

const bubbleIcon: Variants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 360, scale: 1.15, transition: { duration: 0.55, ease: EASE_OUT } },
}

/* ---------------- static data ---------------- */

const socialLinks: { icon: ImgSrc; label: string }[] = [
    { icon: fb, label: 'Facebook' },
    { icon: insta, label: 'Instagram' },
    { icon: yt, label: 'YouTube' },
    { icon: wp, label: 'WhatsApp' },
    { icon: x, label: 'X' },
]

const footerColumns: { icon: ImgSrc; heading: string; links: string[] }[] = [
    {
        icon: aboutus,
        heading: 'About Us',
        links: ['Our Story', 'Our Mission', 'Our Impact', 'Our Team', 'Our Partners', 'News & Updates'],
    },
    {
        icon: whtawedo,
        heading: 'What We Do',
        links: [
            'Education',
            'Food & Nutrition',
            'Healthcare',
            'Women Empowerment',
            'Child Welfare',
            'Community Support',
        ],
    },
    {
        icon: getinvolved,
        heading: 'Get Involved',
        links: [
            'Donate Now',
            'Become a Partner',
            'Volunteer With Us',
            'Fundraise',
            'Corporate Partnership',
            'Campaigns',
        ],
    },
]

const contactDetails: { icon: ImgSrc; text: string }[] = [
    { icon: location, text: '123 Humanity Street, New Delhi, India 110001' },
    { icon: phone, text: '+91 98765 43210' },
    { icon: email, text: 'info@humanityfirst.org' },
    { icon: web, text: 'www.humanityfirst.org' },
]

import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathname = usePathname()
    const isAsgardRoute = pathname?.startsWith('/asgard') || pathname?.startsWith('/login') || pathname?.startsWith('/events') || pathname?.startsWith('/asgard/partners')

    if (isAsgardRoute) return null

    return (
        <footer className="bg-[#012F2B]">
            <div className="container mx-auto px-5 md:px-0 py-16">
                <motion.div
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr] gap-12"
                >
                    <motion.div variants={fadeUp} custom={0}>
                        <motion.img
                            src={src(logo)}
                            alt="Chishty Foundation"
                            whileHover={{ scale: 1.03 }}
                            className="h-20 w-auto object-contain"
                        />

                        <div className="flex items-center gap-3 mt-8">
                            <span className="h-px flex-1 bg-white/15" />
                            <motion.img
                                src={src(star)}
                                alt=""
                                className="w-6 h-6"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.3 },
                                }}
                            />
                            <span className="h-px flex-1 bg-white/15" />
                        </div>

                        <p className="text-white/70 text-sm leading-relaxed mt-6 max-w-xs">
                            We are committed to building a better tomorrow by uplifting
                            lives, empowering communities, and nurturing hope for all.
                        </p>

                        <motion.div
                            variants={containerStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mt-7"
                        >
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={social.label}
                                    href="#"
                                    aria-label={social.label}
                                    variants={iconPop}
                                    custom={i}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap={{ scale: 0.92 }}
                                    className="relative w-11 h-11 rounded-full border border-dark-yellow/60 flex items-center justify-center overflow-hidden"
                                    style={{ willChange: 'transform' }}
                                >
                                    <motion.span
                                        variants={bubbleFill}
                                        className="absolute inset-0 rounded-full bg-black/10"
                                    />
                                    <motion.span
                                        variants={bubbleGlow}
                                        className="absolute inset-0 rounded-full"
                                        style={{ boxShadow: '0 0 18px 2px rgba(189,140,59,0.55)' }}
                                    />
                                    <motion.img
                                        src={src(social.icon)}
                                        alt=""
                                        variants={bubbleIcon}
                                        className="relative z-10 w-4 h-4"
                                    />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {footerColumns.map((col, colIndex) => (
                        <motion.div
                            key={col.heading}
                            variants={fadeUp}
                            custom={colIndex + 1}
                            className="lg:border-l lg:border-white/10 lg:pl-10"
                        >
                            <motion.img
                                src={src(col.icon)}
                                alt=""
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                                className="w-9 h-9 mb-4"
                            />
                            <h4 className="text-white font-bold tracking-widest text-sm mb-6">
                                {col.heading.toUpperCase()}
                            </h4>
                            <motion.ul
                                variants={containerStagger}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                {col.links.map((link, i) => (
                                    <motion.li key={link} variants={linkItem} custom={i}>
                                        <a
                                            href="#"
                                            className="group relative inline-flex items-center text-white/70 text-[15px] transition-colors duration-200 hover:text-dark-yellow"
                                        >
                                            <span className="relative">
                                                {link}
                                                <span className="pointer-events-none absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-dark-yellow transition-all duration-300 ease-out group-hover:w-full" />
                                            </span>
                                            <span className="ml-0 max-w-0 overflow-hidden text-dark-yellow opacity-0 transition-all duration-300 ease-out group-hover:ml-1.5 group-hover:max-w-[16px] group-hover:opacity-100">
                                                &#8594;
                                            </span>
                                        </a>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={fadeUp}
                        custom={4}
                        className="lg:border-l lg:border-white/10 lg:pl-10"
                    >
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: -6 }}
                            className="w-14 h-14 rounded-full border border-dark-yellow/60 flex items-center justify-center mb-4"
                        >
                            <img src={src(contactus)} alt="" className="w-14 h-14" />
                        </motion.div>
                        <h4 className="text-white font-bold tracking-widest text-sm mb-6">
                            CONTACT US
                        </h4>

                        <motion.ul
                            variants={containerStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="space-y-5"
                        >
                            {contactDetails.map((detail, i) => (
                                <motion.li
                                    key={detail.text}
                                    variants={linkItem}
                                    custom={i}
                                    className="flex items-start gap-3"
                                >
                                    <img src={src(detail.icon)} alt="" className="w-5 h-5 mt-0.5 shrink-0" />
                                    <span className="text-white/80 text-[15px] leading-snug">
                                        {detail.text}
                                    </span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </motion.div>
            </div>

            <div className="bg-[#012420]">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-5 md:px-0 py-10 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                        <span>&#169; 2026 Humanity First. All Rights Reserved.</span>
                        <span className="hidden sm:inline-block h-4 w-px bg-dark-yellow/50" />
                        <a href="#" className="hover:text-dark-yellow transition-colors">
                            Privacy Policy
                        </a>
                        <span className="hidden sm:inline-block h-4 w-px bg-dark-yellow/50" />
                        <a href="#" className="hover:text-dark-yellow transition-colors">
                            Terms &amp; Conditions
                        </a>
                    </div>

                    <div className="flex items-center gap-1.5 text-white/70 text-sm">
                        <span>Made with</span>
                        <motion.img
                            src={src(heart)}
                            alt=""
                            animate={{ scale: [1, 1.25, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-4 h-4"
                        />
                        <span>
                            by <span className="font-semibold underline text-white">Ascendtis</span>.
                        </span>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer