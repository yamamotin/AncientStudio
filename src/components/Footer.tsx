'use client';

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 text-center text-gray-500 text-sm border-t border-neutral-800 mt-20">
      <p>&copy; {new Date().getFullYear()} AncientStudio. Todos os direitos reservados.</p>
    </footer>
  );
}