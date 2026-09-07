"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import sectionbg from "../../assets/images/causes/cause-hero-img.png";
import SectionHeading from "../common/SectionHeading";
import PrimaryButton from "../common/PrimaryButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
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

export default function InsightsHero() {
  return (
    <section className="relative">
      <div className="relative overflow-hidden pb-28">
        <div className="absolute inset-0 bg-dark-green">
          <Image
            src={sectionbg}
            alt="Chishty Foundation Insights and Research"
            fill
            priority
            className="object-cover"
          />
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
                eyebrow="KNOWLEDGE &amp; WISDOM"
                title={
                  <>
                    Thoughts, Articles &amp; <span className="text-dark-yellow">Insights</span>
                  </>
                }
                description="Explore research papers, spiritual discourses, interfaith peace publications, and analytical articles from the Chishty Foundation."
              />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex justify-center md:justify-start">
              <Link href="/get-involved">
                <PrimaryButton
                  containerClassName="!bg-dark-yellow shadow-md hover:shadow-xl transition-shadow duration-300"
                  iconWrapperClassName="!bg-dark-green"
                  text="Join Our Network"
                  icon={<BookIcon />}
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
