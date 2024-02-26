import { Inter } from "next/font/google";
import "./global.js";
import StoreProvider from "./StoreProvider.js";
// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout