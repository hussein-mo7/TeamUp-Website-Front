"use client";

import { useEffect, useRef } from "react";

const ADMIN_GROWTH_YEARLY = [
  { label: "JAN", users: 3, projects: 5 },
  { label: "FEB", users: 5, projects: 7 },
  { label: "MAR", users: 11, projects: 7 },
  { label: "APR", users: 11, projects: 6 },
  { label: "MAY", users: 5, projects: 5 },
  { label: "JUN", users: 5, projects: 7 },
  { label: "JUL", users: 8, projects: 8 },
  { label: "Aug", users: 5, projects: 5 },
  { label: "Sep", users: 6, projects: 3 },
  { label: "Oct", users: 6, projects: 3 },
  { label: "Nov", users: 3, projects: 3 },
  { label: "Dec", users: 3, projects: 8 },
];

const ADMIN_GROWTH_MONTHLY = [
  { label: "W1", users: 4, projects: 3 },
  { label: "W2", users: 8, projects: 7 },
  { label: "W3", users: 10, projects: 9 },
  { label: "W4", users: 11, projects: 10 },
];

let Chart: any = null;

export const PlatformGrowthChart = ({ range }: { range: "Year" | "Month" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const ChartJS = (await import("chart.js/auto")).default;
      if (cancelled || !canvasRef.current) return;
      Chart = ChartJS;

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = canvasRef.current.getContext("2d")!;
      const isCompact = canvasRef.current.clientWidth < 480;

      const data =
        range === "Year" ? ADMIN_GROWTH_YEARLY : ADMIN_GROWTH_MONTHLY;

      const usersGrad = ctx.createLinearGradient(0, 0, 0, 240);
      usersGrad.addColorStop(0, "rgba(59,130,246,0.28)");
      usersGrad.addColorStop(1, "rgba(59,130,246,0.03)");

      const projectsGrad = ctx.createLinearGradient(0, 0, 0, 240);
      projectsGrad.addColorStop(0, "rgba(16,185,129,0.24)");
      projectsGrad.addColorStop(1, "rgba(16,185,129,0.03)");

      const labels = data.map((p) => p.label);
      const usersData = data.map((p) => p.users);
      const projectsData = data.map((p) => p.projects);

      const highlightPlugin = {
        id: "highlightColumn",
        beforeDatasetsDraw(chart: any) {
          const ctx = chart.ctx;
          const xScale = chart.scales.x;
          const { top, bottom } = chart.chartArea;
          const activeElements = chart.tooltip?.getActiveElements?.() ?? [];
          const activeIndex = activeElements[0]?.index ?? -1;
          const bandWidth = isCompact ? 38 : 60;

          ctx.save();

          for (let index = 0; index < labels.length; index += 1) {
            const x = xScale.getPixelForTick(index);
            const isActive = index === activeIndex;

            ctx.fillStyle = isActive
              ? "rgba(59,130,246,0.14)"
              : "rgba(148,163,184,0.04)";
            ctx.beginPath();
            // @ts-ignore
            ctx.roundRect(x - bandWidth / 2, top, bandWidth, bottom - top, 14);
            ctx.fill();
          }

          ctx.restore();
        },

        afterDraw(chart: any) {
          const ctx = chart.ctx;
          const activeElements = chart.tooltip?.getActiveElements?.() ?? [];
          if (!activeElements.length) return;

          const activeEl =
            activeElements.find((el: any) => el.datasetIndex === 0) ??
            activeElements[0];
          const activeIndex = activeEl.index;
          const activePoint = activeEl.element;
          if (!activePoint) return;

          const { x, y } = activePoint.getProps(["x", "y"], true);

          const bubbleW = 36;
          const bubbleH = 26;
          const bubbleR = 10;
          const tipH = 9;
          const gap = 6;
          const bx = x - bubbleW / 2;
          const by = y - bubbleH - tipH - gap;

          ctx.save();

          ctx.shadowColor = "rgba(0,0,0,0.22)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetY = 3;

          ctx.fillStyle = "#111827";
          ctx.beginPath();
          ctx.moveTo(bx + bubbleR, by);
          ctx.lineTo(bx + bubbleW - bubbleR, by);
          ctx.quadraticCurveTo(bx + bubbleW, by, bx + bubbleW, by + bubbleR);
          ctx.lineTo(bx + bubbleW, by + bubbleH - bubbleR);
          ctx.quadraticCurveTo(
            bx + bubbleW,
            by + bubbleH,
            bx + bubbleW - bubbleR,
            by + bubbleH,
          );
          ctx.lineTo(x + 6, by + bubbleH);
          ctx.lineTo(x, by + bubbleH + tipH);
          ctx.lineTo(x - 6, by + bubbleH);
          ctx.lineTo(bx + bubbleR, by + bubbleH);
          ctx.quadraticCurveTo(bx, by + bubbleH, bx, by + bubbleH - bubbleR);
          ctx.lineTo(bx, by + bubbleR);
          ctx.quadraticCurveTo(bx, by, bx + bubbleR, by);
          ctx.closePath();
          ctx.fill();

          ctx.shadowColor = "transparent";

          ctx.fillStyle = "#ffffff";
          ctx.font = `bold ${isCompact ? 11 : 13}px -apple-system, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(usersData[activeIndex]), x, by + bubbleH / 2);

          ctx.restore();
        },
      };

      chartRef.current = new ChartJS(ctx, {
        type: "line",
        plugins: [highlightPlugin],
        data: {
          labels,
          datasets: [
            {
              label: "Users",
              data: usersData,
              borderColor: "#3B82F6",
              borderWidth: 3.5,
              backgroundColor: usersGrad,
              fill: true,
              tension: 0.5,
              pointRadius: 0,
              pointHoverRadius: 0,
              pointBorderWidth: 0,
              pointBackgroundColor: "transparent",
            },
            {
              label: "Projects",
              data: projectsData,
              borderColor: "#10B981",
              borderWidth: 3,
              backgroundColor: projectsGrad,
              fill: true,
              tension: 0.5,
              pointRadius: 0,
              pointHoverRadius: 0,
              pointBorderWidth: 0,
              pointBackgroundColor: "transparent",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          onHover: (event: any, activeElements: any, chart: any) => {
            chart.canvas.style.cursor = activeElements.length
              ? "pointer"
              : "default";
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: false,
              mode: "index",
              intersect: false,
              external: () => undefined,
            },
          },
          layout: {
            padding: {
              top: isCompact ? 2 : 8,
              right: isCompact ? 0 : 4,
              bottom: isCompact ? 0 : 2,
              left: 0,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: {
                font: { size: isCompact ? 8 : 10 },
                color: "#9ca3af",
                maxRotation: 0,
                autoSkip: false,
                padding: isCompact ? 8 : 10,
              },
            },
            y: {
              min: 0,
              max: 12,
              ticks: {
                stepSize: 2,
                font: { size: isCompact ? 8 : 10 },
                color: "#9ca3af",
              },
              grid: {
                color: "#E2E8F0",
                lineWidth: 0.8,
              },
              border: {
                display: false,
                dash: [4, 4],
              },
            },
          },
        },
      } as any);
    };

    init();
    return () => {
      cancelled = true;
      chartRef.current?.destroy();
    };
  }, [range]);

  return (
    <div className="w-full overflow-x-auto overscroll-x-contain">
      <div
        className={`relative h-[280px] sm:h-[320px] ${
          range === "Month"
            ? "min-w-[860px] sm:min-w-0"
            : "min-w-[620px] sm:min-w-0"
        }`}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
