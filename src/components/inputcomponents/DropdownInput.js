import React from "react";

export default function DropdownInput({ k, options, handleChange }) {
  return (
    <React.Fragment>
      <div className="h6">{k}</div>
      <select
        className="form-select"
        onChange={handleChange}
        name={k}
        defaultValue={"select-default"}
      >
        <option disabled value={"select-default"}>
          -- select an option --
        </option>
        {options.map((x) => (
          <option value={x}>{x}</option>
        ))}
      </select>
    </React.Fragment>
  );
}
