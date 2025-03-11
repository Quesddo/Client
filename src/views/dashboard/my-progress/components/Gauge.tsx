import { useEffect, useRef } from "react";
import SvgGauge, { GaugeInstance, GaugeOptions } from "svg-gauge";

import useProgressTodo from "@/hooks/todo/useProgressTodo";

export default function Gauge() {
  const { data, isLoading } = useProgressTodo();
  const gaugeEl = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<GaugeInstance>(null);

  useEffect(() => {
    if (!gaugeRef.current) {
      if (!gaugeEl.current) return;
      const options: GaugeOptions = {
        color: () => "#000000",
        showValue: true,
        gaugeClass: "custom-gauge",
        label: (value) => Math.round(value) + "%",
      };
      gaugeRef.current = SvgGauge(gaugeEl.current, options);
      gaugeRef.current?.setValue(0);
    }
    gaugeRef.current?.setValueAnimated(data.progress, 2);
  }, [data]);

  if (isLoading) return null;

  return (
    <div className="mt-[16px] flex flex-1 items-center justify-center">
      <div className="h-[166px] w-[166px]">
        <div ref={gaugeEl}></div>
      </div>
    </div>
  );
}
