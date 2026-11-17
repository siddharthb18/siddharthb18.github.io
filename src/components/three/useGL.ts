"use client";

import { useEffect, useState } from "react";

/** true once we know the browser can run WebGL2; null while unknown (server render and first paint). */
export function useGL() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      setOk(!!document.createElement("canvas").getContext("webgl2"));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

export function useStill() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const on = () => setStill(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return still;
}
