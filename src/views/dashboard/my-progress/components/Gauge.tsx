import { useEffect, useRef } from "react";
import SvgGauge, { GaugeInstance, GaugeOptions } from "svg-gauge";

import useProgressTodo from "@/hooks/todo/useProgressTodo";

export default function Gauge() {
  const { data } = useProgressTodo();
  const progress = data?.progress ?? 0;
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
      gaugeRef.current?.setValue(1);
    }
    gaugeRef.current?.setValueAnimated(progress, 1);
  }, [progress]);

  return (
    <div className="mt-[16px] flex flex-1 items-center">
      <div className="h-[166px] w-[166px]">
        <div ref={gaugeEl}></div>
      </div>
    </div>
  );
}
