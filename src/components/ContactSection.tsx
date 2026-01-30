'use client';

import { motion } from 'framer-motion';
import { contactContent } from '../content/contact';

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

export function ContactSection() {
  return (
    <motion.section
      id="contato"
      className="px-6 md:px-12 py-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={sectionVariants}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-md"
        variants={itemVariants}
      >
        {contactContent.title}
      </motion.h2>
      <motion.p
        className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10"
        variants={itemVariants}
      >
        {contactContent.description}
      </motion.p>
      <motion.div variants={itemVariants}>
        <a
          href={`mailto:${contactContent.email}`}
          className="inline-block px-8 py-3 rounded-full text-white font-semibold text-lg
          bg-gradient-to-r from-cyan-400 to-purple-500
          shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
        >
          {contactContent.button}
        </a>
      </motion.div>
    </motion.section>
  );
}