import React from "react";

export default function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className="
        w-full p-2 rounded outline-none
        border-2 
        transition-colors
        min-h-[170px] resize-none overflow-y-auto
      "
    />
  );
}