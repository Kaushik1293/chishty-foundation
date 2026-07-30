// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { AnimatePresence, motion } from "framer-motion";

// import logo from '../../assets/images/homepage/dark-logo.png'
// import whiteLogo from '../../assets/images/homepage/white-logo.png'

// import PrimaryButton from "./PrimaryButton";

// type NavChild = { label: string; href: string };
// type NavItem = {
//     label: string;
//     id: string;
//     href?: string;
//     children?: NavChild[];
// };

// const navItems: NavItem[] = [
//     { label: "Home", href: "#home", id: "home" },
//     {
//         label: "About Us",
//         id: "about",
//         href: "/about-us",
//     },
//     {
//         label: "Causes",
//         id: "causes",
//         children: [
//             { label: "Education", href: "#education" },
//             { label: "Healthcare", href: "#healthcare" },
//             { label: "Women Upliftment", href: "#women-upliftment" },
//         ],
//     },
//     {
//         label: "Get Involved",
//         id: "get-involved",
//         children: [
//             { label: "Volunteer", href: "#volunteer" },
//             { label: "Donate Now", href: "#donate" },
//             { label: "Partner With Us", href: "#partner" },
//         ],
//     },
//     { label: "Contact", href: "#contact", id: "contact" },
// ];

// const languages = [
//     { code: "EN", label: "English" },
//     { code: "AR", label: "Arabic" },
//     { code: "UR", label: "Urdu" },
// ];

// const Navbar = () => {
//     const pathname = usePathname();

//     const [isScrolled, setIsScrolled] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activeSection, setActiveSection] = useState("home");
//     const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//     const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
//     const [langOpen, setLangOpen] = useState(false);
//     const [activeLang, setActiveLang] = useState(languages[0]);

//     const isHome = pathname === "/";

//     useEffect(() => {
//         const sections = document.querySelectorAll("section[id]");
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 const visible = entries.find((entry) => entry.isIntersecting);
//                 if (visible) setActiveSection(visible.target.id);
//             },
//             { rootMargin: "-20% 0px -50% 0px" }
//         );
//         sections.forEach((s) => observer.observe(s));
//         return () => observer.disconnect();
//     }, []);

//     useEffect(() => {
//         document.body.style.overflow = menuOpen ? "hidden" : "";
//         return () => {
//             document.body.style.overflow = "";
//         };
//     }, [menuOpen]);

//     useEffect(() => {
//         const handleScroll = () => setIsScrolled(window.scrollY > 80);
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const isLightSurface = isHome && !isScrolled;

//     const navbarBg = isLightSurface
//         ? "bg-transparent"
//         : "bg-dark-green/95 shadow-lg backdrop-blur-md py-2";

//     const navbarPosition = isLightSurface ? "absolute top-2" : "fixed top-0";

//     const textBase = isLightSurface
//         ? "text-dark-green hover:text-dark-yellow"
//         : "text-white hover:text-light-yellow";

//     const desktopNavText = "text-dark-green hover:text-dark-yellow";

//     const iconBorder = isLightSurface ? "border-dark-green/40" : "border-white/50";
//     const iconFill = isLightSurface ? "#0D2750" : "#FFFFFF";
//     const iconHoverBg = isLightSurface ? "rgba(13,39,80,0.08)" : "rgba(255,255,255,0.1)";

//     return (
//         <>
//             <motion.nav
//                 initial={{ y: -40, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//                 className={`w-full left-0 z-50 fixed transition-[background-color,padding,box-shadow] duration-500 ease-out ${navbarBg} ${navbarPosition}`}
//             >
//                 <div className="container mx-auto px-4 xl:px-6 2xl:px-0">
//                     <div className="flex items-center justify-between h-20 lg:h-24 md:px-6">

//                         <Link href="/" className="shrink-0">
//                             <motion.img
//                                 whileHover={{ scale: 1.04 }}
//                                 transition={{ duration: 0.3, ease: "easeOut" }}
//                                 src={pathname === "/" ? (isScrolled ? whiteLogo.src : logo.src) : whiteLogo.src}
//                                 alt="logo"
//                                 className="h-14 lg:h-16 xl:h-20 object-contain"
//                             />
//                         </Link>


//                         <div className="hidden 2xl:flex items-center gap-2">
//                             {navItems.map((item) => (
//                                 <div
//                                     key={item.id}
//                                     className="relative"
//                                     onMouseEnter={() => item.children && setOpenDropdown(item.id)}
//                                     onMouseLeave={() => item.children && setOpenDropdown(null)}
//                                 >
//                                     <a
//                                         href={item.href || "#"}
//                                         className={`group relative flex items-center gap-1.5 px-4 py-2 font-satoshi text-base transition-colors duration-300 whitespace-nowrap
//                                          ${activeSection === item.id
//                                                 ? `${pathname === "/" && !isScrolled
//                                                     ? "text-dark-green"
//                                                     : "text-white"
//                                                 } font-bold`
//                                                 : `${textBase} font-medium`
//                                             }`}
//                                     >
//                                         {item.label}
//                                         {item.children && (
//                                             <motion.svg
//                                                 animate={{ rotate: openDropdown === item.id ? 180 : 0 }}
//                                                 transition={{ duration: 0.3, ease: "easeOut" }}
//                                                 width="12"
//                                                 height="12"
//                                                 viewBox="0 0 24 24"
//                                                 fill="none"
//                                             >
//                                                 <path
//                                                     d="M6 9l6 6 6-6"
//                                                     stroke="currentColor"
//                                                     strokeWidth="2"
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                 />
//                                             </motion.svg>
//                                         )}


//                                         <span
//                                             className={`absolute left-4 right-4 -bottom-0.5 h-px bg-dark-yellow origin-left transition-transform duration-300 ease-out
//                                                 ${activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
//                                         />

//                                         <span
//                                             className={`absolute right-3 -bottom-1 h-1.25 w-1.25 rounded-full bg-dark-yellow origin-left transition-transform duration-300 ease-out
//                                                 ${activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
//                                         />
//                                     </a>


//                                     <AnimatePresence>
//                                         {item.children && openDropdown === item.id && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: -10, scale: 0.98 }}
//                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                 exit={{ opacity: 0, y: -10, scale: 0.98 }}
//                                                 transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
//                                                 className="absolute top-fulls left-0 mt-2 w-56 rounded-xl bg-dark-green border border-light-yellow/20 shadow-2xl overflow-hidden py-2"
//                                             >
//                                                 {item.children.map((child, i) => (
//                                                     <motion.a
//                                                         key={child.label}
//                                                         href={child.href}
//                                                         initial={{ opacity: 0, x: -8 }}
//                                                         animate={{ opacity: 1, x: 0 }}
//                                                         transition={{ delay: i * 0.04, duration: 0.25 }}
//                                                         className="block px-5 py-2.5 text-sm text-white/85 font-satoshi hover:text-light-yellow hover:bg-white/5 transition-colors duration-200"
//                                                     >
//                                                         {child.label}
//                                                     </motion.a>
//                                                 ))}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             ))}
//                         </div>


//                         <div className="hidden 2xl:flex items-center gap-4">

//                             <PrimaryButton
//                                 text="Donate Now"
//                                 containerClassName={
//                                     pathname === "/" && !isScrolled
//                                         ? "bg-dark-green"
//                                         : "bg-dark-yellow"
//                                 }
//                                 iconWrapperClassName={
//                                     pathname === "/" && !isScrolled
//                                         ? "!bg-dark-yellow"
//                                         : "!bg-dark-green"
//                                 }
//                                 icon={<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M9.31079 18.8678C9.08342 18.7794 8.88333 18.6412 8.71053 18.453L7.19842 16.9548C5.33211 15.0999 3.66579 13.2776 2.19947 11.4881C0.733158 9.69859 0 7.78152 0 5.73689C0 4.10857 0.503684 2.74529 1.51105 1.64706C2.5186 0.54902 3.7693 0 5.26316 0C6.11193 0 6.95035 0.213317 7.77842 0.63995C8.60632 1.06658 9.34684 1.75941 10 2.71843C10.6532 1.75941 11.3937 1.06658 12.2216 0.63995C13.0496 0.213317 13.8881 0 14.7368 0C16.2307 0 17.4814 0.54902 18.4889 1.64706C19.4963 2.74529 20 4.10857 20 5.73689C20 7.8037 19.2544 9.7421 17.7632 11.5521C16.2719 13.3621 14.6093 15.1688 12.7753 16.9723L11.2792 18.453C11.1066 18.6412 10.9049 18.7794 10.6742 18.8678C10.4433 18.9559 10.2153 19 9.99 19C9.76456 19 9.53816 18.9559 9.31079 18.8678ZM9.2429 4.46158C8.67342 3.51576 8.07386 2.82255 7.44421 2.38196C6.81474 1.94136 6.08772 1.72107 5.26316 1.72107C4.21053 1.72107 3.33333 2.10353 2.63158 2.86844C1.92982 3.63336 1.57895 4.58951 1.57895 5.73689C1.57895 6.65766 1.85123 7.6204 2.39579 8.62512C2.94035 9.62984 3.62386 10.6286 4.44632 11.6215C5.26877 12.6146 6.15982 13.5847 7.11947 14.5318C8.07895 15.4792 8.96825 16.3596 9.78737 17.1731C9.84807 17.232 9.91895 17.2614 10 17.2614C10.0811 17.2614 10.1519 17.232 10.2126 17.1731C11.0318 16.3596 11.9211 15.4792 12.8805 14.5318C13.8402 13.5847 14.7312 12.6146 15.5537 11.6215C16.3761 10.6286 17.0597 9.62984 17.6042 8.62512C18.1488 7.6204 18.4211 6.65766 18.4211 5.73689C18.4211 4.58951 18.0702 3.63336 17.3684 2.86844C16.6667 2.10353 15.7895 1.72107 14.7368 1.72107C13.9123 1.72107 13.1853 1.94136 12.5558 2.38196C11.9261 2.82255 11.3266 3.51576 10.7571 4.46158C10.668 4.60863 10.556 4.71897 10.4211 4.7926C10.2861 4.86603 10.1458 4.90274 10 4.90274C9.85421 4.90274 9.71386 4.86603 9.57895 4.7926C9.44404 4.71897 9.33202 4.60863 9.2429 4.46158Z" fill="white" />
//                                 </svg>
//                                 } />

//                             <div className="bg-[#5A625F] h-10 w-px" />

//                             <div
//                                 className="relative"
//                                 onMouseEnter={() => setLangOpen(true)}
//                                 onMouseLeave={() => setLangOpen(false)}
//                             >
//                                 <button
//                                     className={`flex items-center gap-1.5 font-satoshi text-sm transition-colors duration-300 ${textBase}`}
//                                 >
//                                     <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M5.5 17.2895C4.40517 16.8157 3.45167 16.1727 2.6395 15.3605C1.82733 14.5483 1.18433 13.5948 0.7105 12.5C0.236833 11.4052 0 10.2375 0 8.997C0 7.75667 0.236833 6.59 0.7105 5.497C1.18433 4.40417 1.82733 3.45167 2.6395 2.6395C3.45167 1.82733 4.40517 1.18433 5.5 0.7105C6.59483 0.236833 7.7625 0 9.003 0C10.2433 0 11.41 0.236833 12.503 0.7105C13.5958 1.18433 14.5483 1.82733 15.3605 2.6395C16.1727 3.45167 16.8157 4.40417 17.2895 5.497C17.7632 6.59 18 7.75667 18 8.997C18 10.2375 17.7632 11.4052 17.2895 12.5C16.8157 13.5948 16.1727 14.5483 15.3605 15.3605C14.5483 16.1727 13.5958 16.8157 12.503 17.2895C11.41 17.7632 10.2433 18 9.003 18C7.7625 18 6.59483 17.7632 5.5 17.2895ZM9 17.0077C9.58717 16.2539 10.0712 15.5135 10.452 14.7865C10.8327 14.0597 11.1423 13.2463 11.3807 12.3463H6.61925C6.88342 13.2974 7.19942 14.1365 7.56725 14.8635C7.93525 15.5903 8.41283 16.3051 9 17.0077ZM7.727 16.8577C7.26033 16.3078 6.83433 15.6279 6.449 14.8182C6.06383 14.0086 5.777 13.1846 5.5885 12.3463H1.75375C2.32692 13.5898 3.13942 14.6096 4.19125 15.4057C5.24325 16.2019 6.42183 16.6859 7.727 16.8577ZM10.273 16.8577C11.5782 16.6859 12.7567 16.2019 13.8087 15.4057C14.8606 14.6096 15.6731 13.5898 16.2463 12.3463H12.4115C12.159 13.1974 11.8401 14.0278 11.4548 14.8375C11.0696 15.6472 10.6757 16.3206 10.273 16.8577ZM1.34625 11.3463H5.38075C5.30508 10.9359 5.25158 10.5362 5.22025 10.147C5.18875 9.758 5.173 9.37567 5.173 9C5.173 8.62433 5.18875 8.242 5.22025 7.853C5.25158 7.46383 5.30508 7.06408 5.38075 6.65375H1.34625C1.23725 6.99992 1.15225 7.37717 1.09125 7.7855C1.03042 8.19383 1 8.59867 1 9C1 9.40133 1.03042 9.80617 1.09125 10.2145C1.15225 10.6228 1.23725 11.0001 1.34625 11.3463ZM6.38075 11.3463H11.6193C11.6949 10.9359 11.7484 10.5426 11.7797 10.1663C11.8113 9.79008 11.827 9.40133 11.827 9C11.827 8.59867 11.8113 8.20992 11.7797 7.83375C11.7484 7.45742 11.6949 7.06408 11.6193 6.65375H6.38075C6.30508 7.06408 6.25158 7.45742 6.22025 7.83375C6.18875 8.20992 6.173 8.59867 6.173 9C6.173 9.40133 6.18875 9.79008 6.22025 10.1663C6.25158 10.5426 6.30508 10.9359 6.38075 11.3463ZM12.6193 11.3463H16.6538C16.7628 11.0001 16.8477 10.6228 16.9088 10.2145C16.9696 9.80617 17 9.40133 17 9C17 8.59867 16.9696 8.19383 16.9088 7.7855C16.8477 7.37717 16.7628 6.99992 16.6538 6.65375H12.6193C12.6949 7.06408 12.7484 7.46383 12.7797 7.853C12.8113 8.242 12.827 8.62433 12.827 9C12.827 9.37567 12.8113 9.758 12.7797 10.147C12.7484 10.5362 12.6949 10.9359 12.6193 11.3463ZM12.4115 5.65375H16.2463C15.6602 4.38458 14.8573 3.36475 13.8375 2.59425C12.8177 1.82375 11.6295 1.33333 10.273 1.123C10.7397 1.73717 11.1593 2.43942 11.5318 3.22975C11.9043 4.02025 12.1975 4.82825 12.4115 5.65375ZM6.61925 5.65375H11.3807C11.1166 4.71542 10.7909 3.86675 10.4038 3.10775C10.0166 2.34875 9.54867 1.64358 9 0.99225C8.45133 1.64358 7.98342 2.34875 7.59625 3.10775C7.20908 3.86675 6.88342 4.71542 6.61925 5.65375ZM1.75375 5.65375H5.5885C5.8025 4.82825 6.09575 4.02025 6.46825 3.22975C6.84075 2.43942 7.26033 1.73717 7.727 1.123C6.35767 1.33333 5.16633 1.82692 4.153 2.60375C3.1395 3.38075 2.33975 4.39742 1.75375 5.65375Z" fill="#BD8C3B" />
//                                     </svg>

//                                     <p className="font-satoshi font-medium">{activeLang.code}</p>
//                                     <motion.svg
//                                         animate={{ rotate: langOpen ? 180 : 0 }}
//                                         transition={{ duration: 0.25 }}
//                                         width="10"
//                                         height="10"
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                     >
//                                         <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                     </motion.svg>
//                                 </button>

//                                 <AnimatePresence>
//                                     {langOpen && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: -8, scale: 0.98 }}
//                                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                                             exit={{ opacity: 0, y: -8, scale: 0.98 }}
//                                             transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
//                                             className="absolute top-full right-0 mt-2 w-36 rounded-xl bg-dark-green border border-light-yellow/20 shadow-2xl overflow-hidden py-2 z-10"
//                                         >
//                                             {languages.map((lang) => (
//                                                 <button
//                                                     key={lang.code}
//                                                     onClick={() => {
//                                                         setActiveLang(lang);
//                                                         setLangOpen(false);
//                                                     }}
//                                                     className={`w-full text-left px-4 py-2 text-sm font-satoshi transition-colors duration-200
//                                                         ${activeLang.code === lang.code ? "text-light-yellow" : "text-white/85 hover:text-light-yellow hover:bg-white/5"}`}
//                                                 >
//                                                     <p className="font-satoshi font-semibold">{lang.code}</p>
//                                                 </button>
//                                             ))}
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>


//                         <div className="flex 2xl:hidden items-center gap-3">
//                             <div className="hidden sm:block">
//                                 <PrimaryButton text={"Donate Now"}
//                                     icon={<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M9.31079 18.8678C9.08342 18.7794 8.88333 18.6412 8.71053 18.453L7.19842 16.9548C5.33211 15.0999 3.66579 13.2776 2.19947 11.4881C0.733158 9.69859 0 7.78152 0 5.73689C0 4.10857 0.503684 2.74529 1.51105 1.64706C2.5186 0.54902 3.7693 0 5.26316 0C6.11193 0 6.95035 0.213317 7.77842 0.63995C8.60632 1.06658 9.34684 1.75941 10 2.71843C10.6532 1.75941 11.3937 1.06658 12.2216 0.63995C13.0496 0.213317 13.8881 0 14.7368 0C16.2307 0 17.4814 0.54902 18.4889 1.64706C19.4963 2.74529 20 4.10857 20 5.73689C20 7.8037 19.2544 9.7421 17.7632 11.5521C16.2719 13.3621 14.6093 15.1688 12.7753 16.9723L11.2792 18.453C11.1066 18.6412 10.9049 18.7794 10.6742 18.8678C10.4433 18.9559 10.2153 19 9.99 19C9.76456 19 9.53816 18.9559 9.31079 18.8678ZM9.2429 4.46158C8.67342 3.51576 8.07386 2.82255 7.44421 2.38196C6.81474 1.94136 6.08772 1.72107 5.26316 1.72107C4.21053 1.72107 3.33333 2.10353 2.63158 2.86844C1.92982 3.63336 1.57895 4.58951 1.57895 5.73689C1.57895 6.65766 1.85123 7.6204 2.39579 8.62512C2.94035 9.62984 3.62386 10.6286 4.44632 11.6215C5.26877 12.6146 6.15982 13.5847 7.11947 14.5318C8.07895 15.4792 8.96825 16.3596 9.78737 17.1731C9.84807 17.232 9.91895 17.2614 10 17.2614C10.0811 17.2614 10.1519 17.232 10.2126 17.1731C11.0318 16.3596 11.9211 15.4792 12.8805 14.5318C13.8402 13.5847 14.7312 12.6146 15.5537 11.6215C16.3761 10.6286 17.0597 9.62984 17.6042 8.62512C18.1488 7.6204 18.4211 6.65766 18.4211 5.73689C18.4211 4.58951 18.0702 3.63336 17.3684 2.86844C16.6667 2.10353 15.7895 1.72107 14.7368 1.72107C13.9123 1.72107 13.1853 1.94136 12.5558 2.38196C11.9261 2.82255 11.3266 3.51576 10.7571 4.46158C10.668 4.60863 10.556 4.71897 10.4211 4.7926C10.2861 4.86603 10.1458 4.90274 10 4.90274C9.85421 4.90274 9.71386 4.86603 9.57895 4.7926C9.44404 4.71897 9.33202 4.60863 9.2429 4.46158Z" fill="white" />
//                                     </svg>
//                                     } />
//                             </div>

//                             <motion.button
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => setMenuOpen(true)}
//                                 className={`h-10 w-10 rounded-full border ${iconBorder} flex items-center justify-center transition-colors duration-300`}
//                                 style={{ color: iconFill }}
//                                 aria-label="Open menu"
//                             >
//                                 <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
//                                     <path d="M4 8h20M4 14h20M4 20h20" strokeLinecap="round" />
//                                 </svg>
//                             </motion.button>
//                         </div>
//                     </div>
//                 </div>
//             </motion.nav>

//             <AnimatePresence>
//                 {menuOpen && (
//                     <>
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.35 }}
//                             onClick={() => setMenuOpen(false)}
//                             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
//                         />

//                         <motion.div
//                             initial={{ y: "-100%" }}
//                             animate={{ y: 0 }}
//                             exit={{ y: "-100%" }}
//                             transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
//                             className="fixed top-0 left-0 w-full z-70 bg-dark-green shadow-2xl max-h-screen overflow-y-auto"
//                         >
//                             <div className="h-0.75 w-full bg-linear-to-r from-light-yellow/0 via-light-yellow to-light-yellow/0" />

//                             <div className="p-6 pt-5">
//                                 <div className="flex items-center justify-between mb-8">
//                                     <img src={isScrolled ? whiteLogo.src : logo.src} alt="logo" className="h-20 object-contain" />

//                                     <motion.button
//                                         whileHover={{ rotate: 90 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         transition={{ duration: 0.25 }}
//                                         onClick={() => setMenuOpen(false)}
//                                         className="text-white text-3xl h-10 w-10 rounded-full border border-white/30 flex items-center justify-center"
//                                     >
//                                         ×
//                                     </motion.button>
//                                 </div>

//                                 <div className="flex flex-col gap-1">
//                                     {navItems.map((item, i) => (
//                                         <motion.div
//                                             key={item.id}
//                                             initial={{ opacity: 0, y: -12 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: "easeOut" }}
//                                             className="border-b border-white/10"
//                                         >
//                                             {item.children ? (
//                                                 <>
//                                                     <button
//                                                         onClick={() =>
//                                                             setOpenMobileDropdown(
//                                                                 openMobileDropdown === item.id ? null : item.id
//                                                             )
//                                                         }
//                                                         className="w-full flex items-center justify-between py-4 font-satoshi text-lg text-white"
//                                                     >
//                                                         {item.label}
//                                                         <motion.svg
//                                                             animate={{ rotate: openMobileDropdown === item.id ? 180 : 0 }}
//                                                             transition={{ duration: 0.3 }}
//                                                             width="16"
//                                                             height="16"
//                                                             viewBox="0 0 24 24"
//                                                             fill="none"
//                                                         >
//                                                             <path d="M6 9l6 6 6-6" stroke="#F6C44D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                                         </motion.svg>
//                                                     </button>
//                                                     <AnimatePresence>
//                                                         {openMobileDropdown === item.id && (
//                                                             <motion.div
//                                                                 initial={{ height: 0, opacity: 0 }}
//                                                                 animate={{ height: "auto", opacity: 1 }}
//                                                                 exit={{ height: 0, opacity: 0 }}
//                                                                 transition={{ duration: 0.35, ease: "easeInOut" }}
//                                                                 className="overflow-hidden"
//                                                             >
//                                                                 <div className="flex flex-col gap-1 pb-3 pl-3">
//                                                                     {item.children.map((child) => (
//                                                                         <a
//                                                                             key={child.label}
//                                                                             href={child.href}
//                                                                             onClick={() => setMenuOpen(false)}
//                                                                             className="py-2 text-white/70 font-satoshi text-base hover:text-light-yellow transition-colors"
//                                                                         >
//                                                                             {child.label}
//                                                                         </a>
//                                                                     ))}
//                                                                 </div>
//                                                             </motion.div>
//                                                         )}
//                                                     </AnimatePresence>
//                                                 </>
//                                             ) : (
//                                                 <Link
//                                                     href={item.href!}
//                                                     onClick={() => setMenuOpen(false)}
//                                                     className={`block py-4 font-satoshi text-lg ${activeSection === item.id ? "text-light-yellow" : "text-white"}`}
//                                                 >
//                                                     {item.label}
//                                                 </Link>
//                                             )}
//                                         </motion.div>
//                                     ))}
//                                 </div>


//                                 <div className="flex items-center gap-3 py-4 border-b border-white/10">
//                                     {languages.map((lang) => (
//                                         <button
//                                             key={lang.code}
//                                             onClick={() => setActiveLang(lang)}
//                                             className={`px-3 py-1.5 rounded-full text-sm font-satoshi border transition-colors
//                                                 ${activeLang.code === lang.code
//                                                     ? "border-light-yellow text-light-yellow"
//                                                     : "border-white/25 text-white/70 hover:text-light-yellow hover:border-light-yellow/50"}`}
//                                         >
//                                             <p className="font-satoshi font-semibold">{lang.code}</p>
//                                         </button>
//                                     ))}
//                                 </div>

//                                 <motion.div
//                                     initial={{ opacity: 0, y: 10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: 0.5, duration: 0.4 }}
//                                     className="pt-6 flex flex-col gap-4"
//                                 >
//                                     <PrimaryButton text={"Donate Now"}
//                                         containerClassName="!bg-dark-yellow"
//                                         iconWrapperClassName="!bg-white"
//                                         icon={
//                                             <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M9.31079 18.8678C9.08342 18.7794 8.88333 18.6412 8.71053 18.453L7.19842 16.9548C5.33211 15.0999 3.66579 13.2776 2.19947 11.4881C0.733158 9.69859 0 7.78152 0 5.73689C0 4.10857 0.503684 2.74529 1.51105 1.64706C2.5186 0.54902 3.7693 0 5.26316 0C6.11193 0 6.95035 0.213317 7.77842 0.63995C8.60632 1.06658 9.34684 1.75941 10 2.71843C10.6532 1.75941 11.3937 1.06658 12.2216 0.63995C13.0496 0.213317 13.8881 0 14.7368 0C16.2307 0 17.4814 0.54902 18.4889 1.64706C19.4963 2.74529 20 4.10857 20 5.73689C20 7.8037 19.2544 9.7421 17.7632 11.5521C16.2719 13.3621 14.6093 15.1688 12.7753 16.9723L11.2792 18.453C11.1066 18.6412 10.9049 18.7794 10.6742 18.8678C10.4433 18.9559 10.2153 19 9.99 19C9.76456 19 9.53816 18.9559 9.31079 18.8678ZM9.2429 4.46158C8.67342 3.51576 8.07386 2.82255 7.44421 2.38196C6.81474 1.94136 6.08772 1.72107 5.26316 1.72107C4.21053 1.72107 3.33333 2.10353 2.63158 2.86844C1.92982 3.63336 1.57895 4.58951 1.57895 5.73689C1.57895 6.65766 1.85123 7.6204 2.39579 8.62512C2.94035 9.62985 3.62386 10.6286 4.44632 11.6215C5.26877 12.6146 6.15982 13.5847 7.11947 14.5318C8.07895 15.4792 8.96825 16.3596 9.78737 17.1731C9.84807 17.232 9.91895 17.2614 10 17.2614C10.0811 17.2614 10.1519 17.232 10.2126 17.1731C11.0318 16.3596 11.9211 15.4792 12.8805 14.5318C13.8402 13.5847 14.7312 12.6146 15.5537 11.6215C16.3761 10.6286 17.0596 9.62985 17.6042 8.62512C18.1488 7.6204 18.4211 6.65766 18.4211 5.73689C18.4211 4.58951 18.0702 3.63336 17.3684 2.86844C16.6667 2.10353 15.7895 1.72107 14.7368 1.72107C13.9123 1.72107 13.1853 1.94136 12.5558 2.38196C11.9261 2.82255 11.3266 3.51576 10.7571 4.46158C10.668 4.60863 10.556 4.71897 10.4211 4.7926C10.2861 4.86603 10.1458 4.90274 10 4.90274C9.85421 4.90274 9.71386 4.86603 9.57895 4.7926C9.44404 4.71897 9.33202 4.60863 9.2429 4.46158Z" fill="#0A3231" />
//                                             </svg>

//                                         } />
//                                 </motion.div>
//                             </div>
//                         </motion.div>
//                     </>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };

// export default Navbar;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import logo from '../../assets/images/homepage/dark-logo.png'
import whiteLogo from '../../assets/images/homepage/white-logo.png'

import PrimaryButton from "./PrimaryButton";

type NavItem = {
    label: string;
    id: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: "Home", href: "/", id: "home" },
    { label: "About Us", href: "/about-us", id: "about" },
    { label: "Causes", href: "/causes", id: "causes" },
    { label: "Get Involved", href: "/get-involved", id: "get-involved" },
    { label: "Contact", href: "/contact", id: "contact" },
];

const languages = [
    { code: "EN", label: "English" },
    { code: "AR", label: "Arabic" },
    { code: "UR", label: "Urdu" },
];

const Navbar = () => {
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [langOpen, setLangOpen] = useState(false);
    const [activeLang, setActiveLang] = useState(languages[0]);

    const isHome = pathname === "/";
    const isAsgardRoute = pathname.startsWith("/asgard") || pathname.startsWith("/login") || pathname.startsWith("/events") || pathname.startsWith("/asgard/partners");

    if (isAsgardRoute) return null;

    const isItemActive = (item: NavItem) => {
        if (item.href.startsWith("/")) {
            return pathname === item.href;
        }
        return isHome && activeSection === item.id;
    };

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting);
                if (visible) setActiveSection(visible.target.id);
            },
            { rootMargin: "-20% 0px -50% 0px" }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isLightSurface = isHome && !isScrolled;

    const navbarBg = isLightSurface
        ? "bg-transparent"
        : "bg-dark-green/95 shadow-lg backdrop-blur-md py-2";

    const navbarPosition = isLightSurface ? "absolute top-2" : "fixed top-0";

    const textBase = isLightSurface
        ? "text-dark-green hover:text-dark-yellow"
        : "text-white hover:text-light-yellow";

    const iconBorder = isLightSurface ? "border-dark-green/40" : "border-white/50";
    const iconFill = isLightSurface ? "#0D2750" : "#FFFFFF";

    return (
        <>
            <motion.nav
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full left-0 z-50 fixed transition-[background-color,padding,box-shadow] duration-500 ease-out ${navbarBg} ${navbarPosition}`}
            >
                <div className="container mx-auto px-4 xl:px-6 2xl:px-0">
                    <div className="flex items-center justify-between h-20 lg:h-24 md:px-6">

                        <Link href="/" className="shrink-0">
                            <motion.img
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                src={pathname === "/" ? (isScrolled ? whiteLogo.src : logo.src) : whiteLogo.src}
                                alt="logo"
                                className="h-14 lg:h-16 xl:h-20 object-contain"
                            />
                        </Link>


                        <div className="hidden 2xl:flex items-center gap-2">
                            {navItems.map((item) => {
                                const active = isItemActive(item);
                                const isRoute = item.href.startsWith("/");
                                const linkClass = `group relative flex items-center gap-1.5 px-4 py-2 font-satoshi text-base transition-colors duration-300 whitespace-nowrap
                                         ${active
                                        ? `${pathname === "/" && !isScrolled ? "text-dark-green" : "text-white"} font-bold`
                                        : `${textBase} font-medium`
                                    }`;

                                const underline = (
                                    <>
                                        <span
                                            className={`absolute left-4 right-4 -bottom-0.5 h-px bg-dark-yellow origin-left transition-transform duration-300 ease-out
                                                ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                                        />
                                        <span
                                            className={`absolute right-3 -bottom-1 h-1.25 w-1.25 rounded-full bg-dark-yellow origin-left transition-transform duration-300 ease-out
                                                ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                                        />
                                    </>
                                );

                                return (
                                    <div key={item.id} className="relative">
                                        {isRoute ? (
                                            <Link href={item.href} className={linkClass}>
                                                {item.label}
                                                {underline}
                                            </Link>
                                        ) : (
                                            <a href={item.href} className={linkClass}>
                                                {item.label}
                                                {underline}
                                            </a>
                                        )}
                                    </div>
                                );
                            })}
                        </div>


                        <div className="hidden 2xl:flex items-center gap-4">

                            <Link href="/contact">
                                <PrimaryButton
                                    text="Donate Now"
                                    containerClassName={
                                        pathname === "/" && !isScrolled
                                            ? "bg-dark-green"
                                            : "bg-dark-yellow"
                                    }
                                    iconWrapperClassName={
                                        pathname === "/" && !isScrolled
                                            ? "!bg-dark-yellow"
                                            : "!bg-dark-green"
                                    }
                                    icon={<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.31079 18.8678C9.08342 18.7794 8.88333 18.6412 8.71053 18.453L7.19842 16.9548C5.33211 15.0999 3.66579 13.2776 2.19947 11.4881C0.733158 9.69859 0 7.78152 0 5.73689C0 4.10857 0.503684 2.74529 1.51105 1.64706C2.5186 0.54902 3.7693 0 5.26316 0C6.11193 0 6.95035 0.213317 7.77842 0.63995C8.60632 1.06658 9.34684 1.75941 10 2.71843C10.6532 1.75941 11.3937 1.06658 12.2216 0.63995C13.0496 0.213317 13.8881 0 14.7368 0C16.2307 0 17.4814 0.54902 18.4889 1.64706C19.4963 2.74529 20 4.10857 20 5.73689C20 7.8037 19.2544 9.7421 17.7632 11.5521C16.2719 13.3621 14.6093 15.1688 12.7753 16.9723L11.2792 18.453C11.1066 18.6412 10.9049 18.7794 10.6742 18.8678C10.4433 18.9559 10.2153 19 9.99 19C9.76456 19 9.53816 18.9559 9.31079 18.8678ZM9.2429 4.46158C8.67342 3.51576 8.07386 2.82255 7.44421 2.38196C6.81474 1.94136 6.08772 1.72107 5.26316 1.72107C4.21053 1.72107 3.33333 2.10353 2.63158 2.86844C1.92982 3.63336 1.57895 4.58951 1.57895 5.73689C1.57895 6.65766 1.85123 7.6204 2.39579 8.62512C2.94035 9.62984 3.62386 10.6286 4.44632 11.6215C5.26877 12.6146 6.15982 13.5847 7.11947 14.5318C8.07895 15.4792 8.96825 16.3596 9.78737 17.1731C9.84807 17.232 9.91895 17.2614 10 17.2614C10.0811 17.2614 10.1519 17.232 10.2126 17.1731C11.0318 16.3596 11.9211 15.4792 12.8805 14.5318C13.8402 13.5847 14.7312 12.6146 15.5537 11.6215C16.3761 10.6286 17.0597 9.62984 17.6042 8.62512C18.1488 7.6204 18.4211 6.65766 18.4211 5.73689C18.4211 4.58951 18.0702 3.63336 17.3684 2.86844C16.6667 2.10353 15.7895 1.72107 14.7368 1.72107C13.9123 1.72107 13.1853 1.94136 12.5558 2.38196C11.9261 2.82255 11.3266 3.51576 10.7571 4.46158C10.668 4.60863 10.556 4.71897 10.4211 4.7926C10.2861 4.86603 10.1458 4.90274 10 4.90274C9.85421 4.90274 9.71386 4.86603 9.57895 4.7926C9.44404 4.71897 9.33202 4.60863 9.2429 4.46158Z" fill="white" />
                                    </svg>
                                    } />
                            </Link>

                            <div className="bg-[#5A625F] h-10 w-px" />

                            <div
                                className="relative"
                                onMouseEnter={() => setLangOpen(true)}
                                onMouseLeave={() => setLangOpen(false)}
                            >
                                <button
                                    className={`flex items-center gap-1.5 font-satoshi text-sm transition-colors duration-300 ${textBase}`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 17.2895C4.40517 16.8157 3.45167 16.1727 2.6395 15.3605C1.82733 14.5483 1.18433 13.5948 0.7105 12.5C0.236833 11.4052 0 10.2375 0 8.997C0 7.75667 0.236833 6.59 0.7105 5.497C1.18433 4.40417 1.82733 3.45167 2.6395 2.6395C3.45167 1.82733 4.40517 1.18433 5.5 0.7105C6.59483 0.236833 7.7625 0 9.003 0C10.2433 0 11.41 0.236833 12.503 0.7105C13.5958 1.18433 14.5483 1.82733 15.3605 2.6395C16.1727 3.45167 16.8157 4.40417 17.2895 5.497C17.7632 6.59 18 7.75667 18 8.997C18 10.2375 17.7632 11.4052 17.2895 12.5C16.8157 13.5948 16.1727 14.5483 15.3605 15.3605C14.5483 16.1727 13.5958 16.8157 12.503 17.2895C11.41 17.7632 10.2433 18 9.003 18C7.7625 18 6.59483 17.7632 5.5 17.2895ZM9 17.0077C9.58717 16.2539 10.0712 15.5135 10.452 14.7865C10.8327 14.0597 11.1423 13.2463 11.3807 12.3463H6.61925C6.88342 13.2974 7.19942 14.1365 7.56725 14.8635C7.93525 15.5903 8.41283 16.3051 9 17.0077ZM7.727 16.8577C7.26033 16.3078 6.83433 15.6279 6.449 14.8182C6.06383 14.0086 5.777 13.1846 5.5885 12.3463H1.75375C2.32692 13.5898 3.13942 14.6096 4.19125 15.4057C5.24325 16.2019 6.42183 16.6859 7.727 16.8577ZM10.273 16.8577C11.5782 16.6859 12.7567 16.2019 13.8087 15.4057C14.8606 14.6096 15.6731 13.5898 16.2463 12.3463H12.4115C12.159 13.1974 11.8401 14.0278 11.4548 14.8375C11.0696 15.6472 10.6757 16.3206 10.273 16.8577ZM1.34625 11.3463H5.38075C5.30508 10.9359 5.25158 10.5362 5.22025 10.147C5.18875 9.758 5.173 9.37567 5.173 9C5.173 8.62433 5.18875 8.242 5.22025 7.853C5.25158 7.46383 5.30508 7.06408 5.38075 6.65375H1.34625C1.23725 6.99992 1.15225 7.37717 1.09125 7.7855C1.03042 8.19383 1 8.59867 1 9C1 9.40133 1.03042 9.80617 1.09125 10.2145C1.15225 10.6228 1.23725 11.0001 1.34625 11.3463ZM6.38075 11.3463H11.6193C11.6949 10.9359 11.7484 10.5426 11.7797 10.1663C11.8113 9.79008 11.827 9.40133 11.827 9C11.827 8.59867 11.8113 8.20992 11.7797 7.83375C11.7484 7.45742 11.6949 7.06408 11.6193 6.65375H6.38075C6.30508 7.06408 6.25158 7.45742 6.22025 7.83375C6.18875 8.20992 6.173 8.59867 6.173 9C6.173 9.40133 6.18875 9.79008 6.22025 10.1663C6.25158 10.5426 6.30508 10.9359 6.38075 11.3463ZM12.6193 11.3463H16.6538C16.7628 11.0001 16.8477 10.6228 16.9088 10.2145C16.9696 9.80617 17 9.40133 17 9C17 8.59867 16.9696 8.19383 16.9088 7.7855C16.8477 7.37717 16.7628 6.99992 16.6538 6.65375H12.6193C12.6949 7.06408 12.7484 7.46383 12.7797 7.853C12.8113 8.242 12.827 8.62433 12.827 9C12.827 9.37567 12.8113 9.758 12.7797 10.147C12.7484 10.5362 12.6949 10.9359 12.6193 11.3463ZM12.4115 5.65375H16.2463C15.6602 4.38458 14.8573 3.36475 13.8375 2.59425C12.8177 1.82375 11.6295 1.33333 10.273 1.123C10.7397 1.73717 11.1593 2.43942 11.5318 3.22975C11.9043 4.02025 12.1975 4.82825 12.4115 5.65375ZM6.61925 5.65375H11.3807C11.1166 4.71542 10.7909 3.86675 10.4038 3.10775C10.0166 2.34875 9.54867 1.64358 9 0.99225C8.45133 1.64358 7.98342 2.34875 7.59625 3.10775C7.20908 3.86675 6.88342 4.71542 6.61925 5.65375ZM1.75375 5.65375H5.5885C5.8025 4.82825 6.09575 4.02025 6.46825 3.22975C6.84075 2.43942 7.26033 1.73717 7.727 1.123C6.35767 1.33333 5.16633 1.82692 4.153 2.60375C3.1395 3.38075 2.33975 4.39742 1.75375 5.65375Z" fill="#BD8C3B" />
                                    </svg>

                                    <p className="font-satoshi font-medium">{activeLang.code}</p>
                                    <motion.svg
                                        animate={{ rotate: langOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                </button>

                                <AnimatePresence>
                                    {langOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute top-full right-0 mt-2 w-36 rounded-xl bg-dark-green border border-light-yellow/20 shadow-2xl overflow-hidden py-2 z-10"
                                        >
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => {
                                                        setActiveLang(lang);
                                                        setLangOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm font-satoshi transition-colors duration-200
                                                        ${activeLang.code === lang.code ? "text-light-yellow" : "text-white/85 hover:text-light-yellow hover:bg-white/5"}`}
                                                >
                                                    <p className="font-satoshi font-semibold">{lang.code}</p>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>


                        <div className="flex 2xl:hidden items-center gap-3">
                            <div className="hidden sm:block">
                                <Link href="/contact">
                                    <PrimaryButton text={"Donate Now"}
                                        icon={<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.31079 18.8678C9.08342 18.7794 8.88333 18.6412 8.71053 18.453L7.19842 16.9548C5.33211 15.0999 3.66579 13.2776 2.19947 11.4881C0.733158 9.69859 0 7.78152 0 5.73689C0 4.10857 0.503684 2.74529 1.51105 1.64706C2.5186 0.54902 3.7693 0 5.26316 0C6.11193 0 6.95035 0.213317 7.77842 0.63995C8.60632 1.06658 9.34684 1.75941 10 2.71843C10.6532 1.75941 11.3937 1.06658 12.2216 0.63995C13.0496 0.213317 13.8881 0 14.7368 0C16.2307 0 17.4814 0.54902 18.4889 1.64706C19.4963 2.74529 20 4.10857 20 5.73689C20 7.8037 19.2544 9.7421 17.7632 11.5521C16.2719 13.3621 14.6093 15.1688 12.7753 16.9723L11.2792 18.453C11.1066 18.6412 10.9049 18.7794 10.6742 18.8678C10.4433 18.9559 10.2153 19 9.99 19C9.76456 19 9.53816 18.9559 9.31079 18.8678ZM9.2429 4.46158C8.67342 3.51576 8.07386 2.82255 7.44421 2.38196C6.81474 1.94136 6.08772 1.72107 5.26316 1.72107C4.21053 1.72107 3.33333 2.10353 2.63158 2.86844C1.92982 3.63336 1.57895 4.58951 1.57895 5.73689C1.57895 6.65766 1.85123 7.6204 2.39579 8.62512C2.94035 9.62984 3.62386 10.6286 4.44632 11.6215C5.26877 12.6146 6.15982 13.5847 7.11947 14.5318C8.07895 15.4792 8.96825 16.3596 9.78737 17.1731C9.84807 17.232 9.91895 17.2614 10 17.2614C10.0811 17.2614 10.1519 17.232 10.2126 17.1731C11.0318 16.3596 11.9211 15.4792 12.8805 14.5318C13.8402 13.5847 14.7312 12.6146 15.5537 11.6215C16.3761 10.6286 17.0597 9.62984 17.6042 8.62512C18.1488 7.6204 18.4211 6.65766 18.4211 5.73689C18.4211 4.58951 18.0702 3.63336 17.3684 2.86844C16.6667 2.10353 15.7895 1.72107 14.7368 1.72107C13.9123 1.72107 13.1853 1.94136 12.5558 2.38196C11.9261 2.82255 11.3266 3.51576 10.7571 4.46158C10.668 4.60863 10.556 4.71897 10.4211 4.7926C10.2861 4.86603 10.1458 4.90274 10 4.90274C9.85421 4.90274 9.71386 4.86603 9.57895 4.7926C9.44404 4.71897 9.33202 4.60863 9.2429 4.46158Z" fill="white" />
                                        </svg>
                                        } />
                                </Link>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMenuOpen(true)}
                                className={`h-10 w-10 rounded-full border ${iconBorder} flex items-center justify-center transition-colors duration-300`}
                                style={{ color: iconFill }}
                                aria-label="Open menu"
                            >
                                <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 8h20M4 14h20M4 20h20" strokeLinecap="round" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
                        />

                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 left-0 w-full z-70 bg-dark-green shadow-2xl max-h-screen overflow-y-auto"
                        >
                            <div className="h-0.75 w-full bg-linear-to-r from-light-yellow/0 via-light-yellow to-light-yellow/0" />

                            <div className="p-6 pt-5">
                                <div className="flex items-center justify-between mb-8">
                                    <img src={isScrolled ? whiteLogo.src : logo.src} alt="logo" className="h-20 object-contain" />

                                    <motion.button
                                        whileHover={{ rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.25 }}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-white text-3xl h-10 w-10 rounded-full border border-white/30 flex items-center justify-center"
                                    >
                                        ×
                                    </motion.button>
                                </div>

                                <div className="flex flex-col gap-1">
                                    {navItems.map((item, i) => {
                                        const active = isItemActive(item);
                                        const isRoute = item.href.startsWith("/");
                                        return (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: -12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                                                className="border-b border-white/10"
                                            >
                                                {isRoute ? (
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setMenuOpen(false)}
                                                        className={`block py-4 font-satoshi text-lg ${active ? "text-light-yellow" : "text-white"}`}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ) : (
                                                    <a
                                                        href={item.href}
                                                        onClick={() => setMenuOpen(false)}
                                                        className={`block py-4 font-satoshi text-lg ${active ? "text-light-yellow" : "text-white"}`}
                                                    >
                                                        {item.label}
                                                    </a>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>


                                <div className="flex items-center gap-3 py-4 border-b border-white/10">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setActiveLang(lang)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-satoshi border transition-colors
                                                ${activeLang.code === lang.code
                                                    ? "border-light-yellow text-light-yellow"
                                                    : "border-white/25 text-white/70 hover:text-light-yellow hover:border-light-yellow/50"}`}
                                        >
                                            <p className="font-satoshi font-semibold">{lang.code}</p>
                                        </button>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                    className="pt-6 flex flex-col gap-4"
                                >
                                    <Link href="/contact" className="w-full">
                                        <PrimaryButton text={"Donate Now"}
                                            containerClassName="!bg-dark-yellow w-full"
                                            iconWrapperClassName="!bg-white"
                                            icon={
                                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.31079 18.8678C9.08342 18.7794 8.88333 18.6412 8.71053 18.453L7.19842 16.9548C5.33211 15.0999 3.66579 13.2776 2.19947 11.4881C0.733158 9.69859 0 7.78152 0 5.73689C0 4.10857 0.503684 2.74529 1.51105 1.64706C2.5186 0.54902 3.7693 0 5.26316 0C6.11193 0 6.95035 0.213317 7.77842 0.63995C8.60632 1.06658 9.34684 1.75941 10 2.71843C10.6532 1.75941 11.3937 1.06658 12.2216 0.63995C13.0496 0.213317 13.8881 0 14.7368 0C16.2307 0 17.4814 0.54902 18.4889 1.64706C19.4963 2.74529 20 4.10857 20 5.73689C20 7.8037 19.2544 9.7421 17.7632 11.5521C16.2719 13.3621 14.6093 15.1688 12.7753 16.9723L11.2792 18.453C11.1066 18.6412 10.9049 18.7794 10.6742 18.8678C10.4433 18.9559 10.2153 19 9.99 19C9.76456 19 9.53816 18.9559 9.31079 18.8678ZM9.2429 4.46158C8.67342 3.51576 8.07386 2.82255 7.44421 2.38196C6.81474 1.94136 6.08772 1.72107 5.26316 1.72107C4.21053 1.72107 3.33333 2.10353 2.63158 2.86844C1.92982 3.63336 1.57895 4.58951 1.57895 5.73689C1.57895 6.65766 1.85123 7.6204 2.39579 8.62512C2.94035 9.62985 3.62386 10.6286 4.44632 11.6215C5.26877 12.6146 6.15982 13.5847 7.11947 14.5318C8.07895 15.4792 8.96825 16.3596 9.78737 17.1731C9.84807 17.232 9.91895 17.2614 10 17.2614C10.0811 17.2614 10.1519 17.232 10.2126 17.1731C11.0318 16.3596 11.9211 15.4792 12.8805 14.5318C13.8402 13.5847 14.7312 12.6146 15.5537 11.6215C16.3761 10.6286 17.0596 9.62985 17.6042 8.62512C18.1488 7.6204 18.4211 6.65766 18.4211 5.73689C18.4211 4.58951 18.0702 3.63336 17.3684 2.86844C16.6667 2.10353 15.7895 1.72107 14.7368 1.72107C13.9123 1.72107 13.1853 1.94136 12.5558 2.38196C11.9261 2.82255 11.3266 3.51576 10.7571 4.46158C10.668 4.60863 10.556 4.71897 10.4211 4.7926C10.2861 4.86603 10.1458 4.90274 10 4.90274C9.85421 4.90274 9.71386 4.86603 9.57895 4.7926C9.44404 4.71897 9.33202 4.60863 9.2429 4.46158Z" fill="#0A3231" />
                                                </svg>

                                            } />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;