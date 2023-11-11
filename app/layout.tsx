import "./globals.scss";
import type { Metadata, NextPage } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Next13NProgress } from "nextjs13-progress";
import { ModalProvider } from "@/components/providers/modal-provider";
import ContextProvider from "@/components/providers/context-provider";
import { NextAuthSessionProvider } from "@/components/providers/next-auth-session-provider";
import { getServerCurrentUser } from "@/lib/current-user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://goldenageminecraft-app.vercel.app"),
  title: "Golden Age Minecraft",
  description: "The forum for the golden age of Minecraft.",
  openGraph: {
    title: "Golden Age Minecraft",
    description: "The forum for the golden age of Minecraft."
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: NextPage<RootLayoutProps> = async ({ children }) => {
  const cUser = await getServerCurrentUser();

  return (
    <ContextProvider initalValue={{ currentUser: cUser, deletedThread: { id: null } }}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} dir="ltr">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="golden-age-minecraft-theme">
            <NextAuthSessionProvider>
              <Next13NProgress color="#10B981" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow options={{ showSpinner: false }} />
              <ModalProvider />
              {children}
            </NextAuthSessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ContextProvider>
  );
};

export default RootLayout;
