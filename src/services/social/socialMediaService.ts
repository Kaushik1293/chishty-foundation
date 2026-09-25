import { IInstagramPost, IXPost } from '@/src/types/social';
import { fetchInstagramLatestPosts } from './instagram';
import { fetchXLatestPosts } from './x';

export async function getLatestInstagramPosts(): Promise<IInstagramPost[]> {
  try {
    const result = await fetchInstagramLatestPosts();
    return result.posts;
  } catch (error) {
    console.error('Error in getLatestInstagramPosts:', error);
    return [];
  }
}

export async function getLatestXPosts(): Promise<IXPost[]> {
  try {
    const result = await fetchXLatestPosts();
    return result.posts;
  } catch (error) {
    console.error('Error in getLatestXPosts:', error);
    return [];
  }
}
