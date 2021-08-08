import React, { useReducer } from "react";

const initialState = {
  count: 1,
  cells: [
    [
      { value: null, bounds: ["top", "right"] },
      { value: null, bounds: ["top"] },
      { value: 3, bounds: ["top", "bottom"] },
      { value: null, bounds: ["top", "bottom"] },
      { value: null, bounds: ["top", "right", "bottom"] },
      { value: null, bounds: ["top", "right"] },
    ],
    [
      { value: null, bounds: ["left", "right"] },
      { value: 5, bounds: ["right", "bottom"] },
      { value: 4, bounds: ["bottom"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["right", "bottom"] },
    ],
    [
      { value: 3, bounds: ["left", "right"] },
      { value: null, bounds: ["right"] },
      { value: 2, bounds: ["bottom"] },
      { value: null, bounds: ["bottom"] },
      { value: 3, bounds: ["bottom"] },
      { value: null, bounds: ["right", "bottom"] },
    ],
    [
      { value: null, bounds: ["left", "right"] },
      { value: null, bounds: ["right"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["right"] },
    ],
    [
      { value: null, bounds: ["left", "right", "bottom"] },
      { value: null, bounds: ["bottom"] },
      { value: null, bounds: ["right"] },
      { value: null, bounds: [] },
      { value: null, bounds: ["right"] },
      { value: null, bounds: ["right", "bottom"] },
    ],
    [
      { value: null, bounds: ["left", "bottom"] },
      { value: null, bounds: ["right", "bottom"] },
      { value: null, bounds: ["right", "bottom"] },
      { value: 1, bounds: ["bottom"] },
      { value: null, bounds: ["bottom"] },
      { value: 2, bounds: ["right", "bottom"] },
    ],
  ],
};

function reducer(state, action) {
  switch (action.type) {
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

const cellStyle = (cell) => ({
  padding: "0",
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

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cells } = state;

  return (
    <>
      <table className="game" style={tableStyle}>
        <tbody>
          {cells.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((cell, j) => {
                  return (
                    <td key={j} style={cellStyle(cell)}>
                      {cell.value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Game;
