import React, { useReducer } from "react";

const initialState = {
  count: 1,
  cells: [
    [
      { value: null, terminatesRight: true, terminatesBelow: false },
      { value: null, terminatesRight: false, terminatesBelow: false },
      { value: 3, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: true, terminatesBelow: true },
      { value: null, terminatesRight: true, terminatesBelow: false },
    ],
    [
      { value: null, terminatesRight: true, terminatesBelow: false },
      { value: 5, terminatesRight: true, terminatesBelow: true },
      { value: 4, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: true, terminatesBelow: true },
    ],
    [
      { value: null, terminatesRight: true, terminatesBelow: false },
      { value: null, terminatesRight: true, terminatesBelow: false },
      { value: 2, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: 3, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: true, terminatesBelow: true },
    ],
    [
      { value: null, terminatesRight: true, terminatesBelow: false },
      { value: null, terminatesRight: true, terminatesBelow: false },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: true, terminatesBelow: false },
    ],
    [
      { value: null, terminatesRight: true, terminatesBelow: true },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: true, terminatesBelow: false },
      { value: null, terminatesRight: false, terminatesBelow: false },
      { value: null, terminatesRight: true, terminatesBelow: false },
      { value: null, terminatesRight: true, terminatesBelow: true },
    ],
    [
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: true, terminatesBelow: true },
      { value: null, terminatesRight: true, terminatesBelow: true },
      { value: 1, terminatesRight: false, terminatesBelow: true },
      { value: null, terminatesRight: false, terminatesBelow: true },
      { value: 2, terminatesRight: true, terminatesBelow: true },
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
  padding: "10px",
  height: "20px",
  width: "20px",
  textAlign: "center",
  borderColor: "black",
  borderStyle: "solid",
  borderTopWidth: "1px",
  borderLeftWidth: "1px",
  borderRightWidth: cell.terminatesRight ? "3px" : "1px",
  borderBottomWidth: cell.terminatesBelow ? "3px" : "1px",
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
