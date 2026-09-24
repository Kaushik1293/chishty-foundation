import { IInstagramPost } from '@/src/types/social';
import { CACHE_REVALIDATE_SECONDS, getFromCache, saveToCache } from './cache';

import langarImg from '@/src/assets/images/homepage/servicessection/donation-img.png';
import sufiRangImg from '@/src/assets/images/homepage/eventsection/event-4.png';
import reliefImg from '@/src/assets/images/getinvolvedpage/way-to/dontate-img.png';
import eduImg from '@/src/assets/images/homepage/servicessection/education-img.png';
import womenImg from '@/src/assets/images/homepage/servicessection/women-img.png';

const INSTAGRAM_CACHE_KEY = 'instagram_posts';
const INSTAGRAM_ACCOUNT = 'chishtyfoundation';

export const fallbackInstagramPosts: IInstagramPost[] = [
  {
    id: 'ig_post_1',
    caption: '"Love Towards All, Malice Towards None." Daily Langar Khana service at Dargah Ajmer Sharif — serving warm, nutritious meals to thousands of devotees, pilgrims and local families with unconditional love. 🍲✨ #ChishtyFoundation #AjmerSharif #Langar #SufiTradition #ServiceToHumanity',
    media_type: 'IMAGE',
    media_url: langarImg.src,
    permalink: `https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    like_count: 486,
    comments_count: 24,
  },
  {
    id: 'ig_post_2',
    caption: 'Highlights from the 17th International Sufi Rang Festival organized by Chishty Foundation. Sacred Calligraphy, spiritual poetry, and interfaith dialogue uniting renowned artists & scholars from 40+ countries in Ajmer Sharif. 🎨🕊️ #SufiRangFestival #AjmerSharif #SacredCalligraphy #PeaceAndUnity',
    media_type: 'CAROUSEL_ALBUM',
    media_url: sufiRangImg.src,
    permalink: `https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`,
    timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    like_count: 642,
    comments_count: 53,
  },
  {
    id: 'ig_post_3',
    caption: 'Chishty Foundation on ground: Winter Warmth Drive distributing heavy blankets, warm essentials, and healthcare kits to underserved families across rural villages of Rajasthan. Healing lives through compassion. 🩺❤️ #HumanitarianAid #ChishtyCare #Ajmer #CommunityDevelopment',
    media_type: 'IMAGE',
    media_url: reliefImg.src,
    permalink: `https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`,
    timestamp: new Date(Date.now() - 29 * 60 * 60 * 1000).toISOString(),
    like_count: 539,
    comments_count: 31,
  },
  {
    id: 'ig_post_4',
    caption: 'Youth Mentorship & Value-Based Education Workshop organized at Chishty Foundation Educational Center. Equipping the next generation of changemakers with ethical leadership and compassion. 📚🌱 #YouthLeadership #EducationForAll #ChishtyFoundation',
    media_type: 'IMAGE',
    media_url: eduImg.src,
    permalink: `https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`,
    timestamp: new Date(Date.now() - 49 * 60 * 60 * 1000).toISOString(),
    like_count: 715,
    comments_count: 46,
  },
  {
    id: 'ig_post_5',
    caption: 'Vocational training & skill development workshop at Chishty Foundation Women Empowerment Center. Providing women with tailoring, artisanal craft tools, and economic self-reliance. 🧵🪡 #WomenEmpowerment #SkillDevelopment #ChishtyFoundation #Ajmer',
    media_type: 'IMAGE',
    media_url: womenImg.src,
    permalink: `https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`,
    timestamp: new Date(Date.now() - 74 * 60 * 60 * 1000).toISOString(),
    like_count: 890,
    comments_count: 67,
  },
];

/**
 * Fetch latest 5 posts from Instagram Official Graph API with 5-hour caching and robust error resilience.
 */
export async function fetchInstagramLatestPosts(forceRefresh: boolean = false): Promise<{ posts: IInstagramPost[]; source: 'api' | 'cache' | 'fallback' }> {
  // 1. Check in-memory cache
  const cached = getFromCache<IInstagramPost>(INSTAGRAM_CACHE_KEY);
  if (!forceRefresh && cached && cached.isFresh && cached.data.length > 0) {
    return { posts: cached.data.slice(0, 5), source: 'cache' };
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID || 'me';

  if (!accessToken) {
    // If no access token configured, save fallback to cache and return
    saveToCache(INSTAGRAM_CACHE_KEY, fallbackInstagramPosts);
    return { posts: fallbackInstagramPosts.slice(0, 5), source: 'fallback' };
  }

  try {
    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
    const baseUrl = userId === 'me'
      ? `https://graph.instagram.com/v21.0/me/media`
      : `https://graph.facebook.com/v21.0/${userId}/media`;

    const url = `${baseUrl}?fields=${fields}&limit=10&access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(url, {
      next: { revalidate: CACHE_REVALIDATE_SECONDS },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`[Instagram API] Failed with status ${response.status}: ${response.statusText}`);
      if (cached && cached.data.length > 0) {
        return { posts: cached.data.slice(0, 5), source: 'cache' };
      }
      return { posts: fallbackInstagramPosts.slice(0, 5), source: 'fallback' };
    }

    const json = await response.json();
    if (!json || !Array.isArray(json.data) || json.data.length === 0) {
      if (cached && cached.data.length > 0) {
        return { posts: cached.data.slice(0, 5), source: 'cache' };
      }
      return { posts: fallbackInstagramPosts.slice(0, 5), source: 'fallback' };
    }

    const fetchedPosts: IInstagramPost[] = json.data.map((item: any) => ({
      id: String(item.id),
      caption: item.caption || '',
      media_type: item.media_type || 'IMAGE',
      media_url: item.media_url || item.thumbnail_url || '',
      thumbnail_url: item.thumbnail_url || item.media_url,
      permalink: item.permalink || `https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`,
      timestamp: item.timestamp || new Date().toISOString(),
    })).filter((p: IInstagramPost) => Boolean(p.media_url));

    const finalPosts = fetchedPosts.length > 0 ? fetchedPosts.slice(0, 5) : fallbackInstagramPosts.slice(0, 5);
    saveToCache(INSTAGRAM_CACHE_KEY, finalPosts);

    return { posts: finalPosts, source: 'api' };
  } catch (error: any) {
    console.warn('[Instagram API] Network or parsing error:', error?.message || error);
    if (cached && cached.data.length > 0) {
      return { posts: cached.data.slice(0, 5), source: 'cache' };
    }
    return { posts: fallbackInstagramPosts.slice(0, 5), source: 'fallback' };
  }
}
