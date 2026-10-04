import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Martín Rotelli | Frontend & Full Stack Developer (~/martinrot)",
  description:
    "CV y Portfolio interactivo de Martín Rotelli. Especializado en React 19, Next.js, TypeScript y Tailwind CSS con físicas 2D y modo de destrucción interactivo.",
  keywords: [
    "Martín Rotelli",
    "Frontend Developer",
    "Full Stack Developer",
    "React 19",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "CV Interactivo"
  ],
  authors: [{ name: "Martín Rotelli", url: "https://github.com/martinrot" }],
  openGraph: {
    title: "Martín Rotelli | Frontend & Full Stack Developer",
    description:
      "CV y Portfolio interactivo con modo de destrucción en tiempo real. Construido con Next.js, React 19 y Tailwind CSS.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-zinc-950 text-zinc-50">{children}</body>
    </html>
  );
}
