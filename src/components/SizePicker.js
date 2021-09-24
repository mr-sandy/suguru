import React from "react";

function SizePicker({ size, onSetSize }) {
  return (
    <>
      <label>Board size: </label>
      <select value={size} onChange={e => onSetSize(e.target.value)}>
        <option value="0">not set</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
    </>
  );
}

export default SizePicker;
