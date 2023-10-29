import './globals.scss';
import type { Metadata, NextPage } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Next13NProgress } from 'nextjs13-progress';
import { ModalProvider } from '@/components/providers/modal-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Golden Age Minecraft',
  description: 'The forum for the golden age of Minecraft.'
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className} dir='ltr'>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem storageKey='golden-age-minecraft-theme'>
            <Next13NProgress color='#10B981' startPosition={0.3} stopDelayMs={200} height={3} showOnShallow options={{ showSpinner: false }} />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
