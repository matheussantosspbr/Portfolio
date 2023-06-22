import { Html, Head, Main, NextScript } from "next/document";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import ButtonTop from "./layouts/ButtonTop";
import { usePathname } from "next/navigation";

export default function Document() {
  const pathname = usePathname();
  return (
    <Html lang="pt-BR">
      <Head />
      <head>
        <script src="https://kit.fontawesome.com/427ab6f06b.js" crossOrigin="anonymous"></script>
        <link rel="shortcut icon" href="/logo.avif" type="image/x-icon"/>
      </head>
      <body className="bg-[#0B0F13]">
        {pathname == "/links" ? (
          <>
            <Main />
            <NextScript />
          </>
        ) : (
          <>
            <Header />
            <Main />
            <NextScript />
            <ButtonTop />
            <Footer />
          </>
        )}
      </body>
    </Html>
  );
}