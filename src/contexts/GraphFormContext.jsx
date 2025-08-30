import { useState, createContext } from "react";
import {TYPE_BAR, TYPE_LINE, TYPE_PIE, TYPE_DEFAULT} from "../states/GraphTypeStates"
import parseFile from "../utils/parsers";
import QueryBuilder from "../utils/queries/gemini/QueryBuilder"
import gemini_query from "../utils/queries/gemini/ai_queries";
import {DEFAULT_QUERIES} from "../utils/queries/gemini/defaultQueries";
import select_all_criteria from "../utils/queries/database/select_queries";

const GraphFormContext = createContext({})

export const GraphFormProvider = ({ children }) => {
    const [options, setOptions] = useState({
        uploadData: "",
        optionsColors: [],
        optionsGraphType: TYPE_DEFAULT,
        optionsX: "",
        optionsY: "",
        optionsSlices: [],
        optionsBarData: "",
        optionsPrompt: DEFAULT_QUERIES.QUERY,
        graphs: {
            py: "Loading...",
            js: "Loading..."
        },
        criteria: []
    })

    const handleChange = async e => {
        const name = e.target.name
        
        if (e.target.type == "file") {
            const res = await parseFile(e.target.files[0])
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

    const {
        optionsColors,
        optionsX,
        optionsY,
        optionsSlices,
        graphs,
        optionsBarData,
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

        const criteria = await select_all_criteria()
        setOptions(data => ({
                ...data,
                criteria: criteria
            })
        )

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

        const newCriteria = await gemini_query(queryBuilder.buildQueryCriteriaCheck(graphs, JSON.stringify(criteria)))
        if (newCriteria) {
            setOptions(data => ({
                ...data,
                criteria: JSON.parse(newCriteria.replace("\`\`\`json","").replace("\`\`\`", "").trim())
            }))
        }
    }

    const canToOptions = [...Object.keys(required)].filter(key => key.startsWith("upload")).map(key => options[key]).every(Boolean)

    return (
        <GraphFormContext.Provider value={{options, setOptions, canSubmit, canToOptions, handleChange, onSubmit}}>
            {children}
        </GraphFormContext.Provider>
    )
}

export default GraphFormContext