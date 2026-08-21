import { buildCondensedChronologyIndices } from "@/utils/chronology/chronologyUtils";

describe("chronologyUtils", () => {
  it("keeps pinned storyboard-like steps visible in condensed chips", () => {
    expect(
      buildCondensedChronologyIndices({
        labelCount: 5,
        currentIndex: 0,
        pinnedIndices: [2],
      }),
    ).toEqual([0, 1, 2, 4]);
  });
});
