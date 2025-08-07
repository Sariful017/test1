import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Video Player',
  description: 'A professional video player built with Next.js and Vidstack.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Set the base background to black to match your theme. */}
      <body className={`${inter.className} bg-black`}>{children}</body>
    </html>
  );
}
