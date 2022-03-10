import React from "react";

export default function TextInput({ k, size, underlined, center }) {
  return (
    <React.Fragment>
      <div className={`h${size} ${center && "text-center"}`}>
        {underlined ? <u>{k}</u> : <span>{k}</span>}
      </div>
    </React.Fragment>
  );
}
