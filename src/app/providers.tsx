"use client";

import { useEffect } from "react";
import MouseFollower from "mouse-follower";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import NextSnapPixel from "next-snapchat-pixel";
import { RatesProvider } from "@/context/conversion-rates";

MouseFollower.registerGSAP(gsap);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    new MouseFollower({
      className: "mf-cursor p-cursor",
    });
    // Error coming from here...
    // Probably because of invalid Snap Pixel ID

    // Fix: Catch the error and log it to the console
    const snapPixelId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;
    if (typeof window !== "undefined" && snapPixelId) {
      try {
        NextSnapPixel.init(snapPixelId);

        // Track if init is successful
        NextSnapPixel.track("PAGE_VIEW");
      } catch (error) {
        console.error("SNAP PIXEL INITIALIZATION FAILED. REASON: " + error);
      }
    }
  }, []);

  return <RatesProvider>{children}</RatesProvider>;
}
