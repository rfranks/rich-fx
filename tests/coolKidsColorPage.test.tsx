import { fireEvent, render, screen, within } from "@testing-library/react";
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

function expectAssetImage(container: HTMLElement, filename: string) {
  expect(
    container.querySelector(`img[src$="clipart_assets/${filename}"]`),
  ).toBeInTheDocument();
}

describe("/coolkidscolor landing page", () => {
  it("renders the contest hierarchy and required entry messaging", () => {
    const { container } = render(<CoolKidsColorPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /#coolkidscolor 2026 coloring contest/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /contest flow/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: /print it, color it, snap it, post it, tag it/i,
      }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByText(/#adultswelcome/i).length).toBeGreaterThan(1);
    expect(screen.getByText(/contest now open!/i)).toBeVisible();
    expect(
      screen.getByText(
        /start with the official contest page, color it in your own style/i,
      ),
    ).toBeVisible();
    expect(
      screen.getByText(/there will be 5 winners and nearly \$500 in prizes/i),
    ).toBeVisible();
    expect(screen.getAllByText(/open & print contest page/i).length).toBe(3);
    expect(screen.getAllByText(/download contest page/i).length).toBe(2);
    expect(
      screen.getByRole("link", {
        name: /open and print the official #coolkidscolor contest page pdf from the hero preview/i,
      }),
    ).toHaveAttribute(
      "href",
      "/assets/coolkidscolor/coolkidscolor-2026-entry-sheet.pdf",
    );
    expect(screen.getAllByText(/download complete contest pack/i).length).toBe(
      1,
    );
    expect(screen.getAllByText(/read official contest rules/i).length).toBe(2);
    expect(
      screen.getByText(/tag richfx \+ include #coolkidscolor/i),
    ).toBeVisible();
    const requiredAlert = screen.getByRole("alert");

    expect(requiredAlert).toBeVisible();
    expect(
      within(requiredAlert).getByTestId("EmojiObjectsOutlinedIcon"),
    ).toBeInTheDocument();
    expect(screen.getByText(/both are required for entry/i)).toBeVisible();
    expect(screen.getByText(/3 grand prize winners/i)).toBeVisible();
    expect(screen.getByText(/2 runner-up winners/i)).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /5 winners total\. nearly \$500 in prizes/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/^what you can win$/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("RedeemOutlinedIcon")).toBeInTheDocument();
    expectAssetImage(container, "personalized_coloring_book.png");
    expectAssetImage(container, "video_clapperboard.png");
    expect(
      screen.getByRole("link", { name: /^coloring book$/i }),
    ).toHaveAttribute(
      "href",
      "https://www.etsy.com/listing/4563805859/personalized-coloring-book-from-your",
    );
    expect(screen.getByRole("link", { name: /^own movie$/i })).toHaveAttribute(
      "href",
      "https://www.etsy.com/listing/4561500288/custom-ai-artwork-rendering-turn-your",
    );
    expect(screen.getByText("$497.91")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /remember the dates/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: /labor day to christmas day/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId("EventAvailableOutlinedIcon"),
    ).toBeInTheDocument();
    expectAssetImage(container, "calendar_sep7.png");
    expectAssetImage(container, "pumpkin_autumn_leaves.png");
    expectAssetImage(container, "christmas_tree.png");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /how to win/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: /you do not have to be perfect to win/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId("WorkspacePremiumOutlinedIcon"),
    ).toBeInTheDocument();
    expectAssetImage(container, "how_to_win_star_icon.png");
    expectAssetImage(container, "how_to_win_palette_icon.png");
    expectAssetImage(container, "how_to_win_magnifier_icon.png");
    expect(screen.getByText("September 7, 2026")).toBeVisible();
    expect(screen.getByText("November 27, 2026")).toBeVisible();
    expect(screen.getByText("December 25, 2026")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /simple rules, clear entries, fair judging/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/^cool things to know$/i),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("FactCheckOutlinedIcon")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /download \/ print center/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: /everything a grown-up needs, right where it should be/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /everything a grown-up needs, right where it should be/i,
      ),
    ).toBeVisible();
    expect(
      screen.getByTestId("DownloadForOfflineOutlinedIcon"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/likes and popularity do not decide/i),
    ).toBeVisible();
    expectAssetImage(container, "cool_things_gift_icon.png");
    expectAssetImage(container, "cool_things_kids_icon.png");
    expectAssetImage(container, "cool_things_no_duplicate_icon.png");
    expectAssetImage(container, "cool_things_lock_icon.png");
    expect(screen.queryByTestId("InfoOutlinedIcon")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("CheckCircleOutlineIcon"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /questions parents and artists ask first/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/^faq$/i)).not.toBeInTheDocument();
    expect(
      screen.getByTestId("ContactSupportOutlinedIcon"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/building better worlds since 2026/i),
    ).toBeVisible();
    expectAssetImage(container, "header_smiling_star.png");
    expectAssetImage(container, "header_red_pencil.png");
    expectAssetImage(container, "header_smiling_heart.png");
    expectAssetImage(container, "bottom_dragon.png");
    expectAssetImage(container, "bottom_robot.png");
  });

  it("expands one numbered quick-flow chip at a time", () => {
    render(<CoolKidsColorPage />);

    const printStep = screen.getByRole("button", { name: /1\s+print it/i });
    const colorStep = screen.getByRole("button", { name: /2\s+color it/i });
    const printPanel = document.getElementById("contest-step-1-details");
    const colorPanel = document.getElementById("contest-step-2-details");

    expect(printStep).toHaveAttribute("aria-expanded", "false");
    expect(printPanel).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(printStep);

    expect(printStep).toHaveAttribute("aria-expanded", "true");
    expect(printPanel).toHaveAttribute("aria-hidden", "false");
    expect(
      screen.getByText(
        /download or print the official #coolkidscolor contest page/i,
      ),
    ).toBeVisible();

    fireEvent.click(colorStep);

    expect(printStep).toHaveAttribute("aria-expanded", "false");
    expect(colorStep).toHaveAttribute("aria-expanded", "true");
    expect(printPanel).toHaveAttribute("aria-hidden", "true");
    expect(colorPanel).toHaveAttribute("aria-hidden", "false");
    expect(
      screen.getByText(
        /^color it your way\. crayons, colored pencils, fiber-tip pens, gel pens, markers/i,
      ),
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
        name: /^richfx etsy shop$/i,
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
