import { START_PROJECT_INITIAL_FORM } from "@/app/_consts/startProjectWizard";
import {
  buildStartProjectEmailBody,
  getStartProjectMinimumDeliveryDate,
} from "@/app/_utils/startProjectWizard";

describe("start project wizard utilities", () => {
  it("requires target delivery dates at least three calendar days out", () => {
    expect(
      getStartProjectMinimumDeliveryDate(new Date("2026-08-23T15:45:00")),
    ).toBe("2026-08-26");
  });

  it("includes the selected project price range in the email body", () => {
    expect(
      buildStartProjectEmailBody({
        ...START_PROJECT_INITIAL_FORM,
        projectType: "holiday-card",
      }),
    ).toContain("Estimated price range: $15.99-$19.99");
  });

  it("includes the artwork project price range in the email body", () => {
    expect(
      buildStartProjectEmailBody({
        ...START_PROJECT_INITIAL_FORM,
        projectType: "artwork",
      }),
    ).toContain("Estimated price range: $49.99-$119.99");
  });
});
