import * as React from "react";
import richFxDataSnapshot, { type RichFx } from "@/consts/richFx";

export const RICH_FX_DATA_LOGGER_NAME = "rich-fx-data";
export const RichFxContext = React.createContext<RichFx>(richFxDataSnapshot);
