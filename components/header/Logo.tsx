import Link from "next/link";
import Image from "next/image";
import type { LogoType, LogoSize } from "@/configs/header";

const sizeMap: Record<LogoSize, { container: string; sizes: string }> = {
  sm: { container: "w-[140px] h-[56px]", sizes: "(max-width: 768px) 100px, 140px" },
  md: { container: "w-[200px] h-[80px]", sizes: "(max-width: 768px) 120px, 200px" },
  lg: { container: "w-[260px] h-[100px]", sizes: "(max-width: 768px) 160px, 260px" },
};

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
  size?: LogoSize;
};

export default function Logo({ type, name, imageSrc, size = "md" }: LogoProps) {
  const { container, sizes } = sizeMap[size];

  if (type === "image") {
    return (
      <Link href="/" aria-label={name} className={`relative ${container} block`}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes={sizes}
            className="object-contain p-2"
            priority
          />
        )}
      </Link>
    );
  }

  if (type === "image-text") {
    return (
      <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold">
        {imageSrc && (
          <Image src={imageSrc} alt={name} width={28} height={28} className="rounded-lg" priority />
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
