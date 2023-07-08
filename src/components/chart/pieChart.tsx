import React from "react";
import { pie, arc } from "d3-shape";
import { motion } from "framer-motion";
import clsx from "clsx";

import { useLanguageColor } from "../../hooks/useLanguageColor";
import { useInvertColor } from "../../hooks/useColor";
import { useDomMeasure } from "../../hooks/useDomMeasure";

import type { PieArcDatum } from "d3-shape";
import { getStringWidth } from "@visx/text";

interface IPieChart {
  data?: {
    rate: number;
    name: string;
  }[];
  width?: number;
  height?: number;
}

export const PieChart = ({ data, width, height }: IPieChart) => {
  const { bgColor } = useLanguageColor();
  const { invertColor } = useInvertColor();

  const { ref, measure: domMeasure } = useDomMeasure({
    mt: 1,
    mb: -20,
    ml: 0,
  });

  const innerRadius = domMeasure
    ? Math.min(domMeasure?.boundedWidth, domMeasure?.boundedHeight) / 2.3
    : 100;

  const outerRadius = domMeasure
    ? Math.min(domMeasure?.boundedWidth, domMeasure?.boundedHeight) / 4
    : 100;

  const arcGenerator = arc();
  const outerArcGenerator = arc()
    .innerRadius(innerRadius * 1.35)
    .outerRadius(outerRadius * 1.35);

  const pieGenerator = data
    ? pie<{ rate: number; name: string }>().value((d) => d.rate)(data)
    : null;

  const getMidAngle = (
    d: PieArcDatum<{
      rate: number;
      name: string;
    }>
  ) => {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  };

  const getPolyLinePos = (prefixValue:number, idx: number, stringWidth: number) => {
    return prefixValue + idx * idx * 10 - stringWidth
  }

  return (
    <article ref={ref} className="w-full h-full">
      {domMeasure && (
        <svg width="100%" height="100%" stroke="transparent">
          {data && (
            <g
              transform={`translate(${domMeasure.boundedWidth / 2}, ${
                domMeasure.boundedHeight / 2
              })`}
            >
              {pieGenerator &&
                pieGenerator.map((pie, idx) => {
                  const path = {
                    start: {
                      pathLength: 0,
                      fill: "transparent",
                      y: 20,
                      opacity: 0,
                    },
                    end: {
                      y: 0,
                      opacity: 1,
                      pathLength: 1,
                      fill: bgColor(pie.data.name)?.color || "#fff",
                    },
                  };

                  const arcWidth = (pie.endAngle - pie.startAngle) / 2;
                  const isSmallArc = arcWidth < 0.10;

                  const pos = arcGenerator.centroid({
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    startAngle: pie.startAngle,
                    endAngle: pie.endAngle,
                  });

                  const outerPos = outerArcGenerator.centroid({
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    startAngle: pie.startAngle,
                    endAngle: pie.endAngle,
                  });

                  const fixedPos = [
                    getPolyLinePos(innerRadius * 0.8 * (getMidAngle(pie) < Math.PI ? 1 : -1), idx, getStringWidth(pie.data.name) || 0) - 20,
                    outerPos[1] - idx *idx + 10,
                  ];

                  const fixedLinePos = [
                    [pos[0], pos[1]],
                    [outerPos[0], outerPos[1] - idx * idx + 20],
                    getPolyLinePos(innerRadius * 0.8 * (getMidAngle(pie) < Math.PI ? 1 : -1), idx, getStringWidth(pie.data.name) || 0),
                    outerPos[1] - idx * idx + 20,
                  ];

                  return (
                    <React.Fragment key={pie.data.name}>
                      <motion.path
                        variants={path}
                        initial="start"
                        animate="end"
                        d={
                          arcGenerator({
                            innerRadius: innerRadius,
                            outerRadius: outerRadius,
                            startAngle: pie.startAngle,
                            endAngle: pie.endAngle,
                          }) || ""
                        }
                      />
                      {isSmallArc && (
                        <polyline
                          fill="none"
                          stroke="#fff"
                          points={String(fixedLinePos)}
                        ></polyline>
                      )}
                      <text
                        className={clsx("text-[10px] tablet:text-[11px] desktop:text-[16px]", {
                          "!text-[10px]": isSmallArc
                        })}
                        fontWeight={600}
                        fill={
                          isSmallArc
                            ? "#fff"
                            : invertColor(bgColor(pie.data.name)?.color, true)
                        }
                        transform={
                          isSmallArc
                            ? `translate(${fixedPos})`
                            : `translate(${pos})`
                        }
                        textAnchor="middle"
                      >
                        <tspan x={0} y={0}>
                          {pie.data.name}
                        </tspan>
                        <tspan
                          x={0}
                          y={"1.1em"}
                          fontWeight={400}
                          fill={isSmallArc ? "#fff" : ""}
                        >
                          {pie.data.rate}%
                        </tspan>
                      </text>
                    </React.Fragment>
                  );
                })}
            </g>
          )}
        </svg>
      )}
    </article>
  );
};
