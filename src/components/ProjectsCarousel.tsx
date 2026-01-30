'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { projects } from '../content/projects';
import { cn } from '@/lib/utils';

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

export function ProjectsCarousel() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <motion.section
      id="projetos"
      className="px-6 md:px-12 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400 drop-shadow-md"
        variants={itemVariants}
      >
        Projetos Recentes
      </motion.h2>
      <motion.div
        className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-neutral-800 shadow-2xl shadow-neutral-900/20 backdrop-blur-sm"
        variants={itemVariants}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentProject * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div key={index} className="min-w-full flex-shrink-0">
                <div className="relative h-96">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-3xl font-bold text-cyan-400 drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mt-2 text-lg">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevProject}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-neutral-800/70 p-3 rounded-full text-cyan-400 hover:bg-neutral-700 transition shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextProject}
          className="absolute top-1/2 left-auto right-4 transform -translate-y-1/2 bg-neutral-800/70 p-3 rounded-full text-cyan-400 hover:bg-neutral-700 transition shadow-lg backdrop-blur-sm"
        >
          <ChevronRight size={28} />
        </button>
      </motion.div>
    </motion.section>
  );
}