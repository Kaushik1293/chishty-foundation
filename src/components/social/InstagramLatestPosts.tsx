'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import PrimaryButton from '../common/PrimaryButton';
import InstagramPostCard from './InstagramPostCard';
import { IInstagramPost } from '@/src/types/social';
import greenDivider from '../../assets/images/homepage/vectors/common/green-divider.png';

interface InstagramLatestPostsProps {
  posts?: IInstagramPost[];
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

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function InstagramLatestPosts({ posts }: InstagramLatestPostsProps) {
  const displayPosts = posts && posts.length > 0 ? posts.slice(0, 5) : [];

  return (
    <section id="instagram-feed" className="relative py-20 bg-[#FCF8F4] overflow-hidden border-t border-[#F1E7DC] scroll-mt-20">
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            align="left"
            eyebrow="FOLLOW OUR JOURNEY"
            title={
              <>
                Instagram <span className="text-dark-yellow">Latest Posts</span>
              </>
            }
            description="Discover our humanitarian missions, youth empowerment, interfaith dialogues, and live moments from Dargah Ajmer Sharif."
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
              href="https://www.instagram.com/chishtyfoundation/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <PrimaryButton
                text="View on Instagram"
                icon={<InstagramIcon />}
              />
            </a>
          </motion.div>
        </div>

        {/* Posts Grid (5 Columns on Large Screens) */}
        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {displayPosts.map((post, index) => (
              <InstagramPostCard key={post.id || index} post={post} index={index} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-6 bg-white rounded-2xl border border-[#F1E7DC] max-w-md mx-auto">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-dark-yellow/10 flex items-center justify-center text-dark-yellow">
              <InstagramIcon />
            </div>
            <h3 className="font-cormorant text-2xl font-bold text-dark-green mb-2">
              No recent posts available
            </h3>
            <p className="font-satoshi text-sm text-gray-500 mb-6">
              Connect directly with our Instagram account for the latest visual updates.
            </p>
            <a
              href="https://www.instagram.com/chishtyfoundation/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <PrimaryButton text="Follow @chishtyfoundation" icon={<InstagramIcon />} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
