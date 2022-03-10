import React from "react";

export default function FormulaInput({ k, v, inline }) {
  return (
    <React.Fragment>
      {inline ? (
        <div className="row">
          <div className="col-4">
            <div className="h6">{k}</div>
          </div>
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              id={k}
              name={k}
              value={v}
              readOnly
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
            value={v}
            readOnly
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
