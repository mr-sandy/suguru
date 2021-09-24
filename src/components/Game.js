import React, { useReducer } from "react";
import { reducer, initialState, steps } from "../reducer";
import Board from "./Board";
import { setSize, startSelect, endSelect, select, nextStep, incrementValue } from "../actions";
import SizePicker from "./SizePicker";

const instructions = ['', 'Step 1: Select the cells', 'Step 2: Set any known values', '']

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cells, size, selectedCells, step } = state;

  return (
    <>
      <h1>Suguru Solver</h1>
      <Board
        step={step}
        cells={cells}
        selectedCells={selectedCells}
        onIncrementValue={(i, j) => dispatch(incrementValue(i, j))}
        onSelectStart={(i, j) => dispatch(startSelect(i, j))}
        onSelectEnd={() => dispatch(endSelect())}
        onSelect={(i, j) => dispatch(select(i, j))}
      />
      <div className="controls">
        <p>{instructions[step]}</p>
        {step === steps.SELECT_CELLS &&
          <SizePicker
            size={size}
            onSetSize={s => dispatch(setSize(s))}
          />}
        <button onClick={() => dispatch(nextStep())}>Next</button>
      </div>
    </>
  );
}

export default Game;
