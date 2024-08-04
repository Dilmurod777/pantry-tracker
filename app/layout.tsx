import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Pantry Tracker",
    description: "Pantry Tracker App",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-main-background h-full w-full flex-grow`}>
        <AppRouterCacheProvider options={{key: 'css'}}>
                {children}
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
