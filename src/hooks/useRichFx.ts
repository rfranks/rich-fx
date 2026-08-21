"use client";

import * as React from "react";
import { RichFxContext } from "@/consts/providers/richFxProvider";

export function useRichFx() {
  return React.useContext(RichFxContext);
}
