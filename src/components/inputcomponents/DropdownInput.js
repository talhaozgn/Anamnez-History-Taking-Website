import React from "react";

export default function DropdownInput({ k, options, handleChange, inline }) {
  return (
    <React.Fragment>
      {inline ? (
        <div className="row">
          <div className="col-4">
            <div className="h6">{k}</div>
          </div>
          <div className="col-8">
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
          </div>
        </div>
      ) : (
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
      )}
    </React.Fragment>
  );
}
