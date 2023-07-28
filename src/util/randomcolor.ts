export default function getRandomPrettyHexColor() {
    // Helper function to generate a random number between min and max (inclusive)
    function getRandomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    // Generate a random hue in the range [0, 360]
    const hue = getRandomInRange(0, 360);

    // Set fixed values for saturation and lightness
    const saturation = 50; // 0-100 (0% - 100%)
    const lightness = 50; // 0-100 (0% - 100%)

    // Convert HSL to RGB
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;

    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic (gray)
    } else {
        function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert the RGB values to a hex string
    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    return hexColor;
}