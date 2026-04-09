"use client";

import { useEffect, useRef } from "react";
import { ADMIN_STATUS_BREAKDOWN } from "@/mock/AdminDashboard";

let Chart: any = null;

export const ProjectStatusDonut = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  const slices = ADMIN_STATUS_BREAKDOWN;

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const ChartJS = (await import("chart.js/auto")).default;
      if (cancelled || !canvasRef.current) return;

      if (chartRef.current) chartRef.current.destroy();

      const ctx = canvasRef.current.getContext("2d")!;
      const values = slices.map(
        (s) => s.value ?? [40, 25, 35][slices.indexOf(s)],
      );
      const labels = slices.map((s) => s.label);
      const labelTexts = values.map((v) => `${v}%`);

      const sliceLabelPlugin = {
        id: "sliceLabels",
        afterDraw(chart: any) {
          const ctx = chart.ctx;
          const meta = chart.getDatasetMeta(0);
          meta.data.forEach((arc: any, i: number) => {
            const props = arc.getProps(
              ["startAngle", "endAngle", "outerRadius", "innerRadius"],
              true,
            );
            const mid = (props.startAngle + props.endAngle) / 2;
            const r = props.outerRadius * 0.6;
            const x = arc.x + r * Math.cos(mid);
            const y = arc.y + r * Math.sin(mid);
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.font = "600 13px -apple-system, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(labelTexts[i], x, y);
            ctx.restore();
          });
        },
      };

      chartRef.current = new ChartJS(ctx, {
        type: "doughnut",
        plugins: [sliceLabelPlugin],
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: slices.map((s) => s.color),
              borderWidth: 3,
              borderColor: "#fff",
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: false,
          cutout: 0,
          animation: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}%`,
              },
            },
          },
        },
      });
    };

    init();
    return () => {
      cancelled = true;
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center justify-center">
        <canvas ref={canvasRef} width={300} height={300} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        {slices.map((slice) => (
          <span key={slice.label} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: slice.color }}
            />
            {slice.label}
          </span>
        ))}
      </div>
    </div>
  );
};
