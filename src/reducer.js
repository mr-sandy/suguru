import { incrementCellValue, initialiseCells, selectCells } from "./helpers";
import { solve } from "./solver";

export const steps = { SELECT_CELLS: 1, SET_VALUES: 2, SOLVE: 3 };

export const initialState = {
  size: 6,
  cells: initialiseCells(6),
  selecting: false,
  selectedCells: [],
  step: steps.SOLVE,
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
      return {
        ...state,
        cells: selectCells(state.cells, state.selectedCells),
        selecting: false,
        selectedCells: [],
      };

    case "nextStep":
      return state.step === steps.SOLVE
        ? { ...state, cells: solve(state.cells) }
        : { ...state, step: state.step + 1 };

    case "incrementValue":
      return {
        ...state,
        cells: incrementCellValue(state.cells, action.coords),
      };

    default:
      throw new Error(`unknown action type - ${action.type}`);
  }
}
