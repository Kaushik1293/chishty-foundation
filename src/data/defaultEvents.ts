import event1 from '@/src/assets/images/homepage/eventsection/event-1.png';
import event2 from '@/src/assets/images/homepage/eventsection/event-2.png';
import event3 from '@/src/assets/images/homepage/eventsection/event-3.png';
import event4 from '@/src/assets/images/homepage/eventsection/event-4.png';

import ursIcon from '@/src/assets/images/homepage/eventsection/urs.svg';
import musicIcon from '@/src/assets/images/homepage/eventsection/music.svg';
import foodIcon from '@/src/assets/images/homepage/eventsection/food.svg';
import iftariIcon from '@/src/assets/images/homepage/eventsection/iftari.svg';

import { IEvent } from '@/src/types';

export const defaultEvents: IEvent[] = [
  {
    id: 1,
    title: 'Urs Mubarak, Khwaja Gharib Nawaz (R.A.)',
    slug: 'urs-mubarak-khwaja-gharib-nawaz',
    short_description:
      'The annual Urs at Ajmer Sharif brings millions together in prayer, remembrance, and the spirit of universal love. Chishty Foundation hosts dialogues, langar, and interfaith gatherings throughout the sacred days.',
    description:
      'The annual Urs at Ajmer Sharif brings millions together in prayer, remembrance, and the spirit of universal love. Chishty Foundation hosts dialogues, langar, and interfaith gatherings throughout the sacred days.',
    banner_image: event1.src,
    icon: ursIcon.src,
    event_date: 'DEC 2026',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'International Sufi Rang Festival',
    slug: 'international-sufi-rang-festival',
    short_description:
      'Our signature annual gathering celebrating Sufi arts, calligraphy, poetry and music, with artists and scholars from over 40 countries uniting under the banner of peace and harmony.',
    description:
      'Our signature annual gathering celebrating Sufi arts, calligraphy, poetry and music, with artists and scholars from over 40 countries uniting under the banner of peace and harmony.',
    banner_image: event2.src,
    icon: musicIcon.src,
    event_date: '2026',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Langar & Food Distribution',
    slug: 'langar-food-distribution',
    short_description:
      'Serving hot meals and dry ration kits to pilgrims, daily-wage families, and those in need — continuing the centuries-old tradition of open hospitality at Ajmer Sharif.',
    description:
      'Serving hot meals and dry ration kits to pilgrims, daily-wage families, and those in need — continuing the centuries-old tradition of open hospitality at Ajmer Sharif.',
    banner_image: event3.src,
    icon: foodIcon.src,
    event_date: 'ONGOING',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Ramadan Iftari Distribution',
    slug: 'ramadan-iftari-distribution',
    short_description:
      'Community iftar meals and comprehensive ration packages distributed to underprivileged families throughout the holy month of Ramadan.',
    description:
      'Community iftar meals and comprehensive ration packages distributed to underprivileged families throughout the holy month of Ramadan.',
    banner_image: event4.src,
    icon: iftariIcon.src,
    event_date: 'FEB 2027',
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
