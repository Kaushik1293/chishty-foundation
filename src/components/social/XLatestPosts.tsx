'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import PrimaryButton from '../common/PrimaryButton';
import XPostCard from './XPostCard';
import { IXPost } from '@/src/types/social';

interface XLatestPostsProps {
  posts?: IXPost[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const XBrandIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function XLatestPosts({ posts }: XLatestPostsProps) {
  const displayPosts = posts && posts.length > 0 ? posts.slice(0, 5) : [];

  return (
    <section id="x-feed" className="relative py-20 bg-white overflow-hidden border-t border-[#F1E7DC] scroll-mt-20">
      <div className="container mx-auto px-5 md:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            align="left"
            eyebrow="COMMUNITY & UPDATES"
            title={
              <>
                X <span className="text-dark-yellow">Latest Posts</span>
              </>
            }
            description="Official insights, peace messages, and live humanitarian updates from Chairman Haji Syed Salman Chishty."
            maxWidth="max-w-2xl"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="shrink-0 self-start md:self-end"
          >
            <a
              href="https://x.com/sufimusafir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <PrimaryButton
                text="Follow on X"
                icon={<XBrandIcon />}
              />
            </a>
          </motion.div>
        </div>

        {/* 5-Post Responsive Grid Layout */}
        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* If 5 posts, the first post can span nicely or render 5 balanced cards */}
            {displayPosts.map((post, index) => (
              <div
                key={post.id || index}
                className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <XPostCard post={post} index={index} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-6 bg-[#FCF8F4] rounded-2xl border border-[#F1E7DC] max-w-md mx-auto">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-dark-yellow/10 flex items-center justify-center text-dark-yellow">
              <XBrandIcon />
            </div>
            <h3 className="font-cormorant text-2xl font-bold text-dark-green mb-2">
              No recent posts available
            </h3>
            <p className="font-satoshi text-sm text-gray-500 mb-6">
              Follow our official account on X for real-time announcements and statements.
            </p>
            <a
              href="https://x.com/sufimusafir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <PrimaryButton text="Follow @sufimusafir" icon={<XBrandIcon />} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
