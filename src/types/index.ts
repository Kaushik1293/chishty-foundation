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

export interface IInsight {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  document_url: string | null;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IMediaItem {
  id: string;
  image_url: string | null;
  title: string | null;
  alt_text: string | null;
  caption: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export * from './social';