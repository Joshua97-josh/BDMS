import React from "react";
export function Input(props) {
    return (
      <input
        {...props}
        className={`border rounded p-2 outline-blue-500 ${props.className || ''}`}
      />
    );
  }
  