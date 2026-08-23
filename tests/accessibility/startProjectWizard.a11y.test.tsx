import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { ThemeProvider } from "@mui/material/styles";
import StartProjectWizard from "@/app/_components/start-project-wizard/StartProjectWizard";
import getRichFxTheme from "@/themes/richFxTheme";

const theme = getRichFxTheme("dark");

describe("StartProjectWizard accessibility", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        addEventListener: jest.fn(),
        addListener: jest.fn(),
        dispatchEvent: jest.fn(),
        matches: false,
        media: query,
        onchange: null,
        removeEventListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  });

  it("has no axe violations when opened", async () => {
    render(
      <ThemeProvider theme={theme}>
        <StartProjectWizard open onClose={jest.fn()} />
      </ThemeProvider>,
    );

    await expect(axe(document.body)).resolves.toHaveNoViolations();
  });
});
