import type { Metadata } from "next";
import PageClient from "./PageClient";
import { portfolioApps } from "@/consts/richFx";
import { getPortfolioAppRouteContract } from "@/utils/portfolio/routeContracts";

const route = getPortfolioAppRouteContract(portfolioApps, "aiStudio");

export const metadata: Metadata = {
  title: route.metadataTitle,
  description: route.metadataDescription,
};

export default function Page() {
  return <PageClient />;
}
