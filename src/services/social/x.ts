import { IXPost } from '@/src/types/social';
import { CACHE_REVALIDATE_SECONDS, getFromCache, saveToCache } from './cache';

import dargahImg from '@/src/assets/images/causes/cause-hero-img.png';
import interfaithImg from '@/src/assets/images/homepage/eventsection/event-2.png';
import spreadWordImg from '@/src/assets/images/getinvolvedpage/way-to/spread-word-img.png';
import healthcareImg from '@/src/assets/images/homepage/servicessection/healthcare-img.png';
import event1Img from '@/src/assets/images/homepage/eventsection/event-1.png';
import salmanChishtyHeroImg from '@/src/assets/images/aboutpage/herosection/about-hero-img.png';

const X_CACHE_KEY = 'x_posts';
const DEFAULT_X_USERNAME = process.env.X_USERNAME || 'sufimusafir';
const X_AUTHOR_NAME = 'Haji Syed Salman Chishty';

export const fallbackXPosts: IXPost[] = [
  {
    id: 'x_post_1',
    text: '"Be like the Sun for grace & mercy, be like the River for generosity, be like the Earth for hospitality."\n\nTimeless wisdom of Hazrat Khawaja Gharib Nawaz (R.A.) illuminating our path towards universal brotherhood and selfless service from Dargah Ajmer Sharif. 🕊️✨\n\n#AjmerSharif #SufiWisdom #ChishtyFoundation #Peace',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    author_name: X_AUTHOR_NAME,
    author_username: DEFAULT_X_USERNAME,
    author_profile_image: salmanChishtyHeroImg.src,
    permalink: `https://x.com/${DEFAULT_X_USERNAME}`,
    media_urls: [dargahImg.src],
    media_type: 'photo',
    metrics: {
      likes: 384,
      retweets: 92,
      replies: 28,
    },
  },
  {
    id: 'x_post_2',
    text: 'Privileged to address the International Interfaith & Spiritual Diplomacy Forum. In an interconnected world, empathy, mutual respect, and spiritual dialogue remain the most enduring bridge for peace across civilizations. 🌍🤝\n\n#InterfaithDialogue #SpiritualDiplomacy #AjmerSharif #WorldPeace',
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    author_name: X_AUTHOR_NAME,
    author_username: DEFAULT_X_USERNAME,
    author_profile_image: salmanChishtyHeroImg.src,
    permalink: `https://x.com/${DEFAULT_X_USERNAME}`,
    media_urls: [interfaithImg.src],
    media_type: 'photo',
    metrics: {
      likes: 495,
      retweets: 138,
      replies: 42,
    },
  },
  {
    id: 'x_post_3',
    text: 'Under Chishty Foundation\'s Eco-Sufism and Environmental Care initiative, our team completed the installation of solar-powered clean drinking water facilities and tree planting drives in drought-hit rural communities. 🌱💧\n\n#EcoSufism #WaterForLife #ClimateAction #ChishtyFoundation',
    created_at: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString(),
    author_name: X_AUTHOR_NAME,
    author_username: DEFAULT_X_USERNAME,
    author_profile_image: salmanChishtyHeroImg.src,
    permalink: `https://x.com/${DEFAULT_X_USERNAME}`,
    media_urls: [spreadWordImg.src],
    media_type: 'photo',
    metrics: {
      likes: 310,
      retweets: 76,
      replies: 19,
    },
  },
  {
    id: 'x_post_4',
    text: 'Free Comprehensive Health Camp conducted by Chishty Foundation in rural Ajmer districts. Over 1,200 villagers received essential medical screenings, vision checkups, and free medicines. Healing through service. 🩺🏥\n\n#ChishtyCare #HealthcareForAll #AjmerSharif #HumanityFirst',
    created_at: new Date(Date.now() - 56 * 60 * 60 * 1000).toISOString(),
    author_name: X_AUTHOR_NAME,
    author_username: DEFAULT_X_USERNAME,
    author_profile_image: salmanChishtyHeroImg.src,
    permalink: `https://x.com/${DEFAULT_X_USERNAME}`,
    media_urls: [healthcareImg.src],
    media_type: 'photo',
    metrics: {
      likes: 430,
      retweets: 104,
      replies: 35,
    },
  },
  {
    id: 'x_post_5',
    text: 'Spiritual assembly and devotional gathering celebrating Sufi heritage and universal love at Ajmer Sharif. Prayers for global peace, unity, and the relief of suffering everywhere. 🙏🕊️\n\n"Love Towards All, Malice Towards None."\n\n#AjmerSharif #SufiGathering #ChishtyFoundation',
    created_at: new Date(Date.now() - 80 * 60 * 60 * 1000).toISOString(),
    author_name: X_AUTHOR_NAME,
    author_username: DEFAULT_X_USERNAME,
    author_profile_image: salmanChishtyHeroImg.src,
    permalink: `https://x.com/${DEFAULT_X_USERNAME}`,
    media_urls: [event1Img.src],
    media_type: 'photo',
    metrics: {
      likes: 612,
      retweets: 175,
      replies: 51,
    },
  },
];

/**
 * Fetch latest 5 posts from X (Twitter) API v2 with 5-hour caching and robust error handling.
 */
export async function fetchXLatestPosts(forceRefresh: boolean = false): Promise<{ posts: IXPost[]; source: 'api' | 'cache' | 'fallback' }> {
  // 1. Check in-memory cache
  const cached = getFromCache<IXPost>(X_CACHE_KEY);
  if (!forceRefresh && cached && cached.isFresh && cached.data.length > 0) {
    return { posts: cached.data.slice(0, 5), source: 'cache' };
  }

  const bearerToken = process.env.X_BEARER_TOKEN;
  const username = process.env.X_USERNAME || DEFAULT_X_USERNAME;
  let userId = process.env.X_USER_ID;

  if (!bearerToken) {
    saveToCache(X_CACHE_KEY, fallbackXPosts);
    return { posts: fallbackXPosts.slice(0, 5), source: 'fallback' };
  }

  try {
    const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Accept': 'application/json',
    };

    let authorName = X_AUTHOR_NAME;
    let authorProfileImage: string | undefined;

    // Look up user ID if not provided
    if (!userId) {
      const userLookupRes = await fetch(`https://api.x.com/2/users/by/username/${username}?user.fields=profile_image_url,name`, {
        headers,
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
      });

      if (userLookupRes.ok) {
        const userData = await userLookupRes.json();
        if (userData?.data?.id) {
          userId = userData.data.id;
          authorName = userData.data.name || authorName;
          authorProfileImage = userData.data.profile_image_url;
        }
      }
    }

    if (!userId) {
      console.warn(`[X API] Could not find user ID for username: ${username}`);
      if (cached && cached.data.length > 0) {
        return { posts: cached.data.slice(0, 5), source: 'cache' };
      }
      return { posts: fallbackXPosts.slice(0, 5), source: 'fallback' };
    }

    // Fetch latest tweets with media and public metrics
    const tweetEndpoint = `https://api.x.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics,entities,attachments&expansions=attachments.media_keys&media.fields=url,preview_image_url,type,width,height`;

    const tweetsRes = await fetch(tweetEndpoint, {
      headers,
      next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });

    if (!tweetsRes.ok) {
      console.warn(`[X API] Failed with status ${tweetsRes.status}: ${tweetsRes.statusText}`);
      if (cached && cached.data.length > 0) {
        return { posts: cached.data.slice(0, 5), source: 'cache' };
      }
      return { posts: fallbackXPosts.slice(0, 5), source: 'fallback' };
    }

    const tweetsJson = await tweetsRes.json();
    if (!tweetsJson || !Array.isArray(tweetsJson.data) || tweetsJson.data.length === 0) {
      if (cached && cached.data.length > 0) {
        return { posts: cached.data.slice(0, 5), source: 'cache' };
      }
      return { posts: fallbackXPosts.slice(0, 5), source: 'fallback' };
    }

    // Build media map
    const mediaMap = new Map<string, { url: string; type: 'photo' | 'video' | 'animated_gif' }>();
    if (Array.isArray(tweetsJson.includes?.media)) {
      for (const m of tweetsJson.includes.media) {
        const mediaUrl = m.url || m.preview_image_url;
        if (mediaUrl) {
          mediaMap.set(m.media_key, { url: mediaUrl, type: m.type || 'photo' });
        }
      }
    }

    const fetchedPosts: IXPost[] = tweetsJson.data.map((item: any) => {
      const mediaKeys: string[] = item.attachments?.media_keys || [];
      const mediaItems = mediaKeys.map((key) => mediaMap.get(key)).filter(Boolean) as { url: string; type: 'photo' | 'video' | 'animated_gif' }[];
      const mediaUrls = mediaItems.map((m) => m.url);
      const mediaType = mediaItems[0]?.type;

      return {
        id: String(item.id),
        text: item.text || '',
        created_at: item.created_at || new Date().toISOString(),
        author_name: authorName,
        author_username: username,
        author_profile_image: authorProfileImage,
        permalink: `https://x.com/${username}/status/${item.id}`,
        media_urls: mediaUrls.length > 0 ? mediaUrls : undefined,
        media_type: mediaType,
        metrics: {
          likes: item.public_metrics?.like_count,
          retweets: item.public_metrics?.retweet_count,
          replies: item.public_metrics?.reply_count,
          quotes: item.public_metrics?.quote_count,
          impressions: item.public_metrics?.impression_count,
        },
      };
    });

    const finalPosts = fetchedPosts.length > 0 ? fetchedPosts.slice(0, 5) : fallbackXPosts.slice(0, 5);
    saveToCache(X_CACHE_KEY, finalPosts);

    return { posts: finalPosts, source: 'api' };
  } catch (error: any) {
    console.warn('[X API] Network or parsing error:', error?.message || error);
    if (cached && cached.data.length > 0) {
      return { posts: cached.data.slice(0, 5), source: 'cache' };
    }
    return { posts: fallbackXPosts.slice(0, 5), source: 'fallback' };
  }
}
