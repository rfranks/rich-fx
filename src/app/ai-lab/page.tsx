import type { Metadata } from "next";
import AILabPageClient from "./AILabPageClient";
import { portfolioApps } from "@/consts/richFx";
import { getPortfolioAppRouteContract } from "@/utils/portfolio/routeContracts";

const aiLabRoute = getPortfolioAppRouteContract(portfolioApps, "aiLab");

export const metadata: Metadata = {
  title: aiLabRoute.metadataTitle,
  description: aiLabRoute.metadataDescription,
};

export default function AILabPage() {
  return <AILabPageClient />;
}
