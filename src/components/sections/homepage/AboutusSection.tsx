'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import type { StaticImageData } from 'next/image'
import human1 from '../../../assets/images/homepage/aboutsection/human-1.png'
import human2 from '../../../assets/images/homepage/aboutsection/human-2.png'
import human3 from '../../../assets/images/homepage/aboutsection/human-3.png'
import human4 from '../../../assets/images/homepage/aboutsection/human-4.png'
import human5 from '../../../assets/images/homepage/aboutsection/human-5.png'
import mosque from '../../../assets/images/homepage/aboutsection/mosque-vector.png'
import about1 from '../../../assets/images/homepage/aboutsection/about-img-1.png'
import about2 from '../../../assets/images/homepage/aboutsection/about-img-2.png'
import about3 from '../../../assets/images/homepage/aboutsection/about-img-3.png'
import about4 from '../../../assets/images/homepage/aboutsection/about-img-4.png'
import map from '../../../assets/images/homepage/aboutsection/map-img.png'
import quote from '../../../assets/images/homepage/aboutsection/quote-icon.svg'
import logoIcon from '../../../assets/images/homepage/aboutsection/yellow-logo-icon.svg'
import liveImpact from '../../../assets/images/homepage/aboutsection/live-impact.svg'
import mealsDistributed from '../../../assets/images/homepage/aboutsection/meals-distributed.svg'
import studentsSupported from '../../../assets/images/homepage/aboutsection/students-supported.svg'
import medicalCamps from '../../../assets/images/homepage/aboutsection/meals-distributed.svg'
import SectionHeading from '../../common/SectionHeading'

/* ---------------- helpers ---------------- */

// Next.js static imports resolve to StaticImageData at build time; native
// <img>/<motion.img> tags need a plain string, so unwrap it here.
type ImgSrc = string | StaticImageData
const src = (img: ImgSrc): string => (typeof img === 'string' ? img : img.src)

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ---------------- animation variants ---------------- */

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: EASE_OUT },
    }),
}

const containerStagger: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
}

const avatarPop: Variants = {
    hidden: { opacity: 0, scale: 0.4, x: -10 },
    show: (i: number = 0) => ({
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 0.5, delay: 0.3 + i * 0.08, ease: 'backOut' },
    }),
}

const imgReveal: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 24 },
    show: (i: number = 0) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.1, ease: EASE_OUT },
    }),
}

/* ---------------- count-up number ---------------- */

interface CountUpProps {
    target: number
    suffix?: string
}

const CountUp: React.FC<CountUpProps> = ({ target, suffix = '' }) => {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!inView) return
        const numeric = target
        const duration = 1400
        const start = performance.now()

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(numeric * eased)
            if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [inView, target])

    const display = target % 1 !== 0 ? value.toFixed(1) : Math.round(value)

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
    )
}

/* ---------------- static data ---------------- */

const avatars: ImgSrc[] = [human1, human2, human3, human4, human5]

const galleryImages: { src: ImgSrc; radius: string }[] = [
    { src: about1, radius: 'rounded-tl-[36px]' },
    { src: about2, radius: 'rounded-tr-[36px]' },
    { src: about3, radius: 'rounded-bl-[36px]' },
    { src: about4, radius: 'rounded-br-[36px]' },
]

const stats: { icon: ImgSrc; value: number; suffix: string; label: string }[] = [
    { icon: liveImpact, value: 450, suffix: 'K+', label: 'Lives Impacted' },
    { icon: mealsDistributed, value: 2.5, suffix: 'M+', label: 'Meals Distributed' },
    { icon: studentsSupported, value: 15, suffix: 'K+', label: 'Students Supported' },
    { icon: medicalCamps, value: 850, suffix: '+', label: 'Medical Camps' },
]

const AboutusSection = () => {
    return (
        <section className="py-20 overflow-hidden relative bg-white">
            <div className="container mx-auto px-5 md:px-0 z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <motion.div
                        variants={containerStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <SectionHeading
                            align="left"
                            eyebrow="About Us"
                            title={
                                <>
                                    Empowering Lives.
                                    <br />
                                    <span className="text-light-green">
                                        Enriching Humanity.
                                    </span>
                                </>
                            }
                            description="Chishty Foundation is a non-profit organization dedicated to serving humanity through compassion, education, healthcare, and empowerment. Inspired by the timeless teachings of Khwaja Moinuddin Chishti (R.A), we work to uplift communities, restore dignity, and create opportunities for a better tomorrow."
                        />


                        <motion.div
                            variants={fadeUp}
                            custom={2}
                            className="flex flex-wrap items-center gap-8 mt-12"
                        >
                            <div className="flex items-center gap-4">
                                <motion.button
                                    type="button"
                                    aria-label="Watch our story"
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#D4A017] text-white shadow-lg shadow-[#D4A017]/30"
                                >
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-[#D4A017] border-3 shadow border-white"
                                    />
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        className="relative z-10 translate-x-px"
                                    >
                                        <path d="M2 1.5L16 9L2 16.5V1.5Z" fill="currentColor" />
                                    </svg>
                                </motion.button>
                                <div>
                                    <p className="font-semibold text-dark-green leading-tight">Watch Our Story</p>
                                    <p className="text-sm text-gray-500">02:35 Min</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <motion.div
                                    variants={containerStagger}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="flex -space-x-3"
                                >
                                    {avatars.map((avatarSrc, i) => (
                                        <motion.img
                                            key={i}
                                            src={src(avatarSrc)}
                                            alt=""
                                            variants={avatarPop}
                                            custom={i}
                                            whileHover={{ y: -6, scale: 1.12, zIndex: 20 }}
                                            className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-sm relative"
                                        />
                                    ))}
                                </motion.div>
                                <p className="text-sm text-dark-green font-medium leading-snug">
                                    Trusted By Thousands
                                    <br />
                                    Across The Globe
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp} custom={3} className="mt-10">
                            <h3 className="font-dancing-script text-4xl text-[#2F6844] inline-block relative pb-2">
                                Compassion In Action
                                <svg className='mt-3' width="235" height="19" viewBox="0 0 235 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.27393 8.09725C3.55736 8.07996 5.29776 8.0641 6.63069 8.06354C7.03953 8.06354 6.83533 8.1634 7.12656 8.1665C7.69058 8.17228 8.20716 8.09912 8.77802 8.10664C8.95877 8.11002 8.74272 8.26527 8.93309 8.26548C9.99685 8.26402 11.0183 8.15977 12.0861 8.11506C17.4131 7.88658 22.6391 7.49075 28.0325 7.07454C28.2378 7.05859 28.45 7.0434 28.6682 7.02861C30.2829 6.92081 32.2078 6.84049 33.8082 6.64294C34.0213 6.61658 33.8825 6.50418 33.9222 6.49021C34.5482 6.27457 34.3585 6.54476 34.7837 6.53911C36.443 6.51852 38.2805 6.35957 39.8868 6.16221C40.5545 6.07933 39.8589 5.89522 40.5486 5.97079C40.5966 5.97577 40.4378 6.12344 40.6239 6.12035C41.0452 6.11314 41.8475 6.01495 42.1808 5.99459C42.8111 5.95711 42.9095 5.94665 43.5051 5.89298C44.3223 5.8205 45.2996 5.79615 46.166 5.68604C46.352 5.66204 46.0923 5.54974 46.3881 5.49925C46.6814 5.44901 47.4869 5.38631 47.7462 5.39457C48.0124 5.4022 47.9102 5.51872 47.959 5.53877C48.3605 5.709 49.2462 5.34065 49.3641 5.32276C51.4933 5.00644 53.3357 5.00202 55.3487 4.81974C56.8656 4.68204 58.5048 4.48122 59.9446 4.36077C61.682 4.21586 63.1398 4.16147 64.8243 4.00224C65.0006 3.98573 64.7801 3.84475 64.9954 3.82427C67.2894 3.60632 69.5814 3.42791 71.8747 3.34389C72.1052 3.33558 71.821 3.49994 72.052 3.49998C73.4716 3.49637 75.7077 3.58997 76.498 2.91407C77.45 2.86047 78.6061 2.79215 79.4696 2.84676C80.026 2.88188 79.5046 3.07637 80.1728 2.95803C80.3235 2.93154 80.1154 2.81396 80.3423 2.78431C81.2969 2.65968 82.3526 2.62067 83.2966 2.47848C83.4885 2.44925 83.4266 2.33393 83.4797 2.30821C83.9261 2.09856 84.7146 2.32776 84.8833 2.33597C86.1687 2.39494 87.0911 2.26402 88.2771 2.18012C88.5523 2.16076 88.2153 2.02435 88.4797 1.99997C89.8512 1.87569 91.2739 1.78682 92.6237 1.76309C92.924 1.75821 92.6585 1.91429 92.8025 1.91895C93.4372 1.93796 93.5589 1.67005 94.1671 1.68384C94.2953 1.68643 94.2316 1.80842 94.2557 1.81966C94.6333 1.9962 94.9294 1.68866 95.0225 1.67592C96.2001 1.50857 96.9784 1.75597 98.1174 1.63823C98.2537 1.62387 97.9359 1.49608 98.3195 1.46477C100.882 1.25496 103.591 1.12725 106.138 1.09845C106.534 1.09382 106.259 1.22144 106.284 1.23372C106.701 1.42469 106.946 1.12255 107.074 1.10441C108.078 0.968999 109.049 1.15725 109.718 0.778029C113.121 0.688637 116.502 0.426245 119.879 0.396912C120.785 0.388789 121.683 0.397498 122.574 0.430463C122.628 0.432116 122.536 0.57714 122.644 0.579832C123.954 0.613978 123.697 0.402781 124.55 0.10552C124.766 0.0308589 125.433 0.335584 125.491 0.357746C125.705 0.439154 125.493 0.65651 125.564 0.671374C126.159 0.787243 126.045 0.0928806 126.843 0.0700587C126.868 0.0705216 126.767 0.201736 126.834 0.212615C127.043 0.246835 127.248 0.190211 127.452 0.228913C127.92 0.318683 128.086 0.653047 128.796 0.438237C128.885 0.410518 128.739 0.0181771 129.453 0.0199941C129.74 0.0207199 130.988 -0.0132274 131.34 0.00578682C131.695 0.0243743 131.454 0.156604 131.479 0.161618C132.435 0.311759 132.075 0.388643 132.554 0.629457C133.032 0.86967 132.89 0.279289 133.082 0.209851C133.276 0.140501 133.962 0.268754 134.139 0.314609C134.311 0.360436 134.098 0.444552 134.251 0.469678C135.263 0.634181 134.69 0.169227 135.021 0.0706207C135.804 -0.162374 136.401 0.270762 137.126 0.307142C137.32 0.317021 137.161 0.218312 137.334 0.20742C138.018 0.165828 138.429 0.300017 139.198 0.170149C139.324 0.14893 139.957 -0.118266 140.363 0.0746783C140.421 0.102498 140.258 0.212474 140.549 0.236261C140.986 0.271891 141.754 0.295159 142.229 0.259095C142.576 0.232384 142.179 0.0513409 142.615 0.108048C142.808 0.133433 142.45 0.238379 142.813 0.277302C143.175 0.316048 144.09 0.314831 144.44 0.313294C144.792 0.311525 144.6 0.173527 144.629 0.164455C144.802 0.112471 145.476 0.0510859 145.535 0.0518102C148.53 0.0584147 151.284 0.335713 154.198 0.335546C154.428 0.335844 154.279 0.187433 154.314 0.185991C155.102 0.146797 154.472 0.513672 155.016 0.657349C154.945 0.362248 155.268 0.424128 155.817 0.408428C156.082 0.400673 155.942 0.282929 155.966 0.272043C156.36 0.111579 156.634 0.343101 156.703 0.390851C156.96 0.56667 157.251 0.378277 157.425 0.496175C157.598 0.613253 157.185 0.764022 157.713 0.779905C157.864 0.680166 157.482 0.392698 157.884 0.362125C159.404 0.244374 162.225 0.578249 163.439 0.66126C164.658 0.742758 165.038 0.744019 165.752 0.82001C167.028 0.958364 166.566 0.729465 167.366 0.681828C168.172 0.635669 167.753 1.11256 167.862 1.22667C167.968 1.34068 168.097 1.2375 168.233 1.3049C168.368 1.37227 168.063 1.42713 168.389 1.46901C168.713 1.51056 169.617 1.37569 169.743 1.2713C170.004 1.04942 169.617 0.773337 170.478 0.917741C170.528 0.926227 170.358 1.04687 170.547 1.07271C172.052 1.27365 173.636 1.39442 175.13 1.60177C175.338 1.63077 175.139 1.76193 175.261 1.78046C176.519 1.97482 176.085 1.69281 176.796 1.47611C176.611 1.82715 176.973 2.07999 177.931 2.16474C178.504 2.21592 178.419 2.04866 178.797 1.96937C178.91 1.94535 179.312 2.09126 179.392 2.02331C179.657 1.80156 179.301 1.49301 180.274 1.69253C180.317 1.70169 180.167 1.82248 180.315 1.84439C181.27 1.9874 181.423 1.74443 182.46 1.81552C183.288 1.87268 184.723 2.17854 185.648 2.30546C185.581 2.71058 186.475 2.71416 186.862 2.47341C187.458 2.55218 188.119 2.6123 188.695 2.71974C188.893 2.75659 188.748 2.85902 188.771 2.87474C189.131 3.12011 189.428 2.87881 189.561 2.88392C190.002 2.90466 190.411 2.95237 190.804 3.00742C191.707 3.13354 192.526 3.29585 193.476 3.28027C193.525 3.27941 193.638 3.00686 193.969 3.26141C193.99 3.27874 193.526 3.3468 194.162 3.44295C194.795 3.53863 195.967 3.85629 196.854 3.85237C197.074 3.85204 197.647 3.70231 198.046 3.94492C198.099 3.97769 198.025 4.04921 198.1 4.10645C198.345 4.28969 198.539 4.02769 198.816 4.31748C199.091 4.60712 199.718 4.88858 200.621 4.862C200.649 4.86161 200.891 4.66903 201.171 4.71812C201.617 4.79631 202.227 4.94512 202.695 5.02251C202.916 5.05898 202.798 4.89536 202.837 4.89927C204.337 5.07317 205.363 5.38275 206.942 5.73291C207.237 5.79844 208.097 5.7648 208.638 6.02668C209.222 6.31234 208.451 6.86707 209.899 6.98837C210.479 7.03826 211.387 6.32282 212.311 6.98859C214.327 7.30567 216.092 7.95244 218.111 8.28522C218.199 8.29952 218.542 8.13113 218.751 8.18706C219.058 8.26984 219.2 8.42489 219.421 8.48906C220.339 8.75942 221.21 8.88736 222.096 9.14311C222.433 9.2402 222.278 9.32145 222.684 9.43924C222.989 9.52798 223.254 9.50489 223.589 9.59016C223.692 9.61646 223.801 9.65239 223.92 9.70363C224.31 9.87321 224.632 10.2979 225.168 10.4947C225.276 10.1974 225.649 10.3121 226.335 10.4364C226.466 10.4603 226.363 10.313 226.427 10.3189C226.683 10.3388 226.892 10.5004 227.137 10.5142C227.196 10.5178 227.232 10.416 227.285 10.4139C227.732 10.3899 228.295 10.8379 228.394 10.9181C228.76 11.2158 229.006 11.1557 229.305 11.3347C229.601 11.5134 229.095 11.4072 229.457 11.585C230.194 11.9489 231.181 12.3467 231.904 12.7488C232.194 12.9105 232.066 12.6753 232.109 12.6955C232.741 13.0023 233.194 13.5351 233.668 13.5984C233.636 13.7852 233.627 13.9006 233.643 13.9766L233.634 13.9664C233.639 14.2516 234.178 14.0621 234.362 14.8799C234.376 14.965 234.069 15.1429 233.932 14.9064C233.808 14.6987 233.72 14.3469 233.47 14.0932L233.494 14.1209C233.462 14.0949 233.429 14.0701 233.393 14.047C233.313 13.9846 232.711 13.9029 232.647 13.8868C232.13 13.6992 232.329 13.2269 232.319 13.1823C232.18 12.7242 231.402 12.7201 231.237 12.671C230.461 12.4207 229.848 12.0969 229.175 11.9277C228.74 11.8204 228.584 12.1304 228.253 12.0017C227.177 11.5903 226.916 11.0063 225.74 11.0795C225.491 11.0971 225.603 11.5207 224.878 10.9983C224.83 10.9644 224.302 10.5295 223.901 10.5943C223.851 10.6027 223.823 10.7085 223.763 10.7011C223.594 10.6794 223.452 10.6388 223.31 10.5931C223.124 10.5322 222.933 10.4595 222.678 10.4147C222.244 10.3386 221.707 10.2569 221.233 10.092C220.941 9.99067 220.622 9.69526 220.49 9.60921C220.128 9.36507 219.636 9.48141 219.437 9.25067C219.231 9.01734 219.788 8.8851 219.157 8.60733C219.062 8.87669 218.933 9.14511 218.824 9.41241C217.404 9.04206 215.998 8.60947 214.556 8.29361C214.377 8.25476 214.526 8.4454 214.333 8.40758C213.512 8.24657 212.836 7.98587 211.976 7.84634C211.322 7.74132 210.572 7.75028 209.877 7.65097C209.528 7.24782 208.489 7.1534 207.753 6.98229C207.498 6.92298 207.531 6.84091 207.352 6.77802C206.673 6.54278 206.945 6.88713 206.746 6.89565C205.903 6.93508 205.938 6.27931 204.975 6.12243C204.923 6.11361 204.232 6.34355 204.146 6.35055C203.576 6.39392 204.077 6.21581 203.738 6.13083C203.109 5.97445 202.704 5.82124 201.941 5.79755C201.725 5.79203 201.178 5.92121 200.782 5.68813C200.73 5.65756 200.779 5.54929 200.735 5.53546C199.961 5.29798 199.88 5.65065 199.4 5.69913C198.93 5.74901 198.26 5.39563 198.124 5.30276C197.771 5.06209 198.427 5.26833 198.45 5.25351C198.725 5.07633 198.193 5.0329 197.807 4.95695C197.804 4.59906 197.249 4.53837 197.403 4.87909C197.421 4.91642 197.731 4.92924 197.807 4.95695C197.417 5.24903 196.789 5.20107 196.177 4.78604C195.884 4.59108 196.21 4.45779 195.239 4.38655C194.806 4.35572 194.939 4.61972 194.549 4.63288C193.651 4.66166 192.548 4.28636 191.647 4.20758C191.319 4.17883 191.62 4.35145 191.395 4.33639C191.137 4.31932 190.894 4.27885 190.651 4.23646C190.339 4.18162 190.028 4.12345 189.685 4.11104C189.63 4.10923 189.746 4.26366 189.56 4.24286C188.153 4.08888 186.944 3.85958 185.472 3.69664C184.766 3.61819 183.488 3.56158 182.753 3.47258C181.481 3.31795 179.936 2.96889 178.832 2.92036C178.122 2.88899 178.265 3.04189 177.953 3.10998C177.349 3.2419 176.335 2.82679 176.2 2.76483C176.196 2.76272 176.808 2.78027 176.489 2.6821C176.312 2.51788 176.207 2.76475 176.2 2.76483C176.114 2.72421 174.881 2.59386 174.643 2.60279C174.511 2.60715 174.574 2.74452 174.505 2.74432C172.854 2.73565 171.219 2.65421 169.562 2.48652C169.533 2.48198 169.586 2.33736 169.517 2.32853C168.556 2.20174 167.939 2.34589 167.131 2.40666C166.338 2.4685 165.71 2.39869 165.25 2.12041C164.648 2.12045 163.802 1.96591 163.306 1.87419C162.809 1.7824 162.731 2.06691 162.687 2.07051C161.329 2.19035 160.545 1.99243 159.139 1.91295C158.458 1.87401 157.149 1.87025 156.411 1.87898C155.837 1.88635 155.499 1.80892 154.969 1.83701C154.897 1.84075 154.965 1.97078 154.944 1.9751C154.349 2.11183 154.641 1.80683 154.52 1.74757C154.081 1.53237 153.813 1.41676 153.058 1.49426C152.883 1.51195 152.365 1.95087 152.046 1.97039C151.631 1.99499 151.786 1.83662 151.357 1.86704C151.321 1.86951 151.326 1.96926 151.061 1.95968C149.826 1.91646 148.48 1.83774 147.188 1.83344C147.011 1.83247 147.236 1.99304 146.98 1.99429C145.799 2.00025 144.475 1.98546 143.327 1.90803C143.042 1.88846 143.221 1.7783 143.159 1.74525C142.779 1.54524 142.236 1.83358 142.146 1.83907C140.027 1.97714 138.398 1.7239 136.227 1.87126C136.111 1.87968 135.21 2.20003 134.799 1.94015C134.772 1.92284 134.365 1.65655 134.011 1.8478C133.989 1.85976 134.239 1.99588 133.806 1.98824C133.373 1.98062 132.676 2.0857 132.072 1.94327C131.883 1.89835 131.418 1.63595 130.865 1.86369C130.829 1.87939 129.97 2.38672 129.649 2.05705C129.597 2.00281 129.643 1.64451 128.969 1.84373C128.84 1.88236 129.078 1.95614 128.737 2.01423C128.215 2.1037 127.532 2.0259 126.894 2.20281C126.784 2.23404 126.315 2.4896 125.925 2.3173C125.864 2.29032 125.975 2.16783 125.772 2.16056C124.82 2.12509 123.822 2.23717 122.839 2.18912C122.497 2.17218 122.664 1.97353 122.306 1.93469C121.947 1.89582 121.223 1.87302 120.849 1.97552C120.476 2.07804 120.9 2.36872 120.335 2.4153C120.211 2.42561 120.086 2.43523 119.961 2.44421C117.657 2.61075 115.34 2.55227 113.024 2.64283C112.662 2.65702 112.968 2.75158 112.434 2.78061C110.46 2.8872 107.08 3.17798 105.355 3.0474C103.973 2.94212 105.689 2.69766 104.638 2.68395C104.133 2.67775 103.609 3.0671 103.488 3.08574C102.305 3.27227 101.468 3.16647 100.402 3.28314C100.181 3.30734 100.407 3.43778 100.22 3.45679C99.5794 3.523 98.8969 3.50275 98.2852 3.55493C98.0105 3.57871 98.0685 3.68558 97.8148 3.69386C97.2076 3.71501 96.6682 3.7047 96.0696 3.64156C96.015 3.63581 96.3694 3.47402 95.9199 3.49942C95.1923 3.54098 94.2854 3.50111 93.4568 3.66492C93.2111 3.71397 93.2191 3.96641 92.6738 3.83012C92.5596 3.80172 92.6804 3.48917 92.0785 3.79452C91.9771 3.84528 90.9602 4.27219 90.4322 4.08222C90.293 4.03221 89.9305 3.80979 89.6353 3.87044C89.5953 3.8796 89.7671 4.00301 89.5211 4.03424C88.6539 4.142 87.7402 4.19515 86.8498 4.30454C86.612 4.33403 86.9779 4.44727 86.6232 4.48677C85.648 4.59558 84.4219 4.65328 83.4633 4.68338C83.1097 4.69421 83.3443 4.55949 83.3177 4.54886C82.8901 4.37558 82.666 4.6716 82.5304 4.6984C81.6849 4.86152 81.0262 4.7825 80.245 4.87903C80.0294 4.90533 80.1933 5.02517 80.1511 5.04036C79.7139 5.19081 80.0278 4.92732 79.7422 4.92374C78.9411 4.91302 78.0572 4.99468 77.2582 5.07641C76.9647 5.10663 77.3075 5.23288 77.0441 5.25824C75.4762 5.41199 73.8571 5.5308 72.3168 5.5747C72.0279 5.58261 72.199 5.44965 72.1368 5.42775C71.7078 5.27405 71.1256 5.58166 70.989 5.61782C70.3678 5.7827 70.108 5.69978 69.5504 5.76672C66.8335 6.09474 63.4436 6.32034 60.8647 6.50608C57.5055 6.74856 54.8804 6.87275 51.6783 7.19427C51.475 7.21455 51.6944 7.35245 51.5195 7.37194C49.2642 7.61604 47.0109 7.76198 44.7563 8.01623C44.5684 8.03708 44.8533 8.16046 44.5525 8.1989C43.9355 8.27878 43.1595 8.34255 42.5439 8.35182C42.236 8.35733 42.635 8.19183 42.3245 8.20007C41.6014 8.21895 40.8401 8.27893 40.1243 8.36935C39.8178 8.40834 40.2997 8.51677 39.8937 8.55622C37.1508 8.82586 34.4469 9.10325 31.6536 9.16018C31.4633 9.16394 31.2706 8.87033 30.878 8.96575C30.8546 9.05425 30.8654 9.15486 30.8602 9.24766C30.1858 9.31724 29.5273 9.38077 28.885 9.43929C25.5311 9.74451 22.2291 9.9547 18.8719 10.2145C18.7063 10.2273 19.0052 10.3678 18.6855 10.3933C16.7903 10.5446 14.9355 10.7351 12.9786 10.7123C12.783 10.7103 12.872 10.4146 12.3007 10.4988C12.1905 10.5147 11.3579 10.611 11.1265 10.6891C11.097 10.7006 11.2626 10.8246 10.986 10.8471C9.39352 10.9739 7.69218 11.0466 6.07517 11.0344C5.81016 11.0322 6.08452 10.8768 5.89751 10.8738C4.58406 10.8533 3.12433 10.9987 1.8605 10.8343C1.85841 10.834 1.85632 10.8338 1.85425 10.8335C1.02639 10.728 1.34139 10.4869 0.902392 10.234C0.841367 10.1982 0.32256 10.1818 0.299843 10.039C0.239225 9.68015 0.496709 9.29419 0.40336 8.91105C0.392225 8.86975 0.215693 8.86758 0.092766 8.85172C0.0371075 8.84419 -0.0335815 8.83116 0.0177835 8.81282C0.0105237 8.79128 -0.00919712 8.75919 0.105245 8.71238C0.132589 8.69991 0.635481 8.64489 0.759511 8.58016C0.847131 8.53547 0.69523 8.38767 0.871231 8.33181C1.0489 8.27603 1.23773 8.40118 1.53072 8.33727C1.73203 8.29262 1.7341 8.19936 1.90969 8.14331C1.98534 8.11792 2.09647 8.10032 2.27393 8.09725ZM161.09 1.46973C160.634 1.31226 160.545 1.81487 161.05 1.71494C161.074 1.70952 161.114 1.47752 161.09 1.46973ZM216.1 8.2474C215.561 7.89098 215.096 8.12081 215.466 8.38334C215.83 8.64498 216.264 8.35596 216.1 8.2474ZM222.163 9.62131C221.53 9.26775 221.234 9.93112 222.001 9.98815C222.045 9.99158 222.2 9.64179 222.163 9.62131ZM2.97009 10.1977C2.96098 10.1914 2.58836 10.1831 2.57744 10.1893C2.37397 10.3489 3.13264 10.3657 2.97009 10.1977ZM228.121 11.2141C227.947 11.0509 227.312 10.9586 227.53 11.1581C227.713 11.3198 228.338 11.4166 228.121 11.2141ZM137.148 0.553882C137.14 0.546393 136.872 0.542117 136.878 0.584689C136.897 0.721716 137.27 0.679557 137.148 0.553882ZM234.273 17.9267C234.395 16.4092 234.924 15.4033 234.865 17.1481C234.845 17.4582 234.691 16.4729 234.629 16.8679C234.517 17.5802 234.85 18.0787 234.6 18.7917C234.554 18.9204 234.266 18.0133 234.272 17.9239C234.272 17.9249 234.273 17.9258 234.273 17.9267ZM160.85 0.851443C160.839 0.844249 160.475 0.822847 160.465 0.829138C160.26 0.981414 160.997 1.02474 160.85 0.851443ZM121.596 0.604243C121.576 0.590583 120.719 0.609604 120.691 0.623976C120.254 0.90329 121.987 0.865516 121.596 0.604243ZM185.661 2.31792C186.073 2.2002 186.566 2.23571 186.86 2.473C186.465 2.4178 186.054 2.37069 185.661 2.31792Z" fill="#BD8C3B" />
                                </svg>

                            </h3>
                        </motion.div>
                    </motion.div>

                    <div className="relative">

                        <div className="relative grid grid-cols-2 gap-4">
                            {galleryImages.map((img, i) => (
                                <motion.div
                                    key={i}
                                    variants={imgReveal}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.3 }}
                                    className={`overflow-hidden ${img.radius}`}
                                >
                                    <motion.img
                                        src={src(img.src)}
                                        alt=""
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        className="w-full h-47.5 md:h-76 object-cover"
                                    />
                                </motion.div>
                            ))}


                            <motion.div
                                initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.4, ease: 'backOut' }}
                                whileHover={{ rotate: 90, scale: 1.08 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 rounded-2xl bg-dark-green shadow-xl flex items-center justify-center z-10"
                            >
                                <img
                                    src={src(logoIcon)}
                                    alt=""
                                    className="w-14 h-14"
                                    style={{ transform: 'rotate(-45deg)' }}
                                />
                            </motion.div>
                        </div>



                    </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    <div className="md:col-span-4 flex flex-col justify-center gap-6">
                        <motion.div
                            variants={fadeUp}
                            custom={4}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                            whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(22,51,46,0.15)' }}
                            className="relative mt-5 rounded-2xl bg-beige/80 backdrop-blur-xl! border border-stroke p-8 pl-9 overflow-hiddentransition-all duration-300"
                        >

                            <img src={src(quote)} alt="" className="w-8 h-8 mb-3 relative z-10" />
                            <p className="relative z-10 font-serif italic text-lg text-dark-green leading-relaxed">
                                The Best Of People Are Those Who Bring The Greatest Benefit To Others.
                                Every Act Of Kindness Leaves A Lasting Impact.
                            </p>
                            <p className="relative z-10 mt-4 font-dancing-script text-dark-yellow text-2xl">
                                — Prophet Muhammad (PBUH)
                            </p>
                        </motion.div>

                    </div>

                    <div className="md:col-span-7 lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                            className="relative mt-6 rounded-[28px] bg-dark-green border border-[#F4CB8E] p-8 md:p-10 overflow-hidden"
                        >
                            <img
                                src={src(map)}
                                alt=""
                                className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain left-2 mix-blend-luminosity"
                            />

                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">

                                <div>
                                    <p className="font-serif text-xl md:text-2xl text-white leading-snug max-w-55">
                                        Together, We Are Creating A World Where Humanity Thrives.
                                    </p>
                                    <div className="bg-linear-to-r from-[#F4CB8E] to-[#F4CB8E]/0 h-0.5 mt-2 w-30"></div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 flex-1">
                                    {stats.map((stat, i) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                            className="relative flex flex-col items-center justify-center gap-1 sm:gap-2"
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.15, rotate: 6 }}
                                                className="mx-auto sm:mx-0 w-20 h-20 rounded-full border border-[#F4CB8E] flex items-center justify-center mb-3"
                                            >
                                                <img src={src(stat.icon)} alt="" className="w-12 h-12" />
                                            </motion.div>

                                            <p className="text-white font-bold text-3xl">
                                                <CountUp target={stat.value} suffix={stat.suffix} />
                                            </p>

                                            <p className="text-white/80 text-sm font-medium">
                                                {stat.label}
                                            </p>


                                            {i !== stats.length - 1 && (
                                                <div
                                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-32"
                                                    style={{
                                                        background:
                                                            "linear-gradient(to bottom, rgba(244,203,142,0) 0%, rgba(244,203,142,1) 50%, rgba(244,203,142,0) 100%)",
                                                    }}
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>






            <img
                src={src(mosque)}
                alt=""
                className="pointer-events-none select-none absolute left-0 bottom-0 z-0"
            />
        </section>
    )
}

export default AboutusSection