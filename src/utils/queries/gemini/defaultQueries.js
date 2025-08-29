export const DEFAULT_QUERIES = {
    QUERY: `
        You will be given data in JSON format to write the code for
        a graph both in Python and JavaScript. Make it as accessible as possible. `,
    DATA: `
        Use the following data as content for the graph. Eliminate double quotes "" and any other charachter which would make
        the response JSON harder to parse, substituting them with a different font style if they make the data easier to comprehend 
        (ie if they encompass the title of a book). Don't include the data cleanup in the code. `,
    TYPE: `
        The graph needs to be of the type `,
    XAXIS: `
        The graph needs to have this data on the x axis: `,
    YAXIS: `
        The graph needs to have this data on the y axis: `,
    SLICES: `
        The pie chart needs to be divided in these slices: `,
    BARS: `
        The bars of the graph are decided by this data: `,
    COLORS: `
        The graph needs to be of these colours: `,
    TAIL: `
        Return the code for the graph in the following language, in a single file. Reply only with the code and nothing else: `,
    CRITERIA:`
        Using the criteria provided and checking them against the graph provided below them, return an array of JSON objects with the following fields.
        Only reply with the JSON, add nothing but the JSON. Only write the array without enclosing it inside an object.
        Do not reply with anything else but the JSON text. Here are the fields for each object in the array:
        - "level", which can have values "E" for a criterion that has not been respected, "W" for one whose correctness could not be determined or "C" for one that has been respected
        - "id", which contains the id of the respective criterion.
        - "desc", which contains the description of the respective criterion.
        - "name", which contains the name of the respective criterion
        The criteria are the following: 
        `
}

Object.freeze(DEFAULT_QUERIES)

export default {DEFAULT_QUERIES}