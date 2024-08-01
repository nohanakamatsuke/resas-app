import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "都道府県人口グラフ",
  description: "都道府県ごとの人口構成が取得できるグラフです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const title = metadata.title || '都道府県人口グラフ'
  const description = metadata.description || '都道府県ごとの人口構成が取得できるグラフです'

  return (
    <html lang="en">
      <Head>
      <title>{title as string}</title>
      <meta name="description" content={description as string} />
      </Head>
      <body className={inter.className}>
        <header className="text-3xl p-5">
          <h1>{title as string}</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
