import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import CoolKidsColorPage from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage";

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

describe("/coolkidscolor accessibility", () => {
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

  it("has no axe violations", async () => {
    render(<CoolKidsColorPage />);

    await expect(axe(document.body)).resolves.toHaveNoViolations();
  });
});
