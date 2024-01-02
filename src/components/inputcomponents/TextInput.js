import React from "react";

export default function TextInput({ k, v, handleChange, inline }) {
if (k==="Öykü "){
  v = v || " Korku aurası, Koku aurası, Dejavu, Jamais, vu aurası";
 }
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
