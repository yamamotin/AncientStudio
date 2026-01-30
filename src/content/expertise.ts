import { BarChart, Network, Atom, Code, Cloud, Rocket } from 'lucide-react';

export interface BentoGridItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
}

export const bentoItems: BentoGridItem[] = [
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
