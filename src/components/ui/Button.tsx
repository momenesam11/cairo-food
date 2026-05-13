import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
};

export function Button({ href, children, variant = "primary" }: Props) {
  return <Link className={`btn btn-${variant}`} href={href}>{children}</Link>;
}
