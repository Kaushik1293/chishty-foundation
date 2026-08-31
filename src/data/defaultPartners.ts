import p1 from '@/src/assets/images/homepage/partnerssection/Partner-1.png';
import p2 from '@/src/assets/images/homepage/partnerssection/Partner-2.png';
import p3 from '@/src/assets/images/homepage/partnerssection/Partner-3.png';
import p4 from '@/src/assets/images/homepage/partnerssection/Partner-4.png';
import p5 from '@/src/assets/images/homepage/partnerssection/Partner-5.png';
import p6 from '@/src/assets/images/homepage/partnerssection/Partner-6.png';

export interface PartnerItem {
  name: string;
  logo: any;
  category: "collaboration" | "featured";
}

// In Collaboration With
export const collaborationPartners: PartnerItem[] = [
  {
    name: "Heartfulness Education Trust",
    logo: p1,
    category: "collaboration",
  },
  {
    name: "Radha Soami Satsang Beas (RSSB)",
    logo: p2,
    category: "collaboration",
  },
  {
    name: "BRICS",
    logo: p5,
    category: "collaboration",
  },
  {
    name: "Interfaith Peace Initiative",
    logo: p6,
    category: "collaboration",
  },
];

// As Featured In
export const featuredPartners: PartnerItem[] = [
  {
    name: "The Speaking Tree",
    logo: p3,
    category: "featured",
  },
  {
    name: "The Times of India",
    logo: p4,
    category: "featured",
  },
  {
    name: "Global Sufi Forum",
    logo: p1,
    category: "featured",
  },
  {
    name: "International Peace Summit",
    logo: p5,
    category: "featured",
  },
];
