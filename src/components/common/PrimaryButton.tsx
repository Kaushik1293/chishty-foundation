"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";
import { TargetAndTransition, VariantLabels } from "framer-motion";

interface PrimaryButtonProps {
    text: string;
    onClick?: () => void;

    containerClassName?: string;
    textClassName?: string;
    iconWrapperClassName?: string;

    icon?: ReactNode;

    whileHover?: TargetAndTransition | VariantLabels;
    whileTap?: TargetAndTransition | VariantLabels;
}

const DefaultIcon = () => (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5955 5.70533H0.718047C0.514281 5.70533 0.343705 5.638 0.206319 5.50333C0.0687728 5.36883 0 5.20182 0 5.00233C0 4.80283 0.0687728 4.63583 0.206319 4.50132C0.343705 4.36666 0.514281 4.29933 0.718047 4.29933H11.5955L8.44351 1.21338C8.30118 1.07387 8.23089 0.9107 8.23265 0.723858C8.23456 0.537015 8.30485 0.370873 8.44351 0.22543C8.59207 0.0801431 8.76265 0.00507699 8.95524 0.00023409C9.148 -0.00460881 9.31865 0.0656914 9.46721 0.211135L13.7551 4.40923C13.8448 4.49703 13.908 4.58959 13.9447 4.68691C13.9816 4.78424 14 4.88938 14 5.00233C14 5.11528 13.9816 5.22041 13.9447 5.31774C13.908 5.41507 13.8448 5.50763 13.7551 5.59543L9.46721 9.79352C9.32472 9.93287 9.15566 10.0017 8.96003 9.99997C8.76424 9.99809 8.59207 9.92451 8.44351 9.77923C8.30485 9.63378 8.23305 9.46912 8.2281 9.28525C8.22315 9.10138 8.29496 8.93672 8.44351 8.79127L11.5955 5.70533Z" fill="white" />
    </svg>
);

export default function PrimaryButton({
    text = "Donate Now",
    onClick,

    containerClassName,
    textClassName,
    iconWrapperClassName,

    icon = <DefaultIcon />,

    whileHover = {
        scale: 1.03,
        y: -2,
    },

    whileTap = {
        scale: 0.96,
    },
}: PrimaryButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={whileHover}
            whileTap={whileTap}
            transition={{
                duration: 0.25,
                ease: "easeInOut",
            }}
            className={clsx(
                "bg-dark-green w-fit p-1.5 ps-5 rounded-3xl flex items-center gap-5 cursor-pointer overflow-hidden",
                containerClassName
            )}
        >
            <p
                className={clsx(
                    "text-white font-satoshi font-semibold",
                    textClassName
                )}
            >
                {text}
            </p>

            <motion.div
                whileHover={{
                    rotate: 20,
                    scale: 1.08,
                }}
                transition={{
                    duration: 0.25,
                }}
                className={clsx(
                    "h-11 w-11 rounded-full bg-dark-yellow flex items-center justify-center shrink-0",
                    iconWrapperClassName
                )}
            >
                {icon}
            </motion.div>
        </motion.button>
    );
}