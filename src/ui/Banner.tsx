import React from "react";

interface BannerProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  overlay?: boolean;
  overlayColor?: string;
  className?: string;
  useContainer?: boolean;
  backgroundPosition?: string;
  style?: React.CSSProperties;
}

export const Banner = ({
  children,
  backgroundImage,
  backgroundColor,
  overlay = false,
  overlayColor = "bg-black/60",
  className = "",
  useContainer = true,
  backgroundPosition = "center",
  style,
}: BannerProps) => {
  return (
    <section
      className={`relative w-full ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundColor ?? undefined,
        backgroundSize: "cover",
        backgroundPosition,
        ...style,
      }}
    >
      {overlay && <div className={`absolute inset-0 ${overlayColor}`} />}
      <div className="relative z-10">
        {useContainer ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        ) : (
          children
        )}
      </div>
    </section>
  );
};
