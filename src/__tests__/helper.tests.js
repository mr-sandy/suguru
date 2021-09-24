import {
  coordinateSetIncludes,
  selectCells,
  getCellGroup
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

describe("when selecting siblings", () => {
  it("should return all cells when there is a single group", () => {
    const cells = [
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
      ]
    ];

    const expected = [
      { value: null, bounds: ["left", "top", "right"] },
      { value: null, bounds: ["top", "left", "right"] },
      { value: null, bounds: ["top", "right", "left"] },
      { value: null, bounds: ["left", "right"] },
      { value: null, bounds: ["bottom", "left", "right"] },
      { value: null, bounds: ["right", "left"] },
      { value: null, bounds: ["bottom", "left"] },
      { value: null, bounds: ["bottom", "top"] },
      { value: null, bounds: ["bottom", "right"] },
    ];

    const result = getCellGroup(cells, [0, 0]);

    expect(result).toEqual(expected);
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

    const expected = [{ value: null, bounds: ["top", "bottom", "left", "right"] }];

    const result = getCellGroup(cells, [1, 1]);

    expect(result).toEqual(expected);

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
      { value: null, bounds: ["left", "right", "bottom"] }
    ];

    const result = getCellGroup(cells, [1, 1]);

    expect(result).toEqual(expected);
  });
});