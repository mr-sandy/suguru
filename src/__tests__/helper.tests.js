import {
  coordinateSetIncludes,
  initialiseCells,
  selectCells,
} from "../helpers";

describe("when checking if coordinates exist in a set", () => {
  it("should return true if they do", () => {
    const coordinateSet = [
      [0, 1],
      [0, 2],
      [1, 2],
    ];
    expect(coordinateSetIncludes(coordinateSet, [0, 2])).toEqual(true);
  });

  it("should return false if they do", () => {
    const coordinateSet = [
      [0, 1],
      [0, 2],
      [1, 2],
    ];
    expect(coordinateSetIncludes(coordinateSet, [1, 0])).toEqual(false);
  });

  it("should return false if the set is empty", () => {
    const coordinateSet = [];
    expect(coordinateSetIncludes(coordinateSet, [1, 0])).toEqual(false);
  });
});

describe("when selecting a pair of cells", () => {
  const currentCells = [
    [
      { value: null, bounds: ["left", "top"] },
      { value: null, bounds: ["top"] },
      { value: null, bounds: ["top", "right"] },
    ],
    [
      { value: null, bounds: ["left"] },
      { value: null, bounds: [] },
      { value: null, bounds: ["right"] },
    ],
    [
      { value: null, bounds: ["bottom", "left"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["bottom", "right"] },
    ],
  ];
  const selectedCoordinates = [
    [0, 1],
    [1, 1],
  ];

  const expected = [
    [
      { value: null, bounds: ["left", "top"] },
      { value: null, bounds: ["top", "left", "right"] },
      { value: null, bounds: ["top", "right"] },
    ],
    [
      { value: null, bounds: ["left"] },
      { value: null, bounds: ["bottom", "left", "right"] },
      { value: null, bounds: ["right"] },
    ],
    [
      { value: null, bounds: ["bottom", "left"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["bottom", "right"] },
    ],
  ];

  const result = selectCells(currentCells, selectedCoordinates);

  it("select", () => {
    expect(result).toEqual(expected);
  });
});
