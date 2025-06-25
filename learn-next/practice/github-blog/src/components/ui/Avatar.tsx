interface AvatarProps {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar({
  src,
  alt,
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.style.display = "none";
          target.parentElement!.style.backgroundColor = "#21262D";
          target.parentElement!.style.display = "flex";
          target.parentElement!.style.justifyContent = "center";
          target.parentElement!.style.alignItems = "center";
          target.parentElement!.style.color = "#c9d1d9";
          target.parentElement!.textContent = alt
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
        }}
      />
    </div>
  );
}
