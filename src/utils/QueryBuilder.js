import {TYPE_BAR, TYPE_LINE, TYPE_PIE} from "../states/GraphTypeStates"
import DEFAULT_QUERIES from "./queries/defaultQueries"

class QueryBuilder {
    constructor() {
        this.query = DEFAULT_QUERIES.QUERY
        this.colors = ""
        this.xAxis = ""
        this.yAxis = ""
        this.slices = ""
        this.data = ""
        this.tail = DEFAULT_QUERIES.TAIL
        this.type = ""
    }

    resetQuery() {
        this.query = DEFAULT_QUERIES.QUERY
    }

    setType(type) {
        this.type = DEFAULT_QUERIES.TYPE + type
    }

    setColors(colors) {
        this.colors = DEFAULT_QUERIES.COLORS + colors.toString()
    }

    setXAxis(xAxis) {
        this.xAxis = DEFAULT_QUERIES.XAXIS + xAxis
    }

    setYAxis(yAxis) {
        this.yAxis = DEFAULT_QUERIES.YAXIS + yAxis
    }

    setSlices(slices) {
        this.slices = DEFAULT_QUERIES.SLICES + slices.toString()
    }

    setData(data) {
        const headers = data.headers.map(header => header.header)
        this.data = `${DEFAULT_QUERIES.DATA} headers:\n${headers}\nrows:\n${data.rows.map(row => JSON.stringify(row))}`
    }

    buildQueryForType(options) {
        const type = options.optionsGraphType
        this.setColors(options.optionsColors)
        this.setData(options.uploadData)
        this.setType(type)
        this.query += this.type + this.data + this.colors
        switch (type) {
            case TYPE_BAR:
            case TYPE_LINE:
                this.setXAxis(options.optionsX)
                this.setYAxis(options.optionsY)
                this.query += this.xAxis + this.yAxis
                break
            case TYPE_PIE:
                this.setSlices(options.optionsSlices)
                this.query += this.slices
                break
            default:
                break
        }
        this.query += this.tail
        const finalQuery = this.query
        this.resetQuery()
        return finalQuery
    }
}

export default QueryBuilder