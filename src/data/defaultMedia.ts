import media1 from "@/src/assets/images/homepage/servicessection/education-img.png";
import media2 from "@/src/assets/images/getinvolvedpage/way-to/volunteer-img.png";
import media3 from "@/src/assets/images/homepage/servicessection/donation-img.png";
import media4 from "@/src/assets/images/getinvolvedpage/way-to/dontate-img.png";
import media5 from "@/src/assets/images/causes/cause-hero-img.png";
import event1 from "@/src/assets/images/homepage/eventsection/event-1.png";
import event2 from "@/src/assets/images/homepage/eventsection/event-2.png";
import event3 from "@/src/assets/images/homepage/eventsection/event-3.png";
import event4 from "@/src/assets/images/homepage/eventsection/event-4.png";
import whatWeDo from "@/src/assets/images/homepage/whatwedosection/what-we-do-img.png";

export interface DefaultMediaItem {
  id: string;
  image_url: string;
  title: string;
  alt_text: string;
  caption: string;
  display_order: number;
  created_at: string;
}

export const defaultMediaItems: DefaultMediaItem[] = [
  {
    id: "media-1",
    image_url: media5.src,
    title: "Ajmer Sharif Dargah Gathering",
    alt_text: "Spiritual gathering and prayers at Ajmer Sharif Dargah",
    caption: "Devotees and international delegates offering prayers for global peace and unity at the Holy Dargah of Hazrat Khwaja Gharib Nawaz.",
    display_order: 1,
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "media-2",
    image_url: media1.src,
    title: "Bab ul Ilm Classroom Session",
    alt_text: "Children studying at Bab ul Ilm educational initiative",
    caption: "Children engaged in active learning at the Bab ul Ilm school, equipped with modern learning resources and mentorship.",
    display_order: 2,
    created_at: "2026-02-20T00:00:00Z",
  },
  {
    id: "media-3",
    image_url: media2.src,
    title: "Community Langar Preparation",
    alt_text: "Volunteers preparing and serving food at daily langar",
    caption: "Volunteers preparing freshly cooked, wholesome meals served daily to thousands without distinction of religion or caste.",
    display_order: 3,
    created_at: "2026-02-10T00:00:00Z",
  },
  {
    id: "media-4",
    image_url: media3.src,
    title: "Healthcare & Free Medical Outreach",
    alt_text: "Free health checkup camp conducted by Chishty Foundation",
    caption: "Free health camp providing essential diagnostics, medicines, and medical consultations for elderly and rural families.",
    display_order: 4,
    created_at: "2026-01-25T00:00:00Z",
  },
  {
    id: "media-5",
    image_url: media4.src,
    title: "Women Empowerment Workshop",
    alt_text: "Women participating in skill development workshop",
    caption: "Vocational training and handicrafts workshop enabling financial independence and skill building for women.",
    display_order: 5,
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "media-6",
    image_url: event1.src,
    title: "Annual Urs Celebrations & Mehfil",
    alt_text: "Sufi musical harmony and cultural heritage gathering",
    caption: "Spiritual discourse, sacred music, and international interfaith delegates during the sacred Urs celebrations.",
    display_order: 6,
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: "media-7",
    image_url: event2.src,
    title: "Global Interfaith Peace Dialogue",
    alt_text: "Leaders uniting for global humanitarian cooperation",
    caption: "Interfaith leaders and diplomats sharing messages of peace, fraternity, and universal harmony.",
    display_order: 7,
    created_at: "2025-12-20T00:00:00Z",
  },
  {
    id: "media-8",
    image_url: whatWeDo.src,
    title: "Chishty Foundation Worldwide Mission",
    alt_text: "Humanitarian relief and community welfare programs",
    caption: "Supporting underprivileged communities through emergency food relief, educational scholarships, and clean drinking water.",
    display_order: 8,
    created_at: "2025-12-10T00:00:00Z",
  },
  {
    id: "media-9",
    image_url: event3.src,
    title: "Community Youth Mentorship Program",
    alt_text: "Youth empowerment and educational workshops",
    caption: "Guiding the youth towards leadership, moral integrity, community service, and higher academic achievement.",
    display_order: 9,
    created_at: "2025-11-28T00:00:00Z",
  },
  {
    id: "media-10",
    image_url: event4.src,
    title: "Cultural Heritage & Sacred Arts",
    alt_text: "Traditional Sufi arts, calligraphy, and poetry",
    caption: "Preserving ancient traditions of Sufi calligraphy, literature, and philosophical manuscripts for future generations.",
    display_order: 10,
    created_at: "2025-11-15T00:00:00Z",
  },
];
