import type { StaticImageData } from 'next/image';
import p1 from '@/src/assets/images/homepage/partnerssection/Partner-1.png';
import p2 from '@/src/assets/images/homepage/partnerssection/Partner-2.png';
import p3 from '@/src/assets/images/homepage/partnerssection/Partner-3.png';
import p4 from '@/src/assets/images/homepage/partnerssection/Partner-4.png';
import p5 from '@/src/assets/images/homepage/partnerssection/Partner-5.png';
import p6 from '@/src/assets/images/homepage/partnerssection/Partner-6.png';

export interface PartnerItem {
  name: string;
  logo: StaticImageData | string | null;
  category: "collaboration" | "featured";
  initials?: string;
  note?: string;
}

// In Collaboration With — Partner organizations, peace summits & civil forums
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
    name: "Interfaith Peace Initiative",
    logo: p6,
    category: "collaboration",
  },
  {
    name: "Global Sufi Forum",
    // Official logo to be supplied by Foundation; does not reuse unrelated logos
    logo: null,
    initials: "GSF",
    category: "collaboration",
    note: "Official logo pending supply",
  },
  {
    name: "International Peace Summit",
    // Official logo to be supplied by Foundation; does not reuse unrelated logos
    logo: null,
    initials: "IPS",
    category: "collaboration",
    note: "Official logo pending supply",
  },
  {
    name: "BRICS Civil Forums",
    // Wording reflects civil society & interfaith forum engagement rather than claiming official governmental partnership
    logo: p5,
    category: "collaboration",
    note: "Civil society forum participation",
  },
];

// As Featured In — Strictly media and publication outlets that cover the Foundation
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
];
