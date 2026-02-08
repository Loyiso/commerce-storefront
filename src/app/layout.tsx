import "./globals.css";
import TopNav from "@/components/TopNav";
import { CartProvider } from "@/components/CartProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <CartProvider>
          <TopNav />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}