export const DEFAULT_QUERIES = {
    QUERY: `
        You will be given data in JSON format to write the code for
        a graph both in Python and JavaScript. Make it as accessible as possible. `,
    DATA: `
        Use this data as content for the graph: `,
    TYPE: `
        The graph needs to be of the type `,
    XAXIS: `
        The graph needs to have this data on the x axis: `,
    YAXIS: `
        The graph needs to have this data on the y axis: `,
    SLICES: `
        The pie chart needs to be divided in these slices: `,
    COLORS: `
        The graph needs to be of these colours: `,
    TAIL: `
        return the code for the graph in a JSON object with fields python and js like so:
        {"python": "python code", "js": "javascript code"}
    `
}

Object.freeze(DEFAULT_QUERIES)

export default DEFAULT_QUERIES