import { render, screen } from "@testing-library/react";
import DownloadAction from "@/app/coolkidscolor/_components/download-action/DownloadAction";
import CoolKidsColorPage from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage";
import type { DownloadAsset } from "@/app/coolkidscolor/_types/coolKidsColor";

jest.mock("next/image", () => {
  const React = jest.requireActual<typeof import("react")>("react");

  function MockNextImage(
    props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean },
  ) {
    const { priority, ...imageProps } = props;
    void priority;

    return React.createElement("img", imageProps);
  }

  return {
    __esModule: true,
    default: MockNextImage,
  };
});

jest.mock("next/link", () => {
  const React = jest.requireActual<typeof import("react")>("react");

  function MockNextLink({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
    return React.createElement("a", { href, ...props }, children);
  }

  return {
    __esModule: true,
    default: MockNextLink,
  };
});

describe("/coolkidscolor landing page", () => {
  it("renders the contest hierarchy and required entry messaging", () => {
    render(<CoolKidsColorPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /#coolkidscolor 2026 coloring contest/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/#adultswelcome/i).length).toBeGreaterThan(1);
    expect(screen.getByText(/open now/i)).toBeVisible();
    expect(screen.getAllByText(/open & print contest page/i).length).toBe(3);
    expect(screen.getAllByText(/download contest page/i).length).toBe(2);
    expect(screen.getAllByText(/download complete contest pack/i).length).toBe(
      1,
    );
    expect(screen.getAllByText(/read official contest rules/i).length).toBe(2);
    expect(
      screen.getByText(/tag richfx \+ include #coolkidscolor/i),
    ).toBeVisible();
    expect(screen.getByText(/both are required for entry/i)).toBeVisible();
    expect(screen.getByText(/3 grand prize winners/i)).toBeVisible();
    expect(screen.getByText(/2 runner-up winners/i)).toBeVisible();
    expect(screen.getByText("$497.91")).toBeVisible();
    expect(screen.getByText("September 7, 2026")).toBeVisible();
    expect(screen.getByText("November 27, 2026")).toBeVisible();
    expect(screen.getByText("December 25, 2026")).toBeVisible();
    expect(
      screen.getByText(/likes and popularity do not decide/i),
    ).toBeVisible();
    expect(
      screen.getByText(/building better worlds since 2026/i),
    ).toBeVisible();
  });

  it("uses base-path-safe links for available contest assets", () => {
    const { container } = render(<CoolKidsColorPage />);

    expect(
      screen.getAllByRole("link", { name: /open and print the official/i })[0],
    ).toHaveAttribute(
      "href",
      "/assets/coolkidscolor/coolkidscolor-2026-entry-sheet.pdf",
    );
    expect(
      screen.getAllByRole("link", {
        name: /download the official #coolkidscolor contest page pdf/i,
      })[0],
    ).toHaveAttribute("download", "coolkidscolor-2026-entry-sheet.pdf");
    expect(
      container.querySelector("a[href*='coolkidscolor-2026-entry-sheet.pdf']"),
    ).toBeInTheDocument();
    expect(
      container.querySelector("a[href*='coolkidscolor-2026-contest-pack.zip']"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        "a[href*='coolkidscolor-2026-official-rules.pdf']",
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector("a[href*='coolkidscolor-2026-quick-start.pdf']"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        "a[href*='coolkidscolor-2026-offline-flyer.pdf']",
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        "a[href*='coolkidscolor-2026-takeaway-card-5x7.pdf']",
      ),
    ).toBeInTheDocument();
  });

  it("keeps missing asset actions disabled instead of creating broken links", () => {
    const unavailableAsset: DownloadAsset = {
      id: "missing",
      title: "Missing",
      unavailableLabel: "Missing file not installed",
      filename: "missing.pdf",
      format: "PDF",
      purpose: "Unavailable test asset.",
      eyebrow: "Test",
      available: false,
      actions: [
        {
          id: "download",
          label: "Download Missing File",
          kind: "download",
          icon: "download",
          ariaLabel: "Download missing file",
        },
      ],
    };

    const { container } = render(
      <DownloadAction
        action={unavailableAsset.actions[0]}
        asset={unavailableAsset}
      />,
    );

    expect(
      screen.getByRole("button", { name: /download missing file/i }),
    ).toBeDisabled();
    expect(container.querySelector("a[href*='missing.pdf']")).toBeNull();
  });

  it("links to the RichFX Etsy shop and renders real asset previews", () => {
    render(<CoolKidsColorPage />);

    expect(
      screen.getByRole("link", {
        name: /see personalized coloring books on etsy/i,
      }),
    ).toHaveAttribute("href", "https://www.etsy.com/shop/RichFX");
    expect(
      screen.getAllByAltText(
        /preview of the official printable #coolkidscolor contest page/i,
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByAltText(
        /preview of the printable #coolkidscolor offline flyer/i,
      ).length,
    ).toBeGreaterThan(0);
  });

  it("does not say #adultswelcome is required for entry", () => {
    const { container } = render(<CoolKidsColorPage />);

    expect(container.textContent).not.toMatch(
      /#adultswelcome.{0,80}required|required.{0,80}#adultswelcome/i,
    );
  });
});
