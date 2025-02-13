import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

export const metadata = {
  title: "Proxenio",
  description: "Proxenio Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
