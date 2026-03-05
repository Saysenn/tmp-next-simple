import Link from "next/link";
import Image from "next/image";
import type { LogoType } from "@/configs/header";

function LogoIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="text-indigo-600 dark:text-indigo-400"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.15" />
      <path
        d="M9 16 L16 9 L23 16 L16 23 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = {
  type: LogoType;
  name: string;
  imageSrc?: string;
};

export default function Logo({ type, name, imageSrc }: LogoProps) {
  if (type === "image-text") {
    return (
      <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold">
        {imageSrc && (
          <Image src={imageSrc} alt={name} width={28} height={28} className="rounded-lg" />
        )}
        <span>{name}</span>
      </Link>
    );
  }

  if (type === "icon-text") {
    return (
      <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold">
        <LogoIcon />
        <span>{name}</span>
      </Link>
    );
  }

  return (
    <Link href="/" className="font-bold text-xl tracking-tight">
      {name}
    </Link>
  );
}
