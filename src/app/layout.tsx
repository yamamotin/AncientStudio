import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "../public/globals.css";
import { cn } from "@/lib/utils"; // We will create this utility file next

export const metadata: Metadata = {
  title: "AncientStudio | Portfolio",
  description: "Portfolio de um desenvolvedor senior com foco em engenharia e tecnologia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        GeistSans.className
      )}>
        {children}
      </body>
    </html>
  );
}
