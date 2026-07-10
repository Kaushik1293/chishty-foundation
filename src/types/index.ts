export interface IPartner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
}

export interface IEvent {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  banner_image: string;
  icon: string;
  event_date: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}