import { scaleBand, scaleLinear } from "d3-scale";
import { AxisLeft, AxisBottom, Orientation } from "@visx/axis";

import { useDomMeasure } from "../../hooks/useDomMeasure";

interface ILineChart {
  index: string[];
  measure: number[];
}

export const LineChart = ({ index, measure }: ILineChart) => {
  const dateScale = scaleBand().domain(index).range([0, 500]);

  const { ref, measure: domMeasure } = useDomMeasure({
    mt: 30,
  });

  return (
    <article ref={ref} className="w-full h-full">
      <svg width="100%" height="100%" stroke="transparent">
        <g transform={`translate(0, ${domMeasure?.boundedHeight})`}>
          <AxisBottom
            orientation={Orientation.bottom}
            scale={dateScale}
            numTicks={4}
            stroke="#393D50"
            tickStroke="#393D50"
          />
        </g>
      </svg>
    </article>
  );
};
