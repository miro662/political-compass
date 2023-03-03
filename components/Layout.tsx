import { APP_NAME } from "@/lib/consts";
import Head from "next/head";
import { PropsWithChildren } from "react";
import { Poppins, Vollkorn } from "next/font/google";
import Link from "next/link";

const sansFont = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"],
  variable: "--sans-font",
});

const serifFont = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--serif-font",
});

function Header() {
  return (
    <header>
      <Link href="/">
        <div className="mb-8 py-6 text-center font-serif text-4xl font-semibold tracking-wide md:text-3xl lg:text-4xl">
          {APP_NAME.toLowerCase()}
        </div>
      </Link>
    </header>
  );
}

function Footer() {
  return (
    <footer className="p-2 text-center font-serif text-sm">
      made with ❤️ by miro662
    </footer>
  );
}

export default function Layout({
  title,
  children,
}: PropsWithChildren<{ title?: string }>) {
  const pageTitle = title !== undefined ? `${title} - ${APP_NAME}` : APP_NAME;
  return (
    <main className={`${sansFont.variable} ${serifFont.variable}`}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="mx-auto flex h-screen max-w-3xl flex-col justify-between px-4 font-sans">
        <Header />
        <div className="mb-auto">{children}</div>
        <Footer />
      </div>
    </main>
  );
}
