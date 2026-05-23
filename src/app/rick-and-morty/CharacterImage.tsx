"use client";

import Image from "next/image";
import { useState } from "react";

interface CharacterImageProps {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function CharacterImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  loading = "lazy",
}: CharacterImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-[radial-gradient(circle_at_center,#bef264_0,#164e63_46%,#111827_78%)]`}
        aria-label={alt}
        role="img"
      >
        <span className="text-4xl font-black text-white drop-shadow">
          {getInitials(alt)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? undefined : loading}
      unoptimized
      onError={() => setHasError(true)}
    />
  );
}
