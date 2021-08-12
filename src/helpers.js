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