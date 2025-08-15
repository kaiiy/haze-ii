import { useEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
};

const subscribeWindowSizeChange = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const useIsMdOrBelow = () => {
  const [isMdOrBelow, setIsMdOrBelow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMdOrBelow(e.matches);
    // modern browsers
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  return isMdOrBelow;
};

export type { WindowSize };
export { subscribeWindowSizeChange, useIsMdOrBelow };
