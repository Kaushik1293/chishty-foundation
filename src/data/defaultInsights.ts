import heroImg from "@/src/assets/images/causes/cause-hero-img.png";
import causeImg1 from "@/src/assets/images/homepage/servicessection/education-img.png";
import causeImg2 from "@/src/assets/images/getinvolvedpage/way-to/volunteer-img.png";
import causeImg3 from "@/src/assets/images/homepage/servicessection/donation-img.png";

export interface DefaultInsight {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  document_url: string | null;
  display_order: number;
  created_at: string;
}

export const defaultInsights: DefaultInsight[] = [
  {
    id: "insight-1",
    title: "Bungalow 786 Newsletter",
    category: "Newsletters",
    description:
      "Sacred Blessings at Bungalow, New York. Special commemorative edition covering international interfaith gatherings and spiritual blessings.",
    image_url: heroImg.src,
    document_url: null,
    display_order: 1,
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "insight-2",
    title: "CLF2026 Canada Newsletter Chishty Foundation",
    category: "Newsletters",
    description:
      "Canada & New York Spiritual Journey. 29,445 km • 8 Days • 3 Continents • 5 Countries. Insights, poetry, and keynotes by Haji Syed Salman Chishty.",
    image_url: causeImg1.src,
    document_url: null,
    display_order: 2,
    created_at: "2026-02-15T00:00:00Z",
  },
  {
    id: "insight-3",
    title: "CLF2026 Media Coverage Chishty Foundation",
    category: "Media Coverage",
    description:
      "Canada Literature Festival 2026 media coverage and press releases celebrating Sufi literature, interfaith harmony, and peace dialogues.",
    image_url: causeImg2.src,
    document_url: null,
    display_order: 3,
    created_at: "2026-01-20T00:00:00Z",
  },
];
