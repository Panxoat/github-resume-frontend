import React, { useMemo } from "react";
import { pie, arc } from "d3-shape";
import { motion } from "framer-motion";

import { useLanguageColor } from "../../hooks/useLanguageColor";
import { useDomMeasure } from "../../hooks/useDomMeasure";

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

  const { ref, measure: domMeasure } = useDomMeasure({
    mt: 1,
    mb: -20,
    ml: 50,
  });

  const radius = domMeasure
    ? Math.min(domMeasure?.boundedWidth, domMeasure?.boundedHeight) / 2.4
    : 100;

  const arcGenerator = arc();

  const pieGenerator = data
    ? pie<{ rate: number; name: string }>().value((d) => d.rate)(data)
    : null;

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
                pieGenerator.map((pie) => {
                  const midangle =
                    pie.startAngle + (pie.endAngle - pie.startAngle) / 2;
                  const textAnchor = midangle < Math.PI ? "start" : "end";

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
                      fill: bgColor(pie.data.name).color || "#fff",
                    },
                  };

                  return (
                    <React.Fragment key={pie.data.name}>
                      <motion.path
                        variants={path}
                        initial="start"
                        animate="end"
                        d={
                          arcGenerator({
                            innerRadius: radius * 0.6,
                            outerRadius: radius,
                            startAngle: pie.startAngle,
                            endAngle: pie.endAngle,
                          }) || ""
                        }
                      ></motion.path>
                      <text
                        fontWeight={600}
                        fill={bgColor(pie.data.name).color || "#fff"}
                        transform={`translate(${arcGenerator.centroid({
                          innerRadius: radius,
                          outerRadius: radius * 1.2,
                          startAngle: pie.startAngle,
                          endAngle: pie.endAngle,
                        })})`}
                        textAnchor={textAnchor}
                      >
                        {pie.data.name}
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
