import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "../components/navbar/NavBar";
import { Footer } from "../components/footer/Footer";
import { Providers } from "../store/Providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header>
            <NavBar />
          </header>
          <main className="bg-white min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
