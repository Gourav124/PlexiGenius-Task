export type FontWeights = {
    regular: number;
    bold: number;
    boldAlt: number;
};

export const fonts: { family: string; weights: FontWeights } = {
    family:
        "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    weights: {
        regular: 400,
        bold: 700,
        boldAlt: 700,
    },
};

export default fonts;