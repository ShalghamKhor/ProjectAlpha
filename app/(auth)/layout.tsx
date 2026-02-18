import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "ShareLocal",
  description: "Free & Rental Marketplace",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
