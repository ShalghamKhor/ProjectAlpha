import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
  "text-sm font-semibold rounded-full px-4 py-2 transition-transform duration-200 ease-out transform hover:scale-105 active:scale-95";

  const variants: Record<Variant, string> = {
    primary:
      "bg-black text-white hover:bg-orange-500",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline:
      "border border-orange-500 text-orange-600 hover:bg-orange-50",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
