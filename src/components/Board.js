import React from "react";
import { coordinateSetIncludes } from '../helpers';
import { steps } from "../reducer";

function Board({ step, cells, selectedCells, onSelectStart, onSelectEnd, onSelect, onIncrementValue }) {
  const isHighlighted = (i, j) => coordinateSetIncludes(selectedCells, [i, j]);

  const handlers = step === steps.SELECT_CELLS
    ? (i, j) => ({
      onMouseDown: () => onSelectStart(i, j),
      onMouseUp: () => onSelectEnd(),
      onMouseOver: () => onSelect(i, j)
    })
    : (i, j) => ({
      onClick: () => onIncrementValue(i, j)
    });

  return (
    <table className="game" onMouseLeave={onSelectEnd}>
      <tbody>
        {cells.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                className={`${isHighlighted(i, j) ? "highlighted" : ""
                  } ${cell.bounds.join(" ")}`}
                {...handlers(i, j)}
              >
                {cell.value || <span className="candidates">{cell?.candidates?.join(" ")}</span>}
                <div className={`TEMP ${cell.bounds.join(" ")}`}></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
