'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { aboutContent } from '../content/about';

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

export function AboutSection() {
  return (
    <motion.section
      id="sobre"
      className="px-6 md:px-12 py-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={sectionVariants}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400 drop-shadow-md"
        variants={itemVariants}
      >
        {aboutContent.title}
      </motion.h2>
      <motion.p
        className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
        variants={itemVariants}
      >
        {aboutContent.description}
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link
          href="#contato"
          className="inline-block px-8 py-3 rounded-full text-white font-semibold text-lg
          bg-gradient-to-r from-purple-500 to-cyan-400
          shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
        >
          {aboutContent.button}
        </Link>
      </motion.div>
    </motion.section>
  );
}