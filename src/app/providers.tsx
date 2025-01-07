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
// gsap.registerPlugin(ScrollTrigger); // Probable cause of the hydration error.

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // FIX:
    // Register scroll trigger only after the DOM is available. This will trigger warnings in components that use ScrollTrigger on their first render. Components should ensure scroll trigger is registered before usage.
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Initialize mouse follower
      new MouseFollower({
        className: "mf-cursor p-cursor",
      });

      // Initialize Snap pxel
      const snapPixelId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;
      if (snapPixelId) {
        try {
          NextSnapPixel.init(snapPixelId);
          NextSnapPixel.track("PAGE_VIEW");
        } catch (error) {
          console.error("Snap Pixel initialization failed:", error);
        }
      }
    }
  }, []);

  return <RatesProvider>{children}</RatesProvider>;
}
