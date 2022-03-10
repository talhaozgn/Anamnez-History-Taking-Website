import React from "react";

export default function TextInput({ k, v, handleChange, inline }) {
  return (
    <React.Fragment>
      {inline ? (
        <div className="row">
          <div className="col-2">
            <div className="h6">{k}</div>
          </div>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id={k}
              name={k}
              onChange={handleChange}
              value={v}
            />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="h6">{k}</div>
          <textarea
            type="text"
            className="form-control w-100"
            id={k}
            name={k}
            onChange={handleChange}
            value={v}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
