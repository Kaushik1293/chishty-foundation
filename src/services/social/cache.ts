interface CacheEntry<T> {
  data: T[];
  timestamp: number;
}

// 5 hours in milliseconds
export const CACHE_TTL_MS = 5 * 60 * 60 * 1000;
// 5 hours in seconds for Next.js revalidate
export const CACHE_REVALIDATE_SECONDS = 5 * 60 * 60; // 18000

// In-memory cache store preserved on globalThis for persistence
const CACHE_VERSION = 'v5_';

const globalSocialCache = globalThis as unknown as {
  __socialCache?: Record<string, CacheEntry<unknown>>;
};

if (!globalSocialCache.__socialCache) {
  globalSocialCache.__socialCache = {};
}

export function getFromCache<T>(key: string): { data: T[]; isFresh: boolean } | null {
  const versionedKey = CACHE_VERSION + key;
  const entry = globalSocialCache.__socialCache?.[versionedKey] as CacheEntry<T> | undefined;
  if (!entry) return null;

  const now = Date.now();
  const isFresh = now - entry.timestamp < CACHE_TTL_MS;
  return { data: entry.data, isFresh };
}

export function saveToCache<T>(key: string, data: T[]): void {
  if (!globalSocialCache.__socialCache) {
    globalSocialCache.__socialCache = {};
  }
  const versionedKey = CACHE_VERSION + key;
  globalSocialCache.__socialCache[versionedKey] = {
    data,
    timestamp: Date.now(),
  };
}

export function getCacheAge(key: string): number | null {
  const entry = globalSocialCache.__socialCache?.[key];
  if (!entry) return null;
  return Date.now() - entry.timestamp;
}
