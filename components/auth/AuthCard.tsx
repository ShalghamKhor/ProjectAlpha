import type { ReactNode } from "react";
import Button from "@/components/ui/button";
import Image from "next/image";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="min-h-screen bg-[#fbf5ef] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
          <div className="mb-4">
            <Button href="/" variant="outline" className="inline-flex items-center gap-1">
              ← Back
            </Button>
          </div>

          <div className="mx-auto w-fit rounded-2xl border border-orange-200 bg-[#fff7ed] px-3 py-2">
            <Image
              src="/openbazar-logo.svg"
              alt="openbazar"
              width={220}
              height={90}
              priority
              className="h-auto w-[150px]"
            />
          </div>

          <h1 className="mt-6 text-center text-3xl font-extrabold text-zinc-900">
            {title}
          </h1>
          <p className="mt-1 text-center text-sm text-zinc-500">{subtitle}</p>

          {children}
          {footer}
        </div>
      </div>
    </main>
  );
}
