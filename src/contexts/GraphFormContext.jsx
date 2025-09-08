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
    })
    const [graphs, setGraphs] = useState({})
    const [criteria, setCriteria] = useState([])
    const [canSubmitReports, setCanSubmitReports] = useState(false)
    const [isPopUpOpen, setPopUpOpen] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")
    const [reset, setReset] = useState(true)

    const sendPopUP = (message) => {
        setPopUpMessage(message)
        setPopUpOpen(true)
    }

    useEffect(() => {
        if (reset) {
            const fetchCriteria = async () => {
                const queryRes = await select_all_criteria()
    
                if (queryRes) {
                    const withReport = queryRes.map(crit => addReportToCriterion(crit, options.optionsGraphType))
                    setCriteria(withReport)
                }
            }
            fetchCriteria()

            setGraphs({
                py: "Loading...",
                js: "Loading..."
            })

            setOptions(
                data => ({
                    ...data,
                    optionsX: "",
                    optionsY: "",
                    optionsSlices: "",
                    optionsBarData: [],
                })
            )

            setReset(false)
        }
    }, [reset])

    const handleChange = async e => {
        const name = e.target.name
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
                setReset(true)
            } else {
                sendPopUP(res.message)
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
        criteria.find(c => c.criterion_id == id).correct = value
    }

    const {
        optionsColors,
        optionsX,
        optionsY,
        optionsSlices,
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

        const finalQueryPython = queryBuilder.buildQueryForType(options, "Python")
        const finalQueryJS = queryBuilder.buildQueryForType(options, "JavaScript", "\nReturn the html with a script tag, \
            not pure javascript. Don't assume index.htmml exists")
        
        let responseJS = {
            ok: false,
            text: ""
        }
        let responsePython = {
            ok: false,
            text: ""
        }
        try {
            responseJS = await gemini_query(finalQueryJS)
        } catch {
            sendPopUP("Error fetching Gemini response. Please reload.")
        }

        try {
            responsePython = await gemini_query(finalQueryPython)
        } catch {
            sendPopUP("Error fetching Gemini response. Please reload.")
        }

        if (!responseJS.ok || !responsePython.ok) {
            sendPopUP("Error fetching Gemini response. Please reload.")
        } else {
            const graphs = {
                py: responsePython.text.replace("\`\`\`python","").replace("\`\`\`", "").trim(),
                js: responseJS.text.replace("\`\`\`html","").replace("\`\`\`", "").trim()
            }
    
            setGraphs(graphs)
            
            let newCriteria = {
                ok: false,
                text: ""
            }
            try {
                newCriteria = await gemini_query(queryBuilder.buildQueryCriteriaCheck(graphs, JSON.stringify(criteria)))
            } catch {
                sendPopUP("Error fetching Gemini response. Please reload.")
            }
    
            if (!newCriteria.ok) {
                setPopUpMessage("Error fetching Gemini criteria query response, please reload.")
                setPopUpOpen(true)
            } else {
                const parsedNewCriteria = JSON.parse(newCriteria.text.replace("\`\`\`json","").replace("\`\`\`", "").trim())
                if (newCriteria) {
                    setCriteria(parsedNewCriteria.map(crit => addReportToCriterion(crit, options.optionsGraphType)))
                    setCanSubmitReports(true)
                }
            }
    
        }

    }

    const onSubmitReports = () => {
        insert_reports(criteria.map(report => stripReportToInsert(report)))
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
            canSubmitReports,
            isPopUpOpen,
            setPopUpOpen,
            popUpMessage,
            criteria,
            graphs}}
        >
            {children}
        </GraphFormContext.Provider>
    )
}

export default GraphFormContext