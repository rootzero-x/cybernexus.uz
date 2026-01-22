import React from "react";
import classNames from "classnames";

export default function Glass({ className, children }) {
  return (
    <div
      className={classNames(
        "rounded-xl border-2 bg-black/55 backdrop-blur-xl",
        "border-neon-green/40 shadow-neon",
        className
      )}
    >
      {children}
    </div>
  );
}
