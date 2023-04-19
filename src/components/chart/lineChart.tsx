import { motion } from "framer-motion";
import { scaleBand, scaleLinear } from "d3-scale";
import { AxisLeft, AxisBottom, Orientation } from "@visx/axis";

import { useDomMeasure } from "../../hooks/useDomMeasure";

interface ILineChart {
  index: string[];
  measure: number[];
}

export const LineChart = ({ index, measure }: ILineChart) => {
  const { ref, measure: domMeasure } = useDomMeasure({
    mt: 0,
    mb: 20,
    ml: 50,
  });

  const dateScale = scaleBand()
    .domain(index)
    .range([domMeasure?.boundedHeight || 0, 0]);

  const measureScale = scaleLinear()
    .domain([Math.floor(Math.min(...measure) / 10) * 10, Math.max(...measure)])
    .range([0, domMeasure?.boundedWidth || 0]);

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
                fill: "#FFFFFF",
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
                fill: "#FFFFFF",
              }}
            />
          </g>
          <g>
            {measure.map((item, idx) => {
              const width = measureScale(item);
              const height = dateScale.step();
              const xPos = domMeasure.marginLeft;
              const yPos = dateScale(index[idx]);

              return (
                <motion.rect
                  stroke="#000"
                  fill="#39D353"
                  width={width}
                  height={height}
                  x={xPos}
                  y={yPos}
                />
              );
            })}
          </g>
        </svg>
      )}
    </article>
  );
};
