import { useState, createContext, useEffect } from "react";
import {TYPE_BAR, TYPE_LINE, TYPE_PIE, TYPE_DEFAULT} from "../states/GraphTypeStates"
import {parseFile, tryParseDsv} from "../utils/parsers";
import QueryBuilder from "../utils/queries/gemini/QueryBuilder"
import gemini_query from "../utils/queries/gemini/ai_queries";
import {select_all_criteria} from "../utils/queries/database/select_queries";
import {insert_reports} from "../utils/queries/database/insert_queries";
import {stripReportToInsert, addReportToCriterion} from "../utils/conversions"

const GraphFormContext = createContext({})

export const GraphFormProvider = ({ children }) => {
    const [options, setOptions] = useState({
        uploadData: "",
        optionsColors: [],
        optionsGraphType: TYPE_DEFAULT,
        optionsX: "",
        optionsY: "",
        optionsSlices: "",
        optionsBarData: [],
        graphs: {
            py: "Loading...",
            js: "Loading..."
        },
        criteria: []
    })
    const [canSubmitReports, setCanSubmitReports] = useState(false)

    useEffect(() => {
        const fetchCriteria = async () => {
            const queryRes = await select_all_criteria()

            if (queryRes) {
                const withReport = queryRes.map(crit => addReportToCriterion(crit, options.optionsGraphType))
                setOptions(data => ({
                        ...data,
                        criteria: withReport
                    })
                )
            }
        }
        fetchCriteria()
    }, [])

    const handleChange = async e => {
        const name = e.target.name
        console.log(e.target.value)
        if (name == "uploadData") {
            let res = null

            if (e.target.type == "file"){
                res = await parseFile(e.target.files[0])
            } else {
                res = tryParseDsv(e.target.value)
            }

            if (!res.hasFailed) {
                setOptions(data => ({
                    ...data,
                    [name]: res.data
                }))
            } else {
                console.log("Failed: " + res.message)
            }
        } else {
            const value = e.target.value
            setOptions(data => ({
                ...data,
                [name]: value
            }))
        }
    }

    const updateSingleCriterion = (e) => {
        const id = e.target.name
        const value = !e.target.checked
        options.criteria.find(c => c.criterion_id == id).correct = value
    }

    const {
        optionsColors,
        optionsX,
        optionsY,
        optionsSlices,
        graphs,
        optionsBarData,
        criteria,
        ...required
    } = options

    const canSubmit = () => {
        switch (options.optionsGraphType) {
            case TYPE_BAR:
                return Object.values([optionsBarData, ...required]).every(Boolean)
            case TYPE_LINE:
                return Object.values([optionsX, optionsY, ...required]).every(Boolean)
            case TYPE_PIE:
                return Object.values([optionsSlices, ...required]).every(Boolean)
            default:
                return false;
        }
    }

    const onSubmit = async () => {
        const queryBuilder = new QueryBuilder()

        const finalQueryPython = queryBuilder.buildQueryForType(options, "Python")
        const finalQueryJS = queryBuilder.buildQueryForType(options, "JavaScript", "\nReturn the html with a script tag, \
            not pure javascript. Don't assume index.htmml exists")

        const responseJS = await gemini_query(finalQueryJS)
        const responsePython = await gemini_query(finalQueryPython)

        const graphs = {
            py: responsePython.replace("\`\`\`python","").replace("\`\`\`", "").trim(),
            js: responseJS.replace("\`\`\`html","").replace("\`\`\`", "").trim()
        }

        setOptions(data => ({
            ...data,
            graphs: graphs,
        }))

        const newCriteria = await gemini_query(queryBuilder.buildQueryCriteriaCheck(graphs, JSON.stringify(options.criteria)))
        const parsedNewCriteria = JSON.parse(newCriteria.replace("\`\`\`json","").replace("\`\`\`", "").trim())
        if (newCriteria) {
            setOptions(data => ({
                ...data,
                criteria: parsedNewCriteria.map(crit => addReportToCriterion(crit, options.optionsGraphType))
            }))
            setCanSubmitReports(true)
        }
    }

    const onSubmitReports = () => {
        insert_reports(options.criteria.map(report => stripReportToInsert(report)))
        setCanSubmitReports(false)
    }

    const canToOptions = [...Object.keys(required)].filter(key => key.startsWith("upload")).map(key => options[key]).every(Boolean)

    return (
        <GraphFormContext.Provider value={{
            options, 
            setOptions, 
            canSubmit, 
            canToOptions, 
            handleChange, 
            onSubmit,
            updateSingleCriterion,
            onSubmitReports,
            canSubmitReports}}
        >
            {children}
        </GraphFormContext.Provider>
    )
}

export default GraphFormContext