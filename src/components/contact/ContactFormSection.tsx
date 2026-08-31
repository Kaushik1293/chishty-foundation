"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import mosqueImage from '../../assets/images/contact/formSection/mosque-img.png';
import patternImage from '../../assets/images/contact/formSection/right-pattern.svg';
import SectionHeading from '../common/SectionHeading';

const EASE = [0.16, 1, 0.3, 1] as const;

type FormData = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    agreedToPrivacy: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const subjectOptions = [
    'General Enquiry',
    'Volunteering',
    'Donation & Support',
    'Partnership',
    'Media & Press',
    'Event Invitation',
];

const WhatsAppIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.42 1.3-1.96 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
    </svg>
);

const ArrowIcon = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.5 1L15 6M15 6L9.5 11M15 6H1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const EASE_STAGGER: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const ContactFormSection = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: subjectOptions[0],
        message: '',
        agreedToPrivacy: true,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        if (!formData.agreedToPrivacy) {
            newErrors.agreedToPrivacy = 'Please accept the Privacy Policy to proceed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: val }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
        }
    };

    const inputBaseClasses =
        'w-full rounded-xl bg-[#FBF6F0] border px-4 py-3.5 font-satoshi text-sm text-dark-green placeholder:text-dark-green/40 outline-none transition-colors duration-300 focus:border-dark-yellow';

    return (
        <section className="relative bg-beige py-16 md:py-24">
            <div className="container mx-auto px-5 md:px-0 grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8">
                <motion.div
                    variants={EASE_STAGGER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-white rounded-4xl shadow-[0_10px_40px_-16px_rgba(0,0,0,0.08)] px-7 md:px-10 py-9 md:py-10"
                >
                    <motion.div variants={fadeUp} custom={0}>
                        <SectionHeading
                            align="left"
                            eyebrow="Contact Us"
                            title={
                                <>
                                    Send Us a
                                    <span className="text-dark-yellow pl-1">
                                        Message
                                    </span>
                                </>
                            }
                            description={
                                <>
                                    <p className="font-medium leading-normal text-dark-green text-lg">
                                        We&apos;re here to help! Fill out the form and our team will get back to you as soon as possible.
                                    </p>
                                </>
                            }
                        />
                    </motion.div>

                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 p-8 rounded-2xl bg-dark-green text-white text-center"
                        >
                            <h4 className="font-cormorant text-2xl md:text-3xl text-dark-yellow font-bold mb-3">
                                Thank You
                            </h4>
                            <p className="font-satoshi text-base text-white/90 leading-relaxed">
                                Thank you — your message has reached us. Someone from the Foundation will reply shortly.
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="mt-8">
                            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block font-satoshi text-sm text-dark-green mb-2">
                                        Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange('name')}
                                        placeholder="Enter your full name"
                                        className={`${inputBaseClasses} ${errors.name ? 'border-red-400' : 'border-transparent'}`}
                                    />
                                    {errors.name && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 text-xs mt-1.5 font-satoshi"
                                        >
                                            {errors.name}
                                        </motion.p>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-satoshi text-sm text-dark-green mb-2">
                                        Email<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange('email')}
                                        placeholder="Enter your email address"
                                        className={`${inputBaseClasses} ${errors.email ? 'border-red-400' : 'border-transparent'}`}
                                    />
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 text-xs mt-1.5 font-satoshi"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block font-satoshi text-sm text-dark-green mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange('phone')}
                                        placeholder="Enter your contact number"
                                        className={`${inputBaseClasses} border-transparent`}
                                    />
                                </div>

                                <div>
                                    <label className="block font-satoshi text-sm text-dark-green mb-2">
                                        Subject
                                    </label>
                                    <select
                                        value={formData.subject}
                                        onChange={handleChange('subject')}
                                        className={`${inputBaseClasses} border-transparent cursor-pointer`}
                                    >
                                        {subjectOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="mb-5">
                                <label className="block font-satoshi text-sm text-dark-green mb-2">
                                    Message<span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange('message')}
                                    placeholder="Type your message here..."
                                    className={`${inputBaseClasses} resize-none ${errors.message ? 'border-red-400' : 'border-transparent'}`}
                                />
                                {errors.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-xs mt-1.5 font-satoshi"
                                    >
                                        {errors.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div variants={fadeUp} className="mb-7">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreedToPrivacy}
                                        onChange={handleChange('agreedToPrivacy')}
                                        className="h-4 w-4 rounded text-dark-green focus:ring-dark-yellow cursor-pointer"
                                    />
                                    <span className="font-satoshi text-xs sm:text-sm text-dark-green/80">
                                        I agree to the{' '}
                                        <Link href="/privacy-policy" className="underline hover:text-dark-yellow transition-colors font-medium">
                                            Privacy Policy
                                        </Link>
                                    </span>
                                </label>
                                {errors.agreedToPrivacy && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-xs mt-1.5 font-satoshi"
                                    >
                                        {errors.agreedToPrivacy}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div variants={fadeUp}>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ duration: 0.25, ease: EASE }}
                                    className="rounded-full bg-dark-green text-white font-satoshi font-medium px-8 py-3.5 hover:bg-dark-green/90 transition-colors shadow-md"
                                >
                                    Send Message
                                </motion.button>
                            </motion.div>
                        </form>
                    )}
                </motion.div>

                <div className="flex flex-col gap-6 lg:gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        whileHover={{ scale: 1.01 }}
                        className="relative rounded-4xl overflow-hidden aspect-16/10 lg:flex-1"
                    >
                        <Image
                            src={mosqueImage}
                            alt="Chishty Foundation mosque"
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                        className="relative overflow-hidden rounded-4xl bg-dark-green px-8 py-9"
                    >
                        <Image
                            src={patternImage}
                            alt=""
                            className="absolute top-0 right-0 h-full w-auto opacity-40 pointer-events-none select-none"
                        />

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="relative z-10 mb-6 inline-block"
                        >
                            <motion.span
                                aria-hidden
                                animate={{
                                    opacity: [0.35, 0.7, 0.35],
                                    scale: [1, 1.25, 1],
                                }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-0 rounded-full bg-[#25D366] blur-xl"
                            />

                            <motion.span
                                aria-hidden
                                animate={{
                                    boxShadow: [
                                        '0 0 0 0px rgba(37,211,102,0.45)',
                                        '0 0 0 14px rgba(37,211,102,0)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                                className="absolute inset-0 rounded-full"
                            />

                            <div className="relative h-16 w-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.6)]">
                                <WhatsAppIcon />
                            </div>
                        </motion.div>

                        <h3 className="relative z-10 font-cormorant font-semibold text-white text-2xl mb-2">
                            Chat With Us On WhatsApp
                        </h3>
                        <p className="relative z-10 font-satoshi text-white/70 text-sm mb-6">
                            Get instant help and quick responses.
                        </p>

                        <motion.a
                            href="https://wa.me/919829174973?text=Assalamu%20Alaikum%20%E2%80%94%20I%20would%20like%20to%20know%20more%20about%20Chishty%20Foundation."
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="relative z-10 group inline-flex items-center gap-3 rounded-full bg-white pl-5 pr-2 py-2 font-satoshi font-semibold text-dark-green text-sm shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            Chat With Us On WhatsApp
                            <motion.span
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.25, ease: EASE }}
                                className="h-8 w-8 rounded-full bg-[#25D366] flex items-center justify-center text-white"
                            >
                                <ArrowIcon />
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactFormSection;