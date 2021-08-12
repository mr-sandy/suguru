import { initialiseCells } from "./helpers";

export const initialState = {
  size: 6,
  cells: initialiseCells(6),
  selecting: false,
  selectedCells: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "setSize":
      return {
        ...state,
        size: action.size,
        cells: initialiseCells(action.size),
      };
    case "startSelect":
      return {
        ...state,
        selecting: true,
        selectedCells: [action.cell],
      };
    case "select":
      return state.selecting
        ? {
            ...state,
            selecting: true,
            selectedCells: [...state.selectedCells, action.cell],
          }
        : state;
    case "endSelect":
      return { ...state, selecting: false, selectedCells: [] };
    default:
      throw new Error();
  }
}
