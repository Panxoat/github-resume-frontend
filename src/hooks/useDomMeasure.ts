import { useEffect, useRef, useState } from "react";

export interface IDomMeasure {
  width?: number;
  height?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  boundedWidth?: number;
  boundedHeight?: number;
}

interface IMeasure {
  width: number;
  height: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  boundedWidth: number;
  boundedHeight: number;
}

export const useDomMeasure = ({
  ml = 0,
  mr = 0,
  mt = 0,
  mb = 0,
}: {
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [measure, setMeasure] = useState<IMeasure | undefined>();

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        const entrie = entries[0];

        const { width, height } = entrie.contentRect;

        setMeasure({
          width,
          height,
          marginBottom: mb,
          marginLeft: ml,
          marginRight: mr,
          marginTop: mt,
          boundedWidth: width - ml - mr,
          boundedHeight: height - mt - mb,
        });
      });

      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [ref, ml, mr, mt, mb]);

  return {
    measure,
    ref,
  };
};
