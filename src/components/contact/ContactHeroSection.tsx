"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import sectionbg from "../../assets/images/contact/contact-hero-bg.png";
import SectionHeading from "../common/SectionHeading";
import PrimaryButton from "../common/PrimaryButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const HeartIcon = () => (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 12.5L6.02 11.61C2.65 8.55 0.5 6.6 0.5 4.2C0.5 2.25 2.02 0.75 4 0.75C5.11 0.75 6.19 1.27 7 2.1C7.81 1.27 8.89 0.75 10 0.75C11.98 0.75 13.5 2.25 13.5 4.2C13.5 6.6 11.35 8.55 7.98 11.62L7 12.5Z" stroke="#0A3231" strokeWidth="1.2" />
    </svg>
);

const MailIcon = () => (
    <svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.3335 19C1.66857 19 1.11343 18.7908 0.668056 18.3723C0.222685 17.9539 0 17.4323 0 16.8075V2.19246C0 1.56773 0.222685 1.04613 0.668056 0.627679C1.11343 0.209226 1.66857 0 2.3335 0H23.6665C24.3314 0 24.8866 0.209226 25.3319 0.627679C25.7773 1.04613 26 1.56773 26 2.19246V16.8075C26 17.4323 25.7773 17.9539 25.3319 18.3723C24.8866 18.7908 24.3314 19 23.6665 19H2.3335ZM13.3376 9.39414C13.4421 9.36022 13.5453 9.31803 13.6471 9.26759L24.089 2.84491C24.226 2.76642 24.3148 2.65977 24.3555 2.52496C24.3962 2.39015 24.3888 2.2558 24.3335 2.12189C24.2964 1.94795 24.1751 1.82174 23.9695 1.74325C23.7639 1.66499 23.5648 1.68071 23.3722 1.79041L13 8.14286L2.62781 1.79041C2.43521 1.68071 2.24081 1.65764 2.04461 1.7212C1.84817 1.78476 1.72214 1.90961 1.66653 2.09577C1.61116 2.23488 1.60381 2.37624 1.6445 2.51988C1.68519 2.66351 1.77402 2.77185 1.911 2.84491L12.3529 9.26759C12.4547 9.31803 12.5579 9.36022 12.6624 9.39414C12.7671 9.42807 12.8796 9.44504 13 9.44504C13.1204 9.44504 13.2329 9.42807 13.3376 9.39414Z" fill="#F6C44D" />
    </svg>
);

const LocationIcon = () => (
    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.33874 24.8904C9.11843 24.8175 8.91516 24.6988 8.72891 24.5343C7.72626 23.6033 6.71 22.5663 5.68011 21.4235C4.65046 20.2807 3.71511 19.0973 2.87405 17.8731C2.033 16.6489 1.34378 15.3992 0.806412 14.1239C0.268804 12.8487 0 11.6041 0 10.3901C0 7.37757 0.970701 4.89275 2.9121 2.93565C4.85327 0.97855 7.2159 0 10 0C12.7841 0 15.1467 0.97855 17.0879 2.93565C19.0293 4.89275 20 7.37757 20 10.3901C20 11.6041 19.7312 12.8442 19.1936 14.1104C18.6562 15.3764 17.9715 16.626 17.1393 17.8592C16.3074 19.0926 15.3765 20.2761 14.3467 21.4097C13.317 22.5434 12.3009 23.5758 11.2982 24.5069C11.112 24.6714 10.9041 24.7947 10.6747 24.8768C10.4452 24.9589 10.2203 25 10 25C9.7797 25 9.55928 24.9634 9.33874 24.8904ZM11.6111 11.7607C12.0547 11.3124 12.2766 10.7697 12.2766 10.1327C12.2766 9.49546 12.0547 8.95267 11.6111 8.50434C11.1676 8.05624 10.6306 7.83219 10 7.83219C9.36939 7.83219 8.83237 8.05624 8.38894 8.50434C7.94528 8.95267 7.72345 9.49546 7.72345 10.1327C7.72345 10.7697 7.94528 11.3124 8.38894 11.7607C8.83237 12.2088 9.36939 12.4329 10 12.4329C10.6306 12.4329 11.1676 12.2088 11.6111 11.7607Z" fill="#F6C44D" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.7777 21.2037C27.6527 20.7601 27.2959 20.4169 26.847 20.3076C24.9166 19.8397 22.7813 18.8903 20.6721 17.5606C20.2934 17.3219 19.812 17.2957 19.4153 17.4927C18.8388 17.7778 18.3137 18.1553 17.854 18.6149C17.286 19.1824 16.8483 19.8405 16.5509 20.5739C14.8123 19.4107 13.133 18.0217 11.5541 16.4433C9.97674 14.8652 8.58855 13.1852 7.42501 11.447C8.15903 11.1493 8.81767 10.7132 9.38601 10.1446C9.84538 9.68613 10.2234 9.16121 10.5089 8.58481C10.7063 8.18823 10.6798 7.70659 10.4417 7.32792C9.11285 5.21856 8.16388 3.0842 7.69667 1.15428C7.58808 0.705098 7.24476 0.348438 6.80069 0.223458C5.8215 -0.0529902 4.78147 -0.0731362 3.7922 0.164139C2.87906 0.383507 2.01927 0.824109 1.28189 1.46319C-0.305573 3.33714 -0.422375 6.40046 0.952381 10.0872C2.21257 13.4699 4.63892 17.0652 7.78437 20.2109C10.9291 23.356 14.5246 25.7832 17.9081 27.0457C19.6146 27.6829 21.1871 28 22.5708 28C24.1762 28 25.5267 27.5728 26.5346 26.7204L26.5596 26.6957C27.1746 25.9835 27.6157 25.1243 27.8348 24.2118C28.0732 23.2224 28.0531 22.1826 27.7777 21.2037Z" fill="#F6C44D" />
    </svg>
);

const ClockIcon = () => (
   <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.58333 27.125C1.87292 27.125 1.26476 26.872 0.758854 26.3661C0.252951 25.8602 0 25.2521 0 24.5417V9.04167C0 8.33125 0.252951 7.72309 0.758854 7.21719C1.26476 6.71128 1.87292 6.45833 2.58333 6.45833H3.875V2.58333C3.875 1.87292 4.12795 1.26476 4.63385 0.758854C5.13976 0.252951 5.74792 0 6.45833 0H16.7917C17.5021 0 18.1102 0.252951 18.6161 0.758854C19.122 1.26476 19.375 1.87292 19.375 2.58333V6.45833H20.6667C21.3771 6.45833 21.9852 6.71128 22.4911 7.21719C22.997 7.72309 23.25 8.33125 23.25 9.04167V24.5417C23.25 25.2521 22.997 25.8602 22.4911 26.3661C21.9852 26.872 21.3771 27.125 20.6667 27.125H2.58333ZM6.45833 6.45833H16.7917V2.58333H6.45833V6.45833ZM11.625 22.6042C13.2396 22.6042 14.612 22.0391 15.7422 20.9089C16.8724 19.7786 17.4375 18.4062 17.4375 16.7917C17.4375 15.1771 16.8724 13.8047 15.7422 12.6745C14.612 11.5443 13.2396 10.9792 11.625 10.9792C10.0104 10.9792 8.63802 11.5443 7.50781 12.6745C6.3776 13.8047 5.8125 15.1771 5.8125 16.7917C5.8125 18.4062 6.3776 19.7786 7.50781 20.9089C8.63802 22.0391 10.0104 22.6042 11.625 22.6042ZM12.2708 16.5333V14.2083C12.2708 14.0361 12.2062 13.8854 12.0771 13.7562C11.9479 13.6271 11.7972 13.5625 11.625 13.5625C11.4528 13.5625 11.3021 13.6271 11.1729 13.7562C11.0437 13.8854 10.9792 14.0361 10.9792 14.2083V16.501C10.9792 16.6733 11.0115 16.8401 11.076 17.0016C11.1406 17.163 11.2375 17.3083 11.3667 17.4375L12.6583 18.7292C12.7875 18.8583 12.9382 18.9229 13.1104 18.9229C13.2826 18.9229 13.4333 18.8583 13.5625 18.7292C13.6917 18.6 13.7562 18.4493 13.7562 18.2771C13.7562 18.1049 13.6917 17.9542 13.5625 17.825L12.2708 16.5333Z" fill="#F6C44D" />
    </svg>
);

const infoItems = [
    {
        icon: <LocationIcon />,
        label: "ADDRESS",
        lines: ["Dargah Sharif, Ajmer", "Rajasthan, India - 305001"],
        href: "https://www.google.com/maps/search/?api=1&query=Dargah+Sharif+Ajmer+Rajasthan+India",
        type: "external",
    },
    {
        icon: <MailIcon />,
        label: "EMAIL US",
        lines: ["info@chishtyfoundation.org", "connect@chishtyfoundation.org"],
        links: ["mailto:info@chishtyfoundation.org", "mailto:connect@chishtyfoundation.org"],
        type: "email",
    },
    {
        icon: <PhoneIcon />,
        label: "CALL US",
        lines: ["+91 823 123 4567", "+91 982 555 7890"],
        links: ["tel:+918231234567", "tel:+919825557890"],
        type: "phone",
    },
    {
        icon: <ClockIcon />,
        label: "OFFICE HOURS",
        lines: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"],
        type: "text",
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

const ContactHeroSection = () => {
    return (
        <section className="relative">
            <div className="relative overflow-hidden pb-28 md:pb-36">
                <div className="absolute inset-0">
                    <Image src={sectionbg} alt="Ajmer Sharif Dargah at night" fill priority className="object-cover" />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative container mx-auto px-5 md:px-0 pt-24 md:pt-32 pb-8"
                >
                    <div className="max-w-xl">
                        <motion.div variants={fadeUp} className="pt-10">
                            <SectionHeading
                                align="left"
                                eyebrow="GET IN TOUCH"
                                eyebrowColor="#ffffff"
                                starColor="white"
                                title="Contact Us"
                                description="We'd love to hear from you. Reach out with your questions, ideas, or to get involved."
                                titleColor="#ffffff"
                                descriptionColor="#ffffff"
                                maxWidth="max-w-3xl"
                            />
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-8">
                            <Link href="/contact">
                                <PrimaryButton
                                    containerClassName="!bg-dark-yellow shadow-md hover:shadow-xl transition-shadow duration-300"
                                    iconWrapperClassName="!bg-white"
                                    text="Donate Now"
                                    icon={<HeartIcon />}
                                />
                            </Link>
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
                    className="relative -mt-20 md:-mt-24 rounded-4xl bg-white px-6 md:px-10 py-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
                        {infoItems.map((item, i) => (
                            <motion.div
                                key={item.label}
                                custom={i}
                                variants={cardItemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group flex flex-col gap-3 bg-beige border border-[#F2E7D6] p-5 rounded-3xl"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.08, rotate: 6 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    className="h-20 w-20 rounded-full bg-white flex items-center justify-center border border-[#F2E7D6] text-dark-yellow"
                                >
                                    {item.icon}
                                </motion.div>

                                <div className="mt-3">
                                    <p className="font-cormorant text-xl tracking-[0.12em] font-bold text-dark-green uppercase mb-2">
                                        {item.label}
                                    </p>

                                    {item.type === "external" ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-satoshi text-sm text-dark-green/60 leading-relaxed hover:text-dark-green transition-colors"
                                        >
                                            {item.lines.map((line) => (
                                                <span key={line} className="block">{line}</span>
                                            ))}
                                        </a>
                                    ) : item.type === "email" || item.type === "phone" ? (
                                        item.lines.map((line, index) => (
                                            <a
                                                key={line}
                                                href={item.links?.[index]}
                                                className="block font-satoshi text-sm text-dark-green/60 leading-relaxed hover:text-dark-green transition-colors"
                                            >
                                                {line}
                                            </a>
                                        ))
                                    ) : (
                                        item.lines.map((line) => (
                                            <p key={line} className="font-satoshi text-sm text-dark-green/60 leading-relaxed">
                                                {line}
                                            </p>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactHeroSection;