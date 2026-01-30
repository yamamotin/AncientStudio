export interface Project {
  title: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
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
