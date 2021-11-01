import {
  coordinateSetIncludes,
  selectCells,
  findSiblings,
  incrementCellValue,
} from "../helpers";

function cellComparer(cellA, cellB) {
  const boundsA = cellA.bounds.sort().join();
  const boundsB = cellB.bounds.sort().join();

  if (boundsA > boundsB) return 1;
  if (boundsA < boundsB) return -1;

  return 0;
}

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
      { value: null, bounds: ["left", "top", "right"] },
      { value: null, bounds: ["top", "left", "right"] },
      { value: null, bounds: ["top", "right", "left"] },
    ],
    [
      { value: null, bounds: ["left", "right"] },
      { value: null, bounds: ["bottom", "left", "right"] },
      { value: null, bounds: ["right", "left"] },
    ],
    [
      { value: null, bounds: ["bottom", "left"] },
      { value: null, bounds: ["bottom", "top"] },
      { value: null, bounds: ["bottom", "right"] },
    ],
  ];

  const result = selectCells(currentCells, selectedCoordinates);

  it("select", () => {
    expect(result).toEqual(expected);
  });
});

describe("when finding siblings", () => {
  it("should return all cells when there is a single group", () => {
    const cells = [
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

    const expected = [
      { value: null, bounds: ["left", "top"] },
      { value: null, bounds: ["top"] },
      { value: null, bounds: ["top", "right"] },
      { value: null, bounds: ["left"] },
      { value: null, bounds: [] },
      { value: null, bounds: ["right"] },
      { value: null, bounds: ["bottom", "left"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["bottom", "right"] },
    ];

    const result = findSiblings(cells, [0, 0]);

    expect(result.sort(cellComparer)).toEqual(expected.sort(cellComparer));
  });

  it("should return the only cell in a group of one", () => {
    const cells = [
      [
        { value: null, bounds: ["left", "top"] },
        { value: null, bounds: ["top", "bottom"] },
        { value: null, bounds: ["top", "right"] },
      ],
      [
        { value: null, bounds: ["left", "right"] },
        { value: null, bounds: ["top", "bottom", "left", "right"] },
        { value: null, bounds: ["left", "right"] },
      ],
      [
        { value: null, bounds: ["bottom", "left"] },
        { value: null, bounds: ["top", "bottom"] },
        { value: null, bounds: ["bottom", "right"] },
      ],
    ];

    const expected = [
      { value: null, bounds: ["top", "bottom", "left", "right"] },
    ];

    const result = findSiblings(cells, [1, 1]);

    expect(result.sort(cellComparer)).toEqual(expected.sort(cellComparer));
  });

  it("should return the only cell in a group of one v2", () => {
    const cells = [
      [
        { value: null, bounds: ["left", "top", "bottom", "right"] },
        { value: null, bounds: ["top", "left"] },
        { value: null, bounds: ["top", "right"] },
      ],
      [
        { value: null, bounds: ["left", "top"] },
        { value: null, bounds: [] },
        { value: null, bounds: ["right"] },
      ],
      [
        { value: null, bounds: ["bottom", "left"] },
        { value: null, bounds: ["bottom"] },
        { value: null, bounds: ["bottom", "right"] },
      ],
    ];

    const expected = [
      { value: null, bounds: ["left", "top", "bottom", "right"] },
    ];

    const result = findSiblings(cells, [0, 0]);

    expect(result.sort(cellComparer)).toEqual(expected.sort(cellComparer));
  });

  it("should return both cells in a group of two", () => {
    const cells = [
      [
        { value: null, bounds: ["left", "top"] },
        { value: null, bounds: ["top", "bottom"] },
        { value: null, bounds: ["top", "right"] },
      ],
      [
        { value: null, bounds: ["left", "right"] },
        { value: null, bounds: ["top", "left", "right"] },
        { value: null, bounds: ["left", "right"] },
      ],
      [
        { value: null, bounds: ["bottom", "left", "right"] },
        { value: null, bounds: ["left", "right", "bottom"] },
        { value: null, bounds: ["bottom", "left", "right"] },
      ],
    ];

    const expected = [
      { value: null, bounds: ["top", "left", "right"] },
      { value: null, bounds: ["left", "right", "bottom"] },
    ];

    const result = findSiblings(cells, [1, 1]);

    expect(result.sort(cellComparer)).toEqual(expected.sort(cellComparer));
  });

  it("should return both cells in a non-linear group", () => {
    const cells = [
      [
        { value: null, bounds: ["left", "top"] },
        { value: null, bounds: ["top", "bottom"] },
        { value: null, bounds: ["top", "right"] },
      ],
      [
        { value: null, bounds: ["left", "right"] },
        { value: null, bounds: ["top", "left", "right"] },
        { value: null, bounds: ["left", "right"] },
      ],
      [
        { value: null, bounds: ["bottom", "left", "right"] },
        { value: null, bounds: ["left", "right", "bottom"] },
        { value: null, bounds: ["bottom", "left", "right"] },
      ],
    ];

    const expected = [
      { value: null, bounds: ["left", "top"] },
      { value: null, bounds: ["top", "bottom"] },
      { value: null, bounds: ["top", "right"] },
      { value: null, bounds: ["left", "right"] },
      { value: null, bounds: ["left", "right"] },
      { value: null, bounds: ["bottom", "left", "right"] },
      { value: null, bounds: ["bottom", "left", "right"] },
    ];

    const result = findSiblings(cells, [0, 0]);

    expect(result.sort(cellComparer)).toEqual(expected.sort(cellComparer));
  });
});

describe("when incrementing a cell's value", () => {
  it("should set the value as 1 when there is no value set", () => {
    const cells = [
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

    const expected = [
      [
        { value: 1, bounds: ["left", "top"] },
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

    const result = incrementCellValue(cells, [0, 0]);

    expect(result).toEqual(expected);
  });

  it("should set the value as the next incremental value when the cell already has a value set", () => {
    const cells = [
      [
        { value: 1, bounds: ["left", "top"] },
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

    const expected = [
      [
        { value: 2, bounds: ["left", "top"] },
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

    const result = incrementCellValue(cells, [0, 0]);

    expect(result).toEqual(expected);
  });

  it("should set the value as null when incrementing from the maximum value for the cell", () => {
    const cells = [
      [
        { value: 1, bounds: ["left", "top", "right", "bottom"] },
        { value: null, bounds: ["top", "left"] },
        { value: null, bounds: ["top", "right"] },
      ],
      [
        { value: null, bounds: ["left", "top"] },
        { value: null, bounds: [] },
        { value: null, bounds: ["right"] },
      ],
      [
        { value: null, bounds: ["bottom", "left"] },
        { value: null, bounds: ["bottom"] },
        { value: null, bounds: ["bottom", "right"] },
      ],
    ];

    const expected = [
      [
        { value: null, bounds: ["left", "top", "right", "bottom"] },
        { value: null, bounds: ["top", "left"] },
        { value: null, bounds: ["top", "right"] },
      ],
      [
        { value: null, bounds: ["left", "top"] },
        { value: null, bounds: [] },
        { value: null, bounds: ["right"] },
      ],
      [
        { value: null, bounds: ["bottom", "left"] },
        { value: null, bounds: ["bottom"] },
        { value: null, bounds: ["bottom", "right"] },
      ],
    ];

    const result = incrementCellValue(cells, [0, 0]);

    expect(result).toEqual(expected);
  });

  it("should skip over any values that are set on siblings", () => {
    const cells = [
      [
        { value: 1, bounds: ["left", "top", "right"] },
        { value: null, bounds: ["top", "left"] },
        { value: null, bounds: ["top", "right"] },
      ],
      [
        { value: 2, bounds: ["left", "right"] },
        { value: null, bounds: ["left"] },
        { value: null, bounds: ["right"] },
      ],
      [
        { value: null, bounds: ["bottom", "left", "right"] },
        { value: null, bounds: ["bottom", "left"] },
        { value: null, bounds: ["bottom", "right"] },
      ],
    ];

    const expected = [
      [
        { value: 3, bounds: ["left", "top", "right"] },
        { value: null, bounds: ["top", "left"] },
        { value: null, bounds: ["top", "right"] },
      ],
      [
        { value: 2, bounds: ["left", "right"] },
        { value: null, bounds: ["left"] },
        { value: null, bounds: ["right"] },
      ],
      [
        { value: null, bounds: ["bottom", "left", "right"] },
        { value: null, bounds: ["bottom", "left"] },
        { value: null, bounds: ["bottom", "right"] },
      ],
    ];

    const result = incrementCellValue(cells, [0, 0]);

    expect(result).toEqual(expected);
  });
});
