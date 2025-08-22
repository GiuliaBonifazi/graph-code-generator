import { useState, createContext } from "react";
import {TYPE_BAR, TYPE_LINE, TYPE_PIE, TYPE_DEFAULT} from "../states/GraphTypeStates"
import parseFile from "../utils/parsers";
import QueryBuilder from "../utils/QueryBuilder"
import gemini_query from "../utils/queries";
import {DEFAULT_QUERIES,  CRITERIA_TO_CHECK} from "../utils/queries/defaultQueries";

const GraphFormContext = createContext({})

export const GraphFormProvider = ({ children }) => {
    const [options, setOptions] = useState({
        uploadData: "",
        optionsColors: [],
        optionsGraphType: TYPE_DEFAULT,
        optionsX: "",
        optionsY: "",
        optionsSlices: [],
        optionsPrompt: DEFAULT_QUERIES.QUERY,
        graphs: {
            py: "Loading...",
            js: "Loading..."
        },
        criteria: CRITERIA_TO_CHECK
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
        ...required
    } = options

    const canSubmit = () => {
        switch (options.optionsGraphType) {
            case TYPE_BAR:
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
        const finalQueryJS = queryBuilder.buildQueryForType(options, "JavaScript")

        const responseJS = await gemini_query(finalQueryJS)

        const responsePython = await gemini_query(finalQueryPython)

        setOptions(data => ({
            ...data,
            graphs: {
                py: responsePython.replace("\`\`\`python","").replace("\`\`\`", "").trim(),
                js: responseJS.replace("\`\`\`html","").replace("\`\`\`", "").trim()
            }
        }))


    }

    const canToOptions = [...Object.keys(required)].filter(key => key.startsWith("upload")).map(key => options[key]).every(Boolean)

    return (
        <GraphFormContext.Provider value={{options, setOptions, canSubmit, canToOptions, handleChange, onSubmit}}>
            {children}
        </GraphFormContext.Provider>
    )
}

export default GraphFormContext