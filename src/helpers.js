import { steps } from "./reducer";

function getBounds(x, y, size) {
  const bounds = [];
  if (x === 0) {
    bounds.push("top");
  }
  if (y === 0) {
    bounds.push("left");
  }
  if (x === size - 1) {
    bounds.push("bottom");
  }
  if (y === size - 1) {
    bounds.push("right");
  }
  return bounds;
}

const testCells = [
  [
    {
      value: null,
      bounds: ["top", "bottom", "left", "right", "bottom", "right"],
      candidates: [],
    },
    { value: null, bounds: ["top", "left", "right"], candidates: [] },
    { value: null, bounds: ["top", "bottom", "left"], candidates: [] },
    { value: null, bounds: ["top", "bottom"], candidates: [] },
    { value: null, bounds: ["top"], candidates: [] },
    { value: null, bounds: ["top", "right", "bottom"], candidates: [] },
  ],
  [
    { value: 3, bounds: ["top", "left"], candidates: [] },
    { value: null, bounds: ["bottom", "bottom"], candidates: [] },
    {
      value: 1,
      bounds: ["top", "bottom", "right", "bottom", "right"],
      candidates: [],
    },
    { value: null, bounds: ["top", "left", "right"], candidates: [] },
    { value: null, bounds: ["bottom", "left", "right"], candidates: [] },
    { value: 2, bounds: ["top", "left", "right"], candidates: [] },
  ],
  [
    {
      value: null,
      bounds: ["bottom", "left", "right", "bottom", "right"],
      candidates: [],
    },
    { value: null, bounds: ["top", "left", "right"], candidates: [] },
    {
      value: null,
      bounds: ["top", "bottom", "left", "bottom", "left"],
      candidates: [],
    },
    { value: null, bounds: [], candidates: [] },
    {
      value: null,
      bounds: ["top", "bottom", "right", "right", "bottom"],
      candidates: [],
    },
    { value: null, bounds: ["left", "right"], candidates: [] },
  ],
  [
    { value: null, bounds: ["top", "bottom", "left"], candidates: [] },
    { value: 2, bounds: [], candidates: [] },
    {
      value: null,
      bounds: ["top", "bottom", "right", "bottom"],
      candidates: [],
    },
    {
      value: null,
      bounds: ["bottom", "left", "right", "left", "bottom", "right"],
      candidates: [],
    },
    { value: 3, bounds: ["top", "left", "right"], candidates: [] },
    { value: null, bounds: ["left", "right", "left"], candidates: [] },
  ],
  [
    { value: null, bounds: ["left", "top", "right"], candidates: [] },
    {
      value: null,
      bounds: ["bottom", "left", "right", "right"],
      candidates: [],
    },
    { value: 5, bounds: ["top", "bottom", "left"], candidates: [] },
    { value: null, bounds: ["top", "bottom"], candidates: [] },
    { value: null, bounds: ["right"], candidates: [] },
    { value: null, bounds: ["left", "right", "left"], candidates: [] },
  ],
  [
    { value: 4, bounds: ["left", "bottom"], candidates: [] },
    { value: null, bounds: ["bottom", "top"], candidates: [] },
    { value: null, bounds: ["bottom", "top"], candidates: [] },
    { value: null, bounds: ["bottom", "top", "right"], candidates: [] },
    { value: null, bounds: ["bottom", "left", "right"], candidates: [] },
    {
      value: null,
      bounds: ["bottom", "left", "right", "left"],
      candidates: [],
    },
  ],
];

export function initialiseCells(size) {
  return testCells;
  const cells = [];
  for (var i = 0; i < size; i++) {
    const row = [];
    for (var j = 0; j < size; j++) {
      row.push({
        value: null,
        bounds: getBounds(i, j, size),
        candidates: [],
      });
    }

    cells.push(row);
  }
  return cells;
}

export function coordinateSetIncludes(coordinateSet, coordinates) {
  return (
    coordinateSet &&
    coordinateSet.findIndex(
      (coords) => coords[0] === coordinates[0] && coords[1] === coordinates[1]
    ) > -1
  );
}

export function selectCells(currentCells, selectedCoordinates) {
  const gridSize = currentCells.length - 1;

  return currentCells.map((row, i) => {
    return row.map((cell, j) => {
      if (coordinateSetIncludes(selectedCoordinates, [i, j])) {
        const newBounds = [];

        if (
          i === 0 ||
          !coordinateSetIncludes(selectedCoordinates, [i - 1, j])
        ) {
          newBounds.push("top");
        }

        if (
          i === gridSize ||
          !coordinateSetIncludes(selectedCoordinates, [i + 1, j])
        ) {
          newBounds.push("bottom");
        }

        if (
          j === 0 ||
          !coordinateSetIncludes(selectedCoordinates, [i, j - 1])
        ) {
          newBounds.push("left");
        }

        if (
          j === gridSize ||
          !coordinateSetIncludes(selectedCoordinates, [i, j + 1])
        ) {
          newBounds.push("right");
        }

        return { ...cell, bounds: newBounds };
      } else {
        const newBounds = [...cell.bounds];

        if (coordinateSetIncludes(selectedCoordinates, [i - 1, j])) {
          newBounds.push("top");
        }

        if (coordinateSetIncludes(selectedCoordinates, [i + 1, j])) {
          newBounds.push("bottom");
        }

        if (coordinateSetIncludes(selectedCoordinates, [i, j - 1])) {
          newBounds.push("left");
        }

        if (coordinateSetIncludes(selectedCoordinates, [i, j + 1])) {
          newBounds.push("right");
        }

        return { ...cell, bounds: newBounds };
      }
    });
  });
}

function findSiblingCoords(cells, coords, found = []) {
  const [row, column] = coords;
  const cell = cells[row][column];

  found.push(coords);

  const above = [row - 1, column];
  if (!cell.bounds.includes("top") && !coordinateSetIncludes(found, above)) {
    found = findSiblingCoords(cells, above, found);
  }

  const below = [row + 1, column];
  if (!cell.bounds.includes("bottom") && !coordinateSetIncludes(found, below)) {
    found = findSiblingCoords(cells, below, found);
  }

  const left = [row, column - 1];
  if (!cell.bounds.includes("left") && !coordinateSetIncludes(found, left)) {
    found = findSiblingCoords(cells, left, found);
  }

  const right = [row, column + 1];
  if (!cell.bounds.includes("right") && !coordinateSetIncludes(found, right)) {
    found = findSiblingCoords(cells, right, found);
  }

  return found;
}

export function findSiblings(cells, coords) {
  const allCoords = findSiblingCoords(cells, coords);

  return allCoords.map(([row, column]) => cells[row][column]);
}

export function getNeighbours(cells, coords) {
  const size = cells.length;
  const [row, column] = coords;
  const result = [];

  if (row > 0 && column > 0) {
    result.push(cells[row - 1][column - 1]);
  }

  if (row > 0) {
    result.push(cells[row - 1][column]);
  }

  if (row > 0 && column < size - 1) {
    result.push(cells[row - 1][column + 1]);
  }

  if (column > 0) {
    result.push(cells[row][ column - 1]);
  }

  if (column < size - 1) {
    result.push(cells[row][column + 1]);
  }

  if (row < size - 1 && column > 0) {
    result.push(cells[row + 1][ column - 1]);
  }

  if (row < size - 1) {
    result.push(cells[row + 1][ column]);
  }

  if (row < size - 1 && column < size - 1) {
    result.push(cells[row + 1][column + 1]);
  }

  return result;
}

function getNextValue(currentValue, maxValue, existingValues) {
  let candidateValue = currentValue + 1;

  while (candidateValue <= maxValue) {
    if (!existingValues.includes(candidateValue)) {
      return candidateValue;
    }
    candidateValue++;
  }
  return null;
}

export function incrementCellValue(cells, coords) {
  return cells.map((row, i) => {
    return row.map((cell, j) => {
      if (i === coords[0] && j === coords[1]) {
        const siblings = findSiblings(cells, coords);
        const maxValue = siblings.length;
        const existingValues = siblings.map((c) => c.value);

        return {
          ...cell,
          value: getNextValue(cell.value, maxValue, existingValues),
        };
      } else {
        return cell;
      }
    });
  });
}
