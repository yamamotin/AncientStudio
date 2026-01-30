'use client';

import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { heroContent } from '../content/hero';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HeroSection() {
  return (
    <motion.section
      id="hero"
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 md:px-12 pt-16 md:pt-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={sectionVariants}
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="inline-flex items-center px-4 py-1 border border-neutral-800 rounded-full text-sm text-gray-400 mb-6 backdrop-blur-sm"
          variants={itemVariants}
        >
          <Sparkle className="text-cyan-400 h-4 w-4 mr-2" />
          {heroContent.sparkleText}
        </motion.div>
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-tight"
          variants={itemVariants}
        >
          {heroContent.title.split(' ').slice(0, 2).join(' ')}{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-md">
            {heroContent.title.split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          variants={itemVariants}
        >
          {heroContent.description}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          variants={itemVariants}
        >
          <Link
            href="#contato"
            className="px-8 py-3 rounded-full text-white font-semibold text-lg
            bg-gradient-to-r from-cyan-400 to-purple-500
            shadow-xl hover:shadow-cyan-400/70 transition-all duration-300"
          >
            {heroContent.primaryButton}
          </Link>
          <Link
            href="#projetos"
            className="px-8 py-3 rounded-full text-gray-300 font-semibold text-lg
            border border-neutral-700 hover:border-cyan-400 hover:text-cyan-400
            transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-400/50"
          >
            {heroContent.secondaryButton}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}