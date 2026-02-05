"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { parseFocusMode, FOCUS_CONFIGS, type FocusMode, type FocusConfig } from "@/lib/focus-config";

export function useFocus(): { mode: FocusMode; config: FocusConfig } {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const mode = parseFocusMode(searchParams.get("focus"));
    return { mode, config: FOCUS_CONFIGS[mode] };
  }, [searchParams]);
}
