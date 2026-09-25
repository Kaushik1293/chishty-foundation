'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IXPost } from '@/src/types/social';
import moment from 'moment';
import Image from 'next/image';

interface XPostCardProps {
  post: IXPost;
  index: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function XPostCard({ post, index }: XPostCardProps) {
  const [imgError, setImgError] = useState(false);

  const formattedDate = post.created_at ? moment(post.created_at).format('MMM D, YYYY') : '';
  const postUrl = post.permalink || `https://x.com/${post.author_username || 'sufimusafir'}`;

  const mediaUrl = post.media_urls && post.media_urls.length > 0 ? post.media_urls[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group flex flex-col justify-between bg-white rounded-2xl p-5 border border-[#F1E7DC] hover:border-dark-yellow/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(189,140,59,0.1)] h-full"
    >
      <div>
        {/* Top Header: Author info & X Logo */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Avatar */}
            {post.author_profile_image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-dark-yellow/40 shadow-sm bg-dark-green/10">
                <Image
                  src={post.author_profile_image}
                  alt={post.author_name || 'Author'}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-dark-green text-light-yellow font-cormorant font-bold text-lg flex items-center justify-center shrink-0 border border-dark-yellow/30 shadow-inner">
                CF
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-satoshi font-bold text-sm text-dark-green truncate">
                  {post.author_name || 'Chishty Foundation'}
                </span>
                {/* Gold Checkmark */}
                <svg className="w-3.5 h-3.5 text-dark-yellow shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <span className="font-satoshi text-xs text-gray-400 truncate">
                @{post.author_username || 'sufimusafir'}
              </span>
            </div>
          </div>

          {/* X Brand Icon */}
          <div className="w-7 h-7 rounded-full bg-[#FAF5EE] flex items-center justify-center text-dark-green group-hover:bg-dark-green group-hover:text-white transition-colors duration-300 shrink-0">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        </div>

        {/* Post Text */}
        <p className="font-satoshi text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-4 mb-3.5 whitespace-pre-line group-hover:text-gray-900 transition-colors">
          {post.text}
        </p>

        {/* Media Preview if available */}
        {mediaUrl && !imgError && (
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3.5 bg-[#FAF5EE] border border-[#F5EDE3]">
            <Image
              src={mediaUrl}
              alt="X post attachment"
              fill
              unoptimized
              onError={() => setImgError(true)}
              className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            />
          </div>
        )}
      </div>

      {/* Card Footer: Date, Metrics & Link */}
      <div className="pt-3 border-t border-[#F5EDE3] flex items-center justify-between text-xs text-gray-500">
        <span className="font-satoshi text-[11px] text-gray-400">
          {formattedDate}
        </span>

        {/* Engagement Stats or View Link */}
        <div className="flex items-center gap-3">
          {post.metrics?.likes !== undefined && post.metrics.likes > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
              <svg className="w-3 h-3 fill-rose-500/80" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{post.metrics.likes}</span>
            </span>
          )}

          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-dark-yellow hover:text-dark-green transition-colors group/link text-xs"
          >
            <span>View on X</span>
            <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
