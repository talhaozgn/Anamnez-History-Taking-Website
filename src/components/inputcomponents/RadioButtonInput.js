import React from "react";

export default function RadiobuttonInput({ k, options, handleChange, inline }) {
  return (
    <React.Fragment>
      {inline ? (
        <div className="row">
          <div className="col-4">
            <div className="h6">{k}</div>
          </div>
          <div className="col-8">
            <div onChange={handleChange} name={k}>
              {options.map((x) => (
                <span className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={k}
                    value={x}
                  />
                  <label className="form-check-label">{x}</label>
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="h6">{k}</div>
          <div onChange={handleChange} name={k}>
            {options.map((x) => (
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={k}
                  value={x}
                />
                <label className="form-check-label">{x}</label>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
