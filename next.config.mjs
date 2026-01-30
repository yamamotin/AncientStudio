/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Nota: Lembre-se de configurar o `basePath` com o nome do seu repositório para o deploy no GitHub Pages.
  // Exemplo: basePath: '/nome-do-repositorio',
  basePath: '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
