import React, { useReducer } from "react";
import { reducer, initialState } from "../reducer";
import SizePicker from "./SizePicker";
import Board from "./Board";
import { setSize, startSelect, endSelect, select } from "../actions";

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cells, size, selectedCells } = state;

  return (
    <>
      <SizePicker
        size={size}
        onChange={(e) => dispatch(setSize(e.target.value))}
      />
      <Board
        cells={cells}
        selectedCells={selectedCells}
        onSelectStart={(i, j) => dispatch(startSelect(i, j))}
        onSelectEnd={() => dispatch(endSelect())}
        onSelect={(i, j) => dispatch(select(i, j))}
      />
    </>
  );
}

export default Game;
