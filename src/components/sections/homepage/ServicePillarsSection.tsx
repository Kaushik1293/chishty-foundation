"use client";

import React from 'react';
import SectionHeading from '../../common/SectionHeading';
import ServicePillarCard from './ServicePillarCard';

import educationImg from '../../..//assets/images/homepage/servicessection/education-img.png';
import educationIcon from '../../..//assets/images/homepage/servicessection/Education-icon-1.svg';
import educationIcon2 from '../../..//assets/images/homepage/servicessection/Education-icon-2.svg';
import healthcareImg from '../../..//assets/images/homepage/servicessection/healthcare-img.png';
import healthcareIcon from '../../..//assets/images/homepage/servicessection/Healthcare-icon-1.svg';
import healthcareIcon2 from '../../..//assets/images/homepage/servicessection/Healthcare-icon-2.svg';
import donationImg from '../../..//assets/images/homepage/servicessection/donation-img.png';
import donationIcon from '../../..//assets/images/homepage/servicessection/Donation-icon-1.svg';
import donationIcon2 from '../../..//assets/images/homepage/servicessection/Donation-icon-2.svg';
import womenEmpowermentImg from '../../..//assets/images/homepage/servicessection/women-img.png';
import womenEmpowermentIcon from '../../..//assets/images/homepage/servicessection/Women-icon-1.svg';
import womenEmpowermentIcon2 from '../../..//assets/images/homepage/servicessection/Women-icon-2.svg';


import halfPattern from '../../../assets/images/homepage/vectors/common/half-patter-horizontal.svg';
import goldDivider from '../../../assets/images/homepage/vectors/common/gold-divider.png';




const pillars = [
    {
        image: educationImg,
        icon: educationIcon,
        icon2: educationIcon2,
        title: "Education",
        description: "Empowering minds through quality education and creating opportunities for a brighter future.",
        bgColor: "#16264A",
        accentColor: "#16264A",
    },
    {
        image: healthcareImg,
        icon: healthcareIcon,
        icon2: healthcareIcon2,
        title: "Healthcare",
        description: "Providing accessible healthcare services and promoting health and well-being for all.",
        bgColor: "#0F3D2E",
        accentColor: "#0F3D2E",
    },
    {
        image: donationImg,
        icon: donationIcon,
        icon2: donationIcon2,
        title: "Donation",
        description: "Your support helps us bring hope, relief, and change to those who need it most.",
        bgColor: "#B85B2B",
        accentColor: "#B85B2B",
    },
    {
        image: womenEmpowermentImg,
        icon: womenEmpowermentIcon,
        icon2: womenEmpowermentIcon2,
        title: "Women Empowerment",
        description: "Empowering women with skills, resources, and opportunities to lead independent, dignified lives.",
        bgColor: "#7A1748",
        accentColor: "#7A1748",
    },
];

const ServicePillarsSection = () => {
    return (
        <section className="relative  py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-0 mb-22">
                <SectionHeading
                    eyebrow="WHAT WE FOCUS ON"
                    title="Our Service Pillars"
                    description="Guided by compassion and rooted in service, we work across key areas to uplift lives and build a better world."
                />

                <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, i) => (
                        <ServicePillarCard key={pillar.title} {...pillar} index={i} />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-center">
                <img
                    src={halfPattern.src}
                    alt=""
                    className="w-48 md:w-80"
                />
                <img
                    src={goldDivider.src}
                    alt=""
                    className="w-full"
                />
               
   
            </div>
        </section>
    );
};

export default ServicePillarsSection;