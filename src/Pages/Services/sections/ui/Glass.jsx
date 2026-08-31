import React from "react";
import classNames from "classnames";

export default function Glass({ className, children }) {
  return (
    <div
      className={classNames(
        "rounded-2xl border bg-void-850/55 backdrop-blur-xl",
        "border-signal-500/40 shadow-glow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
