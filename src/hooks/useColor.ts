export const useInvertColor = () => {
  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // return {r, g, b}
    return { r, g, b };
  };

  function brightenColor(hexColor: string | null, brightness = 30) {
    if (!hexColor) return "";

    // Convert hex color to RGB values
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    // Increase the RGB values to create a brighter color
    const newRed = Math.min(
      parseInt(String(red + (red * brightness) / 100)),
      255
    );
    const newGreen = Math.min(
      parseInt(String(green + (green * brightness) / 100)),
      255
    );
    const newBlue = Math.min(
      parseInt(String(blue + (blue * brightness) / 100)),
      255
    );

    // Convert RGB values back to hex color code
    const newHexColor = `#${newRed.toString(16)}${newGreen.toString(
      16
    )}${newBlue.toString(16)}`;

    return newHexColor;
  }

  function invertColor(hex: string | null, bw: boolean, gamma = 400) {
    if (!hex) return "";

    if (hex.indexOf("#") === 0) {
      const { r, g, b } = hex2rgb(hex);
      hex = `rgb(${r}, ${g}, ${b})`;
    }

    const rgbRegex = new RegExp(/rgb\((.+),(.+),(.+)\)/);
    const excuted = rgbRegex.exec(hex);

    if (excuted) {
      const rawR = excuted[1];
      const rawG = excuted[2];
      const rawB = excuted[3];

      // invert color components
      const r = parseInt(rawR, 16);
      const g = parseInt(rawG, 16);
      const b = parseInt(rawB, 16);

      if (bw) {
        return r * 0.299 + g * 0.587 + b * 0.114 > gamma
          ? "#000000"
          : "#FFFFFF";
      }
    }
    return "";
  }

  return { invertColor, brightenColor };
};
