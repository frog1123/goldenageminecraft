import "./globals.scss";
import type { Metadata, NextPage } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Next13NProgress } from "nextjs13-progress";
import { ModalProvider } from "@/components/providers/modal-provider";
import ContextProvider from "@/components/providers/context-provider";
import { db } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://goldenageminecraft-app.vercel.app"),
  title: "Golden Age Minecraft",
  description: "The forum for the golden age of Minecraft.",
  openGraph: {
    title: "Golden Age Minecraft",
    description: "The forum for the golden age of Minecraft."
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: NextPage<RootLayoutProps> = async ({ children }) => {
  const clerkUser = await currentUser();

  let user;
  try {
    if (clerkUser) {
      user = await db.user.findUnique({
        where: {
          userId: clerkUser.id
        },
        select: {
          id: true
        }
      });
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <ContextProvider initalValue={{ currentUser: { clerkId: clerkUser?.id ? clerkUser.id : null, id: user ? user.id : null }, deletedThread: { id: null } }}>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className} dir="ltr">
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="golden-age-minecraft-theme">
              <Next13NProgress color="#10B981" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow options={{ showSpinner: false }} />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ContextProvider>
  );
};

export default RootLayout;
