import {TYPE_BAR, TYPE_LINE, TYPE_PIE} from "../../../states/GraphTypeStates"
import {DEFAULT_QUERIES } from "./defaultQueries"
import { stripCriteria } from "../../conversions"

class QueryBuilder {
    constructor() {
        this.query = DEFAULT_QUERIES.QUERY
        this.colors = ""
        this.dataPlacement = ""
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

    setData(data) {
        const headers = data.headers.map(header => header.header)
        this.data = `${DEFAULT_QUERIES.DATA} headers:\n${headers}\nrows:\n${data.rows.map(row => JSON.stringify(row))}`
    }

    buildQueryForType(options, language, extra) {
        const type = options.optionsGraphType
        this.setColors(options.optionsColors)
        this.setData(options.uploadData)
        this.setType(type)
        this.query += this.type + this.data + this.colors
        switch (type) {
            case TYPE_BAR:
                const barData = DEFAULT_QUERIES.BARS + options.optionsBarData
                this.query += barData
            case TYPE_LINE:
                const xAxis = DEFAULT_QUERIES.XAXIS + options.optionsX
                const yAxis = DEFAULT_QUERIES.YAXIS + options.optionsY
                this.query += xAxis + yAxis
                break
            case TYPE_PIE:
                const slices = DEFAULT_QUERIES.SLICES + options.optionsSlices.toString()
                this.query += slices
                break
            default:
                break
        }
        this.query += this.tail + language + extra
        const finalQuery = this.query
        this.resetQuery()
        return finalQuery
    }

    buildQueryCriteriaCheck(graphs, criteria) {
        const strippedCriteria = JSON.stringify((JSON.parse(criteria).map(c => stripCriteria(c))))
        const query = `${DEFAULT_QUERIES.CRITERIA}
        ${strippedCriteria}
        These are the graphs:
        ${graphs.py}
        
        ${graphs.js}`
        return query
    }
}

export default QueryBuilder