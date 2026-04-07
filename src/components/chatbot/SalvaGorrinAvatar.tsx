import Image from "next/image";

interface SalvaGorrinAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

const sizeClasses = {
  sm: "h-7 w-7",
  md: "h-10 w-10",
  lg: "h-11 w-11",
  xl: "h-14 w-14",
};

export default function SalvaGorrinAvatar({
  size = "md",
  className = "",
  imageClassName = "",
  priority = false,
}: SalvaGorrinAvatarProps) {
  return (
    <span
      className={[
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        "border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),rgba(255,255,255,0.04))]",
        "shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md",
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      <Image
        src="/salva-gorrin.png"
        alt="Salva Gorrín"
        fill
        priority={priority}
        sizes={
          size === "sm"
            ? "28px"
            : size === "md"
            ? "40px"
            : size === "lg"
            ? "44px"
            : "56px"
        }
        className={[
          "object-contain p-[2px]",
          imageClassName,
        ].join(" ")}
      />
    </span>
  );
}
