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
  const [measure, setMeasure] = useState<IDomMeasure | undefined>();

  useEffect(() => {
    if (ref.current) {
      const { clientWidth: width, clientHeight: height } = ref.current;

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
    }
  }, [ref, ml, mr, mt, mb]);

  return {
    measure,
    ref,
  };
};
