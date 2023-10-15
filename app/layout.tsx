import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Golden Age Minecraft',
  description: 'The forum for the golden age of Minecraft.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem storageKey='golden-age-minecraft-theme'>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
