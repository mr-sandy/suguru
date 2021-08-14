export function setSize(size) {
  return { type: "setSize", size };
}

export function startSelect(i, j) {
  return { type: "startSelect", coords: [i, j] };
}

export function select(i, j) {
  return { type: "select", coords: [i, j] };
}

export function endSelect() {
  return { type: "endSelect" };
}
