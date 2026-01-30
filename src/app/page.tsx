'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  { title: 'Integração', description: 'MCP / APIs' },
  { title: 'Automação', description: 'SAP / RPA / CLP' },
  { title: 'Desenvolvimento', description: 'Web / Mobile / QA' },
];

const infra = [
  { title: 'DevOps' },
  { title: 'Redes e Energia' },
  { title: 'Adm. Servidores', description: 'AWS / Google Cloud' },
];

const analytics = [
    { title: 'Analytics', description: 'BI / Data Science / ML / RNN / Transformers' },
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-gray-900 text-gray-100">
      <main className="w-full max-w-6xl mx-auto space-y-24">
        {/* About Me Section */}
        <section id="sobre" className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Desenvolvedor Senior
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400">
            Especialista em Engenharia de Software e Soluções Tecnológicas
          </p>
        </section>

        {/* Services Section */}
        <section id="servicos">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Serviços
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/50"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-2 text-cyan-400">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Carousel Section */}
        <section id="projetos">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                Projetos
            </h2>
            <div className="relative w-full max-w-4xl mx-auto">
                <div className="overflow-hidden rounded-lg shadow-2xl">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentProject * 100}%)` }}
                >
                    {projects.map((project, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-96 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-6">
                        <h3 className="text-2xl font-bold text-white">
                            {project.title}
                        </h3>
                        <p className="text-gray-300 mt-2">
                            {project.description}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                <button
                onClick={prevProject}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition"
                >
                <ChevronLeft size={24} />
                </button>
                <button
                onClick={nextProject}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition"
                >
                <ChevronRight size={24} />
                </button>
            </div>
        </section>

        {/* Infra Section */}
        <section id="infra">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Infraestrutura
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {infra.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-purple-500/50"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-2 text-purple-400">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-300">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Analytics Section */}
        <section id="analytics">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Analytics
          </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {analytics.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-green-500/50"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-2 text-green-400">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-300">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
