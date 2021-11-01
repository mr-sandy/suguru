import { findSiblings, getNeighbours } from "./helpers";

function getAvailableValues(noOfCells, existingValues) {
  const result = [];

  for (let i = 1; i <= noOfCells; i++) {
    if (!existingValues.includes(i)) {
      result.push(i);
    }
  }

  return result;
}

export function initialiseCandidatesForSet(cells) {
  return cells.map((row, i) => {
    return row.map((cell, j) => {
      const siblings = findSiblings(cells, [i, j]);
      const values = siblings.map((c) => c.value);
      const candidates = getAvailableValues(siblings.length, values);

      return {
        ...cell,
        candidates: candidates,
      };
    });
  });
}

export function setSingleCandidatesAsValues(cells) {
  return cells.map((row, i) => {
    return row.map((cell, j) => {
      return cell.value || cell.candidates.length !== 1
        ? cell
        : {
            ...cell,
            value: cell.candidates[0],
          };
    });
  });
}

export function filterCandidatesByNeighbourValues(cells) {
  return cells.map((row, i) => {
    return row.map((cell, j) => {
      const neighbourValues = getNeighbours(cells, [i, j])
        .map((c) => c.value)
        .filter((v) => v !== null);

      return neighbourValues.length === 0
        ? cell
        : {
            ...cell,
            candidates: cell.candidates.filter(
              (v) => !neighbourValues.includes(v)
            ),
          };
    });
  });
}

export function solve(cells) {
  const v1 = initialiseCandidatesForSet(cells);
  const v2 = setSingleCandidatesAsValues(v1);
  const v3 = filterCandidatesByNeighbourValues(v2);
  const v4 = setSingleCandidatesAsValues(v3);
  return v4;
}
