'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { bentoItems } from '../content/expertise';

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

export function ExpertiseSection() {
  return (
    <motion.section
      id="servicos-e-expertise"
      className="px-6 md:px-12 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-md"
        variants={itemVariants}
      >
        Minha Expertise
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
        {bentoItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              className={cn(
                'relative group overflow-hidden bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl shadow-xl shadow-neutral-900/10 transition-all duration-300 backdrop-blur-sm',
                item.className
              )}
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col h-full">
                <Icon className="text-cyan-400 mb-4 h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 flex-grow">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}