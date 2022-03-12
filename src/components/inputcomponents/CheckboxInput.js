import React from "react";

export default function CheckboxInput({ k, v, options, handleChange, inline }) {
  return (
    <React.Fragment>
      {inline ? (
        <div className="row">
          <div className="col-4">
            <div className="h6">{k}</div>
          </div>
          <div className="col-8">
            {v &&
              options.map((x, index) => (
                <div className="form-check form-check-inline">
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
          </div>
        </div>
      ) : (
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
      )}
    </React.Fragment>
  );
}
