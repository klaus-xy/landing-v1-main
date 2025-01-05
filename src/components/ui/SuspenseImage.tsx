"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@/components/ui/Skeleton";

const SuspenseImage = (props: ImageProps) => {
  const { src, width, height, alt, className, ...rest } = props;
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Image
        src={!loading ? src : ""}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={!loading ? className : "hidden"}
        onLoadingComplete={() => setLoading(false)}
        {...rest}
      />

      {loading && (
        <Skeleton
          style={{ width: width, height: height }}
          className={`rounded-xl ${className}`}
        />
      )}
    </>
  );
};

export default SuspenseImage;
