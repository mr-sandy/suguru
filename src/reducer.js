import { initialiseCells, selectCells } from "./helpers";

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
        selectedCells: [action.coords],
      };
    case "select":
      return state.selecting
        ? {
            ...state,
            selecting: true,
            selectedCells: [...state.selectedCells, action.coords],
          }
        : state;
    case "endSelect":
      return { ...state, cells: selectCells(state.cells, state.selectedCells), selecting: false, selectedCells: [] };
    default:
      throw new Error();
  }
}
