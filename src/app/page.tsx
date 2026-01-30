'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code, Zap, BarChart, Network, Atom, Rocket, Cloud, Sparkle, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header'; // Reusing the existing Header component

interface BentoGridItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
}

const bentoItems: BentoGridItem[] = [
  {
    id: 1,
    title: 'Integração de Sistemas',
    description: 'Conectando MCP e diversas APIs para um fluxo de dados unificado.',
    icon: Network,
    className: 'md:col-span-2',
  },
  {
    id: 2,
    title: 'Automação Industrial',
    description: 'Otimização de processos com SAP, RPA e Controle Lógico Programável (CLP).',
    icon: Atom,
    className: 'md:col-span-1',
  },
  {
    id: 3,
    title: 'Análise de Dados',
    description: 'Transformando dados em insights com BI, Data Science, ML e Transformers.',
    icon: BarChart,
    className: 'md:col-span-1',
  },
  {
    id: 4,
    title: 'Desenvolvimento Web & Mobile',
    description: 'Criação de soluções robustas para plataformas web e móveis, com foco em QA.',
    icon: Code,
    className: 'md:col-span-2 row-span-2',
  },
  {
    id: 5,
    title: 'Infraestrutura Cloud',
    description: 'Gerenciamento e otimização de servidores em AWS e Google Cloud.',
    icon: Cloud,
    className: 'md:col-span-1',
  },
  {
    id: 6,
    title: 'DevOps & CI/CD',
    description: 'Implementação de práticas ágeis para entrega contínua e integração.',
    icon: Rocket,
    className: 'md:col-span-1',
  },
];

const projects = [
  {
    title: 'Projeto Potência',
    description: 'Desenvolvimento de um sistema de gerenciamento de energia para otimização de consumo em tempo real.',
    image: 'https://images.unsplash.com/photo-1620712943543-290d24d37d36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Sistema Embarcado',
    description: 'Criação de um sistema embarcado para controle de automação industrial com interface de monitoramento remoto.',
    image: 'https://images.unsplash.com/photo-1567093323088-93466b8994a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Automação Industrial',
    description: 'Implementação de robótica e automação de processos para uma linha de produção, aumentando a eficiência em 40%.',
    image: 'https://images.unsplash.com/photo-1633493725592-2b3c2c9d6b2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

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

export default function PortfolioPage() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0
                      bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <Header />
      <main className="relative z-10 container mx-auto max-w-screen-xl">
        {/* Hero Section */}
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
              Construindo Excelência Digital
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-tight"
              variants={itemVariants}
            >
              Nós Criamos{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-md">
                Produtos Digitais
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Especialista em engenharia de software e soluções tecnológicas,
              pronto para inovar e entregar resultados excepcionais.
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
                Iniciar Seu Projeto
              </Link>
              <Link
                href="#projetos"
                className="px-8 py-3 rounded-full text-gray-300 font-semibold text-lg
                border border-neutral-700 hover:border-cyan-400 hover:text-cyan-400
                transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-400/50"
              >
                Ver Nossos Trabalhos
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Expertise Section (Bento Grid) */}
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

        {/* Projects Carousel Section */}
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

        {/* About Section */}
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
            Sobre Mim
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
            variants={itemVariants}
          >
            Com uma década de experiência, sou um desenvolvedor sênior apaixonado por construir soluções inovadoras. Minha jornada profissional é marcada pela entrega de projetos complexos, otimização de processos e liderança técnica em equipes multidisciplinares. Busco constantemente aprender e aplicar as melhores práticas do mercado para criar produtos digitais que realmente façam a diferença.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="#contato"
              className="inline-block px-8 py-3 rounded-full text-white font-semibold text-lg
              bg-gradient-to-r from-purple-500 to-cyan-400
              shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Conecte-se
            </Link>
          </motion.div>
        </motion.section>

        {/* Contact Section */}
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
            Vamos Construir Algo Incrível Juntos!
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10"
            variants={itemVariants}
          >
            Interessado em colaboração ou apenas quer trocar uma ideia?
            Entre em contato.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a
              href="mailto:seu.email@example.com" // Replace with actual email
              className="inline-block px-8 py-3 rounded-full text-white font-semibold text-lg
              bg-gradient-to-r from-cyan-400 to-purple-500
              shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
            >
              Enviar E-mail
            </a>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="px-6 md:px-12 py-10 text-center text-gray-500 text-sm border-t border-neutral-800 mt-20">
          <p>&copy; {new Date().getFullYear()} AncientStudio. Todos os direitos reservados.</p>
        </footer>
      </main>
    </div>
  );
}