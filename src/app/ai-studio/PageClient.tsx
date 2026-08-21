"use client";

import { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterControls from "./_components/filter-controls/FilterControls";
import HeaderBar from "./_components/header-bar/HeaderBar";
import Lab from "./_components/lab/Lab";
import Pager from "./_components/pager/Pager";
import { useKeyboardNavigation } from "./_hooks/useKeyboardNavigation";
import { usePageState } from "./_hooks/usePageState";
import { GLOBAL_COLOR_MODE_STORAGE_KEY } from "@/consts/colorMode";
import { getAiStudioItems } from "@/consts/richFx";
import { useColorModePreference } from "@/hooks/useColorModePreference";
import { useRichFx } from "@/hooks/useRichFx";
import getRichFxTheme from "@/themes/richFxTheme";
import { useDocumentTitle } from "@/hooks/window/useDocumentTitle";
import { getPortfolioAppRouteContract } from "@/utils/portfolio/routeContracts";

export default function PageClient() {
  const richFx = useRichFx();
  const { portfolioApps } = richFx;
  const route = getPortfolioAppRouteContract(portfolioApps, "aiStudio");
  const aiStudioItems = useMemo(() => getAiStudioItems(richFx), [richFx]);
  const {
    clearFilters,
    currentIndex,
    currentItem,
    filterOptions,
    filteredLabItems,
    handleNext,
    handlePrevious,
    handleSelectLab,
    labItems,
    selectedFilters,
    setFilterValue,
  } = usePageState(aiStudioItems);
  const { mode, toggleColorMode, isReady } = useColorModePreference({
    storageKey: GLOBAL_COLOR_MODE_STORAGE_KEY,
  });
  const theme = useMemo(() => getRichFxTheme(mode), [mode]);
  const { setDocumentTitle } = useDocumentTitle();
  useKeyboardNavigation({
    onNext: handleNext,
    onPrevious: handlePrevious,
  });

  useEffect(() => {
    setDocumentTitle(route.documentTitle);
  }, [route.documentTitle, setDocumentTitle]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!isReady || !labItems.length) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box
        sx={(theme) => ({
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          "--bg-base": theme.fabric.background.base,
          "--bg-layer": theme.fabric.background.layer,
          "--bg-radial-primary": theme.fabric.background.radialPrimary,
          "--bg-radial-secondary": theme.fabric.background.radialSecondary,
          "--surface-1": theme.fabric.surface.level1,
          "--surface-2": theme.fabric.surface.level2,
          "--surface-3": theme.fabric.surface.level3,
          "--surface-border": theme.fabric.surface.border,
          "--surface-border-strong": theme.fabric.surface.borderStrong,
          "--shadow-soft": theme.fabric.surface.shadowSoft,
          "--shadow-tight": theme.fabric.surface.shadowTight,
          "--inner-glow": theme.fabric.surface.innerGlow,
          backgroundImage: [
            "radial-gradient(50rem 30rem at 8% -10%, var(--bg-radial-primary), transparent 68%)",
            "radial-gradient(42rem 26rem at 96% -12%, var(--bg-radial-secondary), transparent 72%)",
            "linear-gradient(180deg, var(--bg-layer), var(--bg-base))",
          ].join(","),
        })}
      >
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            bgcolor: "transparent",
            borderRadius: 0,
          }}
        >
          <Box
            sx={{
              px: { xs: 1.5, md: 2.5 },
              py: 1.25,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <HeaderBar
              description={
                route.appBarSubtitle ?? route.metadataDescription ?? ""
              }
              isSmallScreen={isSmallScreen}
              mode={mode}
              onToggleColorMode={toggleColorMode}
              title={route.documentTitle}
            />

            <FilterControls
              filterOptions={filterOptions}
              selectedFilters={selectedFilters}
              totalCount={labItems.length}
              visibleCount={filteredLabItems.length}
              onClearFilters={clearFilters}
              onFilterChange={setFilterValue}
            />
          </Box>

          <Box
            sx={{
              px: { xs: 1.5, md: 2.5 },
              py: 1.5,
              flex: 1,
              minHeight: 0,
              minWidth: 0,
              maxWidth: "100%",
              overflow: "hidden",
              display: "flex",
              backgroundColor: "transparent",
            }}
          >
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                maxWidth: "100%",
                display: "flex",
                overflow: "hidden",
                pr: 0.5,
                backgroundColor: "transparent",
                "& > *": {
                  flex: 1,
                  minHeight: 0,
                  minWidth: 0,
                  maxWidth: "100%",
                },
              }}
            >
              {currentItem ? (
                <Lab key={currentItem.slug} {...currentItem.props} />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 2,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No items match the selected medium/style/series filters.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Pager
            currentIndex={currentIndex}
            items={filteredLabItems}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSelectLab={handleSelectLab}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
