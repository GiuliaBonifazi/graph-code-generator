import { useState, createContext } from "react";
import {TYPE_BAR, TYPE_LINE, TYPE_PIE, TYPE_DEFAULT} from "../states/GraphTypeStates"
import parseFile from "../utils/parsers";
import QueryBuilder from "../utils/QueryBuilder"
import gemini_query from "../utils/queries";
import DEFAULT_QUERIES from "../utils/queries/defaultQueries";

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
        graphs: {}
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
        const finalQuery = queryBuilder.buildQueryForType(options)
        const response = await gemini_query(finalQuery)
        options.graphs = JSON.parse(response.replace("\`\`\`json","").replace("\`\`\`", ""))
        console.log(options.graphs)
    }

    const canToOptions = [...Object.keys(required)].filter(key => key.startsWith("upload")).map(key => options[key]).every(Boolean)

    return (
        <GraphFormContext.Provider value={{options, setOptions, canSubmit, canToOptions, handleChange, onSubmit}}>
            {children}
        </GraphFormContext.Provider>
    )
}

export default GraphFormContext