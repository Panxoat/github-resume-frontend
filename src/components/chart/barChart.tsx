import { motion } from "framer-motion";
import { scaleBand, scaleLinear } from "d3-scale";
import { AxisLeft, AxisBottom, Orientation } from "@visx/axis";
import { getStringWidth } from "@visx/text";

import { useDomMeasure } from "../../hooks/useDomMeasure";
import React from "react";

interface IBarChart {
  index: string[];
  measure: number[];
}

export const BarChart = ({ index, measure }: IBarChart) => {
  const { ref, measure: domMeasure } = useDomMeasure({
    mt: 0,
    mb: 25,
    ml: 50,
  });

  const dateScale = scaleBand()
    .domain(index)
    .range([domMeasure?.boundedHeight || 0, 0]);

  const measureScale = scaleLinear()
    .domain([0, Math.max(...measure) || 50])
    .range([0, domMeasure?.boundedWidth || 0]);

  const color = scaleLinear<string, number>()
    .domain([Math.floor(Math.min(...measure) / 10) * 10, Math.max(...measure)])
    .range(["rgba(14, 68, 41, 1)", "rgba(57, 211, 83, 1)"]);

  return (
    <article ref={ref} className="w-full h-full">
      {domMeasure && (
        <svg width="100%" height="100%" stroke="transparent">
          <g
            transform={`translate(${domMeasure.marginLeft}, ${domMeasure.marginTop})`}
          >
            <AxisLeft
              orientation={Orientation.left}
              scale={dateScale}
              numTicks={4}
              stroke="#393D50"
              tickStroke="#393D50"
              tickLabelProps={{
                fill: "#9DA2B9",
                fontWeight: 700,
              }}
            />
          </g>
          <g
            transform={`translate(${domMeasure.marginLeft},${
              domMeasure.marginTop + domMeasure.boundedHeight
            })`}
          >
            <AxisBottom
              orientation={Orientation.bottom}
              scale={measureScale}
              numTicks={5}
              stroke="#393D50"
              tickStroke="#393D50"
              tickLabelProps={{
                fill: "#9DA2B9",
                fontWeight: 700,
              }}
            />
          </g>
          <g>
            {measure.map((item, idx) => {
              const measure = measureScale(item);
              const height = dateScale.step() / 2;
              const xPos = domMeasure.marginLeft;
              const yPos = (dateScale(index[idx]) || 0) + height / 2;

              return (
                <React.Fragment key={idx}>
                  <motion.rect
                    stroke="#000"
                    fill={String(color(item))}
                    width={measure}
                    height={height}
                    x={xPos}
                    y={yPos}
                  />
                  {item && (
                    <text
                      x={
                        measure +
                        domMeasure.marginLeft -
                        (getStringWidth(String(Math.round(measure)), {
                          "font-size": 10,
                        }) || 0)
                      }
                      y={yPos}
                      dy={12}
                      fill="#fff"
                      textAnchor="start"
                      fontSize={10}
                    >
                      {Math.round(item)}
                    </text>
                  )}
                </React.Fragment>
              );
            })}
          </g>
        </svg>
      )}
    </article>
  );
};
