import causeImg1 from '@/src/assets/images/homepage/servicessection/education-img.png';
import causeImg2 from '@/src/assets/images/getinvolvedpage/way-to/volunteer-img.png';
import causeImg3 from '@/src/assets/images/homepage/servicessection/donation-img.png';
import causeImg4 from '@/src/assets/images/getinvolvedpage/way-to/dontate-img.png';
import causeImg5 from '@/src/assets/images/causes/cause-hero-img.png';

export interface DefaultCause {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const defaultCauses: DefaultCause[] = [
  {
    id: 1,
    title: 'Interfaith Harmony',
    description:
      'We bring people of different faiths and cultures onto one platform. Through dialogue and shared service we build mutual respect, dissolve division, and let diversity be celebrated rather than feared.',
    image: causeImg1.src,
  },
  {
    id: 2,
    title: 'Sewa — Selfless Service',
    description:
      'Sewa is service given with no expectation of return. It is the purest expression of our tradition — kindness, humility and generosity that strengthen communities and spread peace.',
    image: causeImg2.src,
  },
  {
    id: 3,
    title: 'Community Upliftment',
    description:
      'We support underprivileged families through education, healthcare and social welfare, addressing the barriers that hold people back and opening real routes to a better future.',
    image: causeImg3.src,
  },
  {
    id: 4,
    title: 'Child Education',
    description:
      'Every child deserves the chance to learn, whatever their background. We remove the barriers — fees, materials, distance — and give children the confidence and skills to shape their own future.',
    image: causeImg4.src,
  },
  {
    id: 5,
    title: 'The Path of Sufism',
    description:
      'The essence of Sufism is love, peace, humility and service. It teaches us to rise above difference and meet every person with compassion, patience and purity of heart.',
    image: causeImg5.src,
  },
];
