import React from "react";
import classNames from "classnames";

export default function Chip({ active, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black tracking-wider transition-all",
        active
          ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
          : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green"
      )}
    >
      {Icon ? <Icon className="text-[12px]" /> : null}
      {children}
    </button>
  );
}
