import React from "react";

export default function ReflectionInput({ value }) {
  if (value == null || value === "") return null;
  return <div>{value}</div>;
}
