import eduImg from "@/src/assets/images/homepage/servicessection/education-img.png";
import healthImg from "@/src/assets/images/homepage/servicessection/healthcare-img.png";
import womenImg from "@/src/assets/images/homepage/servicessection/women-img.png";
import donateImg from "@/src/assets/images/homepage/servicessection/donation-img.png";
import volunteerImg from "@/src/assets/images/getinvolvedpage/way-to/volunteer-img.png";
import causeHeroImg from "@/src/assets/images/causes/cause-hero-img.png";

export interface GalleryItem {
  id: number;
  title: string;
  category: "Education" | "Healthcare" | "Women Empowerment" | "Livelihood & Skills" | "Environment & Sustainability" | "Hunger Relief";
  location: string;
  image: string;
  caption: string;
}

export const GALLERY_CATEGORIES = [
  "All",
  "Education",
  "Healthcare",
  "Women Empowerment",
  "Livelihood & Skills",
  "Environment & Sustainability",
  "Hunger Relief",
] as const;

// 30 configurable seed items across the 6 programme areas
export const defaultGalleryItems: GalleryItem[] = [
  // Education
  {
    id: 1,
    title: "Bab ul Ilm Classroom Session",
    category: "Education",
    location: "Bithoor Village, Ajmer",
    image: eduImg.src,
    caption: "Children engaged in active learning at the Bab ul Ilm community school.",
  },
  {
    id: 2,
    title: "Free School Supplies Distribution",
    category: "Education",
    location: "Ajmer District",
    image: eduImg.src,
    caption: "Distributing notebooks, bags, and stationery kits to underprivileged students.",
  },
  {
    id: 3,
    title: "Youth Digital Literacy Workshop",
    category: "Education",
    location: "Ajmer Sharif",
    image: eduImg.src,
    caption: "Providing foundational computer literacy and digital tools to rural youth.",
  },
  {
    id: 4,
    title: "Primary Education Support",
    category: "Education",
    location: "Rural Rajasthan",
    image: eduImg.src,
    caption: "Supporting foundational learning and literacy for early childhood students.",
  },
  {
    id: 5,
    title: "Student Academic Mentorship",
    category: "Education",
    location: "Bab ul Ilm School",
    image: eduImg.src,
    caption: "One-on-one tutoring and confidence-building sessions for high-school students.",
  },

  // Healthcare
  {
    id: 6,
    title: "Free Medical Health Camp",
    category: "Healthcare",
    location: "Ajmer Sharif",
    image: healthImg.src,
    caption: "General physicians providing free check-ups and diagnostic support to pilgrims and locals.",
  },
  {
    id: 7,
    title: "Free Medicine Distribution",
    category: "Healthcare",
    location: "Dargah Sharif Vicinity",
    image: healthImg.src,
    caption: "Providing essential prescribed medicines to elderly and low-income patients.",
  },
  {
    id: 8,
    title: "Eye Examination & Glasses Camp",
    category: "Healthcare",
    location: "Ajmer",
    image: healthImg.src,
    caption: "Vision screening and distribution of corrective eyeglasses to senior citizens.",
  },
  {
    id: 9,
    title: "Maternal & Child Wellness Support",
    category: "Healthcare",
    location: "Rural Outreach, Ajmer",
    image: healthImg.src,
    caption: "Nutritional supplements and wellness checks for expectant mothers and infants.",
  },
  {
    id: 10,
    title: "Community Hygiene & Sanitation Drive",
    category: "Healthcare",
    location: "Ajmer District",
    image: healthImg.src,
    caption: "Promoting clean water access and community hygiene awareness.",
  },

  // Women Empowerment
  {
    id: 11,
    title: "Vocational Sewing & Tailoring Centre",
    category: "Women Empowerment",
    location: "Ajmer Sharif",
    image: womenImg.src,
    caption: "Empowering women with professional garment making and embroidery skills.",
  },
  {
    id: 12,
    title: "Women Artisan Craft Exhibition",
    category: "Women Empowerment",
    location: "Sufi Rang Festival",
    image: womenImg.src,
    caption: "Showcasing handcrafted traditional artwork created by self-help group members.",
  },
  {
    id: 13,
    title: "Financial Literacy & Micro-Enterprise",
    category: "Women Empowerment",
    location: "Ajmer",
    image: womenImg.src,
    caption: "Training women entrepreneurs in budgeting, banking, and micro-business management.",
  },
  {
    id: 14,
    title: "Handicrafts & Zari Skill Training",
    category: "Women Empowerment",
    location: "Khanqah Workshop",
    image: womenImg.src,
    caption: "Preserving traditional embroidery techniques while generating household income.",
  },
  {
    id: 15,
    title: "Women Leadership Circle",
    category: "Women Empowerment",
    location: "Ajmer District",
    image: womenImg.src,
    caption: "Community peer group fostering mutual support, confidence, and collective action.",
  },

  // Livelihood & Skills
  {
    id: 16,
    title: "Youth Vocational Training Programme",
    category: "Livelihood & Skills",
    location: "Ajmer",
    image: volunteerImg.src,
    caption: "Practical vocational training enabling sustainable employment for local youth.",
  },
  {
    id: 17,
    title: "Artisanal Heritage Workshop",
    category: "Livelihood & Skills",
    location: "Chishty Manzil",
    image: volunteerImg.src,
    caption: "Supporting local craftspeople in stone carving, woodwork, and heritage restoration.",
  },
  {
    id: 18,
    title: "Small Business Starter Kits",
    category: "Livelihood & Skills",
    location: "Ajmer District",
    image: volunteerImg.src,
    caption: "Equipping daily-wage earners with tools and equipment to launch independent trades.",
  },
  {
    id: 19,
    title: "Digital & Commerce Training",
    category: "Livelihood & Skills",
    location: "Ajmer",
    image: volunteerImg.src,
    caption: "Assisting local micro-entrepreneurs in reaching wider markets through digital commerce.",
  },
  {
    id: 20,
    title: "Community Skill Development Circle",
    category: "Livelihood & Skills",
    location: "Rural Ajmer",
    image: volunteerImg.src,
    caption: "Hands-on apprenticeship programs connecting master artisans with young trainees.",
  },

  // Environment & Sustainability
  {
    id: 21,
    title: "Green Ajmer Tree Plantation Drive",
    category: "Environment & Sustainability",
    location: "Taragarh Hills, Ajmer",
    image: causeHeroImg.src,
    caption: "Volunteers planting native saplings to preserve local ecology and green cover.",
  },
  {
    id: 22,
    title: "Clean Water Well Restoration",
    category: "Environment & Sustainability",
    location: "Ajmer District",
    image: causeHeroImg.src,
    caption: "Restoring traditional water heritage structures for sustainable community water supply.",
  },
  {
    id: 23,
    title: "Eco-Conscious Living Awareness",
    category: "Environment & Sustainability",
    location: "Ajmer Sharif",
    image: causeHeroImg.src,
    caption: "Promoting conservation, plastic-free living, and sacred environmental stewardship.",
  },
  {
    id: 24,
    title: "Solar Lighting Community Project",
    category: "Environment & Sustainability",
    location: "Rural Village",
    image: causeHeroImg.src,
    caption: "Installing clean solar streetlights and community solar chargers in rural settlements.",
  },
  {
    id: 25,
    title: "Heritage Conservation Cleanliness Drive",
    category: "Environment & Sustainability",
    location: "Dargah Sharif Perimeter",
    image: causeHeroImg.src,
    caption: "Youth volunteer cleanliness drives maintaining the sanctity and purity of public areas.",
  },

  // Hunger Relief
  {
    id: 26,
    title: "Daily Langar Seva at Ajmer Sharif",
    category: "Hunger Relief",
    location: "Dargah Sharif, Ajmer",
    image: donateImg.src,
    caption: "Continuing the 800-year tradition of open community kitchen serving thousands daily.",
  },
  {
    id: 27,
    title: "Dry Ration Kit Distribution",
    category: "Hunger Relief",
    location: "Underprivileged Settlements, Ajmer",
    image: donateImg.src,
    caption: "Providing monthly essential food supplies including rice, flour, pulses, and oil.",
  },
  {
    id: 28,
    title: "Ramadan Iftari Distribution",
    category: "Hunger Relief",
    location: "Ajmer Sharif",
    image: donateImg.src,
    caption: "Serving evening Iftar meals to fasting pilgrims and needy community members.",
  },
  {
    id: 29,
    title: "Emergency Food Relief During Crises",
    category: "Hunger Relief",
    location: "Regional Outreach",
    image: donateImg.src,
    caption: "Rapid deployment of hot meals and clean drinking water to vulnerable families.",
  },
  {
    id: 30,
    title: "Pilgrim & Community Langar Table",
    category: "Hunger Relief",
    location: "Chishty Manzil Sufi Khanqah",
    image: donateImg.src,
    caption: "Welcoming all visitors regardless of faith or background to share meals in harmony.",
  },
];
