import "./globals.scss";
import type { Metadata, NextPage } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Next13NProgress } from "nextjs13-progress";
import { ModalProvider } from "@/components/providers/modal-provider";
import ContextProvider from "@/components/providers/context-provider";
import { NextAuthSessionProvider } from "@/components/providers/next-auth-session-provider";
import { getServerCurrentUser } from "@/lib/current-user";
import { EdgeStoreProvider } from "@/components/providers/edgestore-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { NotAuthorized } from "@/components/auth/not-authorized";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://goldenageminecraft.net"),
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
  const currentUser = await getServerCurrentUser();
  const session = await getServerSession(authOptions);

  console.log("layout loaded", session, currentUser);

  if (session?.user && !currentUser) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <div className="w-full sm:w-[400px] mx-auto">
          <NotAuthorized />
        </div>
      </div>
    );
  }

  return (
    <ContextProvider initalValue={{ currentUser, deletedThread: { id: null }, mobileUserSettingsNavOpen: false }}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} dir="ltr">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="golden-age-minecraft-theme">
            <NextAuthSessionProvider>
              <EdgeStoreProvider>
                <Next13NProgress color="#10B981" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow options={{ showSpinner: false }} />
                <ModalProvider />
                {children}
              </EdgeStoreProvider>
            </NextAuthSessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ContextProvider>
  );
};

export default RootLayout;
