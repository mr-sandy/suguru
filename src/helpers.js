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

export function initialiseCells(size) {
  const cells = [];
  for (var i = 0; i < size; i++) {
    const row = [];
    for (var j = 0; j < size; j++) {
      row.push({ value: null, bounds: getBounds(i, j, size) });
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
  console.log(JSON.stringify(selectedCoordinates, null, 1));
  console.log(JSON.stringify(currentCells, null, 1));
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
