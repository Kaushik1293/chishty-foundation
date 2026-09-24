import { NextResponse } from 'next/server';
import { fetchXLatestPosts } from '@/src/services/social/x';
import { CACHE_REVALIDATE_SECONDS } from '@/src/services/social/cache';

export const revalidate = 18000; // 5 hours (18000 seconds)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';
    const result = await fetchXLatestPosts(forceRefresh);
    return NextResponse.json(
      {
        success: true,
        data: result.posts,
        source: result.source,
        last_updated: Date.now(),
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to fetch X posts',
      },
      { status: 500 }
    );
  }
}
