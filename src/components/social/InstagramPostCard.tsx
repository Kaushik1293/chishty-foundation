'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IInstagramPost } from '@/src/types/social';
import moment from 'moment';
import Image from 'next/image';

interface InstagramPostCardProps {
  post: IInstagramPost;
  index: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function InstagramPostCard({ post, index }: InstagramPostCardProps) {
  const [imgError, setImgError] = useState(false);

  const displayImage = imgError
    ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
    : post.media_url || post.thumbnail_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';

  const formattedDate = post.timestamp ? moment(post.timestamp).format('MMM D, YYYY') : '';

  return (
    <motion.a
      href={post.permalink || 'https://www.instagram.com/chishtyfoundation/'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View Instagram post: ${post.caption ? post.caption.slice(0, 50) : 'Chishty Foundation'}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#F1E7DC] hover:border-dark-yellow/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(189,140,59,0.12)] h-full"
    >
      {/* Media Container */}
      <div className="relative aspect-square w-full bg-[#FAF5EE] overflow-hidden">
        <Image
          src={displayImage}
          alt={post.caption ? post.caption.slice(0, 60) : 'Chishty Foundation Instagram Post'}
          fill
          unoptimized
          onError={() => setImgError(true)}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/90 via-dark-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

        {/* Media Type Badge (Top-Right) */}
        <div className="absolute top-3 right-3 z-10">
          {post.media_type === 'VIDEO' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-green/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide shadow-sm border border-white/10">
              <svg className="w-3 h-3 fill-current text-light-yellow" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Reel
            </span>
          )}
          {post.media_type === 'CAROUSEL_ALBUM' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-green/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide shadow-sm border border-white/10">
              <svg className="w-3 h-3 fill-none stroke-current stroke-2 text-light-yellow" viewBox="0 0 24 24">
                <rect x="3" y="3" width="14" height="14" rx="2" />
                <path d="M7 7h14v14" />
              </svg>
              Album
            </span>
          )}
        </div>

        {/* Instagram Icon Badge (Top-Left) */}
        <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-dark-green group-hover:bg-dark-yellow group-hover:text-white transition-colors duration-300">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>

        {/* Floating View on Instagram on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-dark-green text-xs font-semibold tracking-wide shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View on Instagram
            <svg className="w-3.5 h-3.5 text-dark-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4.5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-dark-green tracking-wide">
              @chishtyfoundation
            </span>
            {formattedDate && (
              <span className="text-[11px] text-gray-400 font-satoshi">
                {formattedDate}
              </span>
            )}
          </div>

          {/* Caption text */}
          <p className="text-xs text-gray-600 font-satoshi leading-relaxed line-clamp-2 group-hover:text-gray-900 transition-colors">
            {post.caption || 'Chishty Foundation - Serving humanity with love and compassion at Ajmer Sharif.'}
          </p>
        </div>

        {/* Footer info / engagement if available */}
        <div className="mt-3 pt-3 border-t border-[#F5EDE3] flex items-center justify-between text-[11px] text-gray-500">
          <span className="inline-flex items-center gap-1 text-dark-yellow font-medium group-hover:translate-x-0.5 transition-transform">
            <span>Open post</span>
            <svg className="w-3 h-3" viewBox="0 0 14 10" fill="none">
              <path d="M8.5 1L12.5 5M12.5 5L8.5 9M12.5 5H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          {post.like_count !== undefined && (
            <span className="inline-flex items-center gap-1 text-gray-400">
              <svg className="w-3 h-3 fill-rose-500/80" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{post.like_count}</span>
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}
