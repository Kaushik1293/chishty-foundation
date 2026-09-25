export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export interface IInstagramPost {
  id: string;
  caption?: string;
  media_type: InstagramMediaType;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export interface IXPostMetrics {
  likes?: number;
  retweets?: number;
  replies?: number;
  quotes?: number;
  impressions?: number;
}

export interface IXPost {
  id: string;
  text: string;
  created_at: string;
  author_name: string;
  author_username: string;
  author_profile_image?: string;
  permalink: string;
  media_urls?: string[];
  media_type?: 'photo' | 'video' | 'animated_gif';
  metrics?: IXPostMetrics;
}

export interface ISocialFeedResult<T> {
  data: T[];
  last_updated: number;
  source: 'api' | 'cache' | 'fallback';
  error?: string;
}
