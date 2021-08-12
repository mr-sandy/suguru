export function setSize(size) {
  return { type: "setSize", size };
}

export function startSelect(i, j) {
  return { type: "startSelect", cell: { x: i, y: j } };
}

export function select(i, j) {
  return { type: "select", cell: { x: i, y: j } };
}

export function endSelect() {
  return { type: "endSelect" };
}
