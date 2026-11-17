"use client";

import dynamic from "next/dynamic";
import { useGL } from "./useGL";

const Stage = dynamic(() => import("./Stage"), { ssr: false });

export default function GL() {
  return useGL() ? <Stage /> : null;
}
