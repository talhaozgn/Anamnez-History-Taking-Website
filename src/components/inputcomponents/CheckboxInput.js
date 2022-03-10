import React from "react";

export default function CheckboxInput({ k, v, options, handleChange }) {
  return (
    <React.Fragment>
      <div className="h6">{k}</div>
      {v &&
        options.map((x, index) => (
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`${k}-${index}`}
              name={`${k}-${index}`}
              value={x}
              checked={v[index]}
              onChange={() => handleChange(k, index)}
            />
            <label className="form-check-label" for="flexCheckDefault">
              {x}
            </label>
          </div>
        ))}
    </React.Fragment>
  );
}
