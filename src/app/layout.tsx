import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/css/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = "Matheus Santos — Desenvolvedor Full Stack";
const description =
  "Portfólio de Matheus Santos, desenvolvedor Full Stack. Veja projetos, estudos de caso, experiência profissional e as tecnologias que utilizo.";

export const metadata: Metadata = {
  metadataBase: new URL("https://matheussantos.tech"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Matheus Santos",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} bg-setup-gray-900 h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans text-gray-200"
      >
        {children}
      </body>
    </html>
  );
}
