import React from "react";
import {coordinateSetIncludes} from '../helpers';

function Board({ cells, selectedCells, onSelectStart, onSelectEnd, onSelect }) {
  const isHighlighted = (i, j) => coordinateSetIncludes(selectedCells, [i, j]);

  return (
    <table className="game" onMouseLeave={onSelectEnd}>
      <tbody>
        {cells.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                className={`${
                  isHighlighted(i, j) ? "highlighted" : ""
                } ${cell.bounds.join(" ")}`}
                onMouseDown={() => onSelectStart(i, j)}
                onMouseUp={() => onSelectEnd()}
                onMouseOver={() => onSelect(i, j)}
              >
                {cell.value}
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
