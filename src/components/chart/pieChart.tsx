import { useMemo } from "react";
import { scaleOrdinal } from "d3-scale";
import { pie, arc } from "d3-shape";

interface IPieChart {
  data?: {
    rate: number;
    name: string;
  }[];
  width?: number;
  height?: number;
}

export const PieChart = ({ data, width, height }: IPieChart) => {
  const domain = useMemo(() => {
    if (data) {
      return data.map((item) => item.name);
    }

    return [];
  }, [data]);

  const color = scaleOrdinal()
    .domain(domain)
    .range(["#F1892D", "#0EAC51", "#0077C0", "#7E349D", "#DA3C78", "#E74C3C"]);

  // const pieContainer = pie();

  const arcGenerator = arc<string>().innerRadius(0).outerRadius(200);
  const pieGenerator = pie();

  return (
    <svg width={width || 500} height={height || 500}>
      {data && (
        <g transform="translate(${width / 2}, ${height / 2})">
          <path d={arcGenerator()}></path>
        </g>
      )}
    </svg>
  );
};
