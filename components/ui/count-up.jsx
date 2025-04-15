"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function CountUp({ value, duration = 2000 }) {
  const [displayValue, setDisplayValue] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startValue = 0;
    let endValue = 0;

    // Handle numeric values with + sign (e.g., "50+")
    if (typeof value === "string" && value.endsWith("+")) {
      endValue = Number.parseInt(value.replace("+", ""));
    }
    // Handle percentage values (e.g., "95%")
    else if (typeof value === "string" && value.endsWith("%")) {
      endValue = Number.parseInt(value.replace("%", ""));
    }
    // Handle numeric values
    else if (!isNaN(Number(value))) {
      endValue = Number(value);
    }
    // Handle non-numeric values (e.g., "24/7")
    else {
      setDisplayValue(value);
      return;
    }

    const suffix = typeof value === "string" ? value.replace(/[0-9]/g, "") : "";
    const increment = Math.ceil(endValue / 50);
    const timer = setInterval(() => {
      startValue += increment;

      if (startValue > endValue) {
        setDisplayValue(`${endValue}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplayValue(`${startValue}${suffix}`);
      }
    }, duration / 50);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{isInView ? displayValue : "0"}</span>;
}
