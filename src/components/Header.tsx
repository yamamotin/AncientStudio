'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-black/50 backdrop-blur-md border-b border-neutral-800' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="AncientStudio Logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="text-white text-xl font-bold">AncientStudio</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="#servicos-e-expertise" className="text-gray-400 hover:text-white transition-colors duration-200 text-lg">
            Serviços
          </Link>
          <Link href="#projetos" className="text-gray-400 hover:text-white transition-colors duration-200 text-lg">
            Trabalhos
          </Link>
          <Link href="#sobre" className="text-gray-400 hover:text-white transition-colors duration-200 text-lg">
            Sobre
          </Link>
          <Link href="#contato" className="text-gray-400 hover:text-white transition-colors duration-200 text-lg">
            Contato
          </Link>
        </nav>

        {/* Action Button */}
        <Link href="#contato" className="px-6 py-2 rounded-full text-white font-semibold text-lg
          bg-gradient-to-r from-cyan-400 to-purple-500
          shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hidden md:block">
          Começar
        </Link>
      </div>
    </motion.header>
  );
}