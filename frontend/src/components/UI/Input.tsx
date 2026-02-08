import React from "react";


export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="
        w-full pl-2 py-1 rounded outline-none
        border-2 
        h-[35px]
        transition-colors
        placeholder:text-sm
      "
    />
  );
}