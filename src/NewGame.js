import React, { useReducer } from "react";

const initialState = {
  size: "",
  cells: [],
  selecting: false,
  selectedCells: [],
};

function initialiseCells(size) {
  const cells = [];
  for (var i = 0; i < size; i++) {
    const row = [];
    for (var j = 0; j < size; j++) {
      row.push({ value: null, bounds: [] });
    }

    cells.push(row);
  }
  return cells;
}

function reducer(state, action) {
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
    case "increment":
      return { count: state.count + 4 };
    case "decrement":
      return { count: state.count - 11 };
    default:
      throw new Error();
  }
}

const tableStyle = {
  borderCollapse: "collapse",
  border: "3px solid black",
};

const cellStyle = (cell, highlighted) => ({
  padding: "0",
  backgroundColor: highlighted ? "#eee" : "#fff",
  height: "50px",
  width: "50px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "24px",
  borderColor: "black",
  borderStyle: "solid",
  borderTopWidth: "1px",
  borderLeftWidth: "1px",
  borderRightWidth: cell.bounds.includes("right") ? "3px" : "1px",
  borderBottomWidth: cell.bounds.includes("bottom") ? "3px" : "1px",
  margin: 0,
});

function Cell({ cell, onMouseDown, onMouseUp, onMouseOver, highlighted }) {
  return (
    <td
      style={cellStyle(cell, highlighted)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
    >
      {cell.value}
    </td>
  );
}

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cells, size, selectedCells } = state;

  console.log(JSON.stringify(state));

  return (
    <>
      <label>size: </label>
      <select
        value={size}
        onChange={(e) => dispatch({ type: "setSize", size: e.target.value })}
      >
        <option value="">not set</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>

      <br />
      <br />
      <br />

      <table
        className="game"
        style={tableStyle}
        onMouseLeave={() => dispatch({ type: "endSelect" })}
      >
        <tbody>
          {cells.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((cell, j) => (
                  <Cell
                    key={j}
                    highlighted={
                      selectedCells.findIndex((c) => c.x === i && c.y === j) >
                      -1
                    }
                    cell={cell}
                    onMouseDown={() =>
                      dispatch({ type: "startSelect", cell: { x: i, y: j } })
                    }
                    onMouseUp={() => dispatch({ type: "endSelect" })}
                    onMouseOver={() =>
                      dispatch({ type: "select", cell: { x: i, y: j } })
                    }
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Game;
