"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import PrimaryButton from "../common/PrimaryButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "Is my donation tax-deductible?",
    a: "Yes! Donations made to Chishty Foundation are eligible for a 50% tax exemption under Section 80G of the Income Tax Act, India. To receive your certificate, please provide your PAN details during donation.",
  },
  {
    q: "How will my donation be used?",
    a: "100% of your contributions go towards verified field programmes: daily langar & hunger relief, child education support, emergency medical aid, and community empowerment across Ajmer and surrounding districts.",
  },
  {
    q: "Can I transfer directly from my bank account?",
    a: "Absolutely. You can initiate a direct NEFT, RTGS, or IMPS transfer to our official Bank of India (BOI) or ICICI Bank accounts shown on this page.",
  },
  {
    q: "How will I receive my donation receipt?",
    a: "Upon completing your transfer, an electronic receipt with 80G registration details will be emailed to you within 24 to 48 business hours.",
  },
];

const ArrowIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.5 1L15 6M15 6L9.5 11M15 6H1"
      stroke="#0A3231"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DonationImpactSection = () => {
  return (
    <section className="bg-[#F9F3EE] py-16 md:py-24 border-t border-[#F1E1D2] font-satoshi">
      <div className="container mx-auto px-5 md:px-0">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionHeading
            align="center"
            eyebrow="TRANSPARENCY & ASSURANCE"
            title={
              <>
                Frequently Asked <span className="text-dark-yellow">Questions</span>
              </>
            }
            description="Clear information about your donations, 80G tax exemptions, and how we ensure every rupee reaches those who need it."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ECE2CB] shadow-sm"
            >
              <h4 className="font-cormorant font-bold text-xl text-dark-green mb-2.5">
                {faq.q}
              </h4>
              <p className="text-dark-green/75 text-sm leading-relaxed">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="bg-dark-green rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto text-white flex flex-col items-center"
        >
          <span className="text-light-yellow text-xs font-bold uppercase tracking-widest mb-2">
            Need Personal Assistance?
          </span>
          <h3 className="font-cormorant font-bold text-3xl md:text-4xl mb-4">
            Have Questions About CSR or Large Grants?
          </h3>
          <p className="text-white/80 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
            Write directly to our Chairman's office or visit the Khanqah at Ajmer Sharif. We welcome partnerships with institutions and individuals worldwide.
          </p>
          <Link href="/contact">
            <PrimaryButton
              text="Contact Chairman's Office"
              containerClassName="!bg-dark-yellow"
              iconWrapperClassName="!bg-white"
              icon={<ArrowIcon />}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationImpactSection;
