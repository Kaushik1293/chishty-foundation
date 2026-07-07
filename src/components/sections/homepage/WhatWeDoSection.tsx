'use client'
import { motion, type Variants } from 'framer-motion'
import SectionHeading from '../../common/SectionHeading'
import characterImage from '../../../assets/images/homepage/whatwedosection/what-we-do-img.png'
import icon1 from '../../../assets/images/homepage/whatwedosection/Global-Impact.svg'
import icon2 from '../../../assets/images/homepage/whatwedosection/Stronger-Together.svg'
import icon3 from '../../../assets/images/homepage/whatwedosection/integrity.svg'
import halfPattern from '../../../assets/images/homepage/vectors/common/half-patter-horizontal.svg'

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.15 },
    }),
}

const featureCards = [
    {
        icon: icon1,
        title: 'Global Impact',
        desc: "Working across countries to bring hope where it's needed most.",
        iconBg: 'bg-dark-yellow',
    },
    {
        icon: icon2,
        title: 'Stronger Together',
        desc: 'We serve individuals and families with compassion and respect.',
        iconBg: 'bg-dark-green',
    },
    {
        icon: icon3,
        title: 'Built on Integrity',
        desc: 'We operate with transparency, accountability and a deep sense of trust.',
        iconBg: 'bg-dark-yellow',
    },
]

const WhatWeDoSection = () => {
    return (
        <section className="relative bg-[#FBEFE4] py-20 overflow-hidden">

            <motion.img
                src={halfPattern.src}
                alt=""
                initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="pointer-events-none absolute bottom-0 right-100 w-105 max-w-[60vw] select-none z-0 object-contain"
            />

            <div className="container relative mx-auto px-5 md:px-0 z-10">
                <div className="grid lg:grid-cols-2 gap-x-16 gap-y-14 items-start">

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div variants={fadeUp} custom={0}>
                            <SectionHeading
                                align="left"
                                eyebrow="WHAT WE DO"
                                title={
                                    <>
                                        Creating Meaningful Change,
                                        <span className="text-dark-yellow pl-1">
                                            Where It Matters Most
                                        </span>
                                    </>
                                }
                                description={
                                    <>
                                        <p className="font-medium leading-loose text-dark-green">
                                            At the Chishty Foundation, our work is a reflection of
                                            the timeless teachings of the Chishty Sufi Order, which
                                            emphasize compassion, service, and the upliftment of
                                            humanity.
                                        </p>
                                        <p className="font-medium leading-loose mt-4 text-dark-green">
                                            Established in 2007, we are committed to addressing some
                                            of the most pressing challenges facing society today,
                                            guided by the belief that true spirituality is rooted in
                                            selfless service to others.
                                        </p>
                                    </>
                                }
                            />
                        </motion.div>


                        <motion.a
                            href="#"
                            variants={fadeUp}
                            custom={1}
                            className="group mt-8 inline-flex items-center gap-4"
                        >
                            <span className="relative text-sm font-semibold tracking-widest text-[#483028]">
                                DISCOVER OUR JOURNEY
                                <span className="absolute -bottom-4 left-0 h-[1.5px]  mt-2 bg-linear-to-r from-dark-yellow  transition-all duration-500 w-full" />
                            </span>
                            <motion.span
                                className="flex items-center justify-center w-11 h-11 rounded-full border border-dark-yellow text-dark-green shrink-0"
                                whileHover={{
                                    backgroundColor: '#C9974A',
                                    color: '#ffffff',
                                    scale: 1.06,
                                }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                            >
                                <motion.svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </motion.svg>
                            </motion.span>
                        </motion.a>

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
                        >
                            {featureCards.map((card, i) => (
                                <motion.div
                                    key={card.title}
                                    variants={fadeUp}
                                    custom={i}
                                    whileHover={{
                                        y: -8,
                                        boxShadow: '0 20px 35px -12px rgba(178,139,63,0.25)',
                                    }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="bg-white/60 rounded-2xl p-6 cursor-pointer border border-[#F1E3D7]"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 8, scale: 1.08 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        className={`w-18 h-18 rounded-full flex items-center justify-center mb-5 ${card.iconBg}`}
                                    >
                                        <img src={card.icon.src} alt={card.title} className="w-8 h-8" />
                                    </motion.div>
                                    <h3 className="font-semibold text-xl text-dark-green mb-3">
                                        {card.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="h-px w-8 bg-dark-yellow/60" />
                                        <span className="w-3 h-3 rotate-45 border-dark-yellow border" />
                                        <span className="h-px w-8 bg-dark-yellow/60" />
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {card.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="relative flex items-center justify-center lg:justify-end"
                    >

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="relative"
                        >
                            <motion.img
                                src={characterImage.src}
                                alt="Chishty Foundation representative presenting a memento"
                                className="relative w-full h-auto select-none"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />

                        </motion.div>
                    </motion.div>
                </div>



            </div>
        </section>
    )
}

export default WhatWeDoSection