import { useState, createContext } from "react";

export const TYPE_PIE = "Pie chart"
export const TYPE_BAR = "Bar graph"
export const TYPE_LINE = "Line graph"
export const TYPE_DEFAULT = TYPE_PIE

export const TYPE_ALL = [TYPE_PIE, TYPE_BAR, TYPE_LINE]

const GraphFormContext = createContext({})

export const GraphFormProvider = ({ children }) => {
    const [options, setOptions] = useState({
        uploadData: "",
        optionsColors: [],
        optionsGraphType: "",
        optionsX: "",
        optionsY: "",
        optionsSlices: []
    })

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

        setOptions(data => ({
            ...data,
            [name]: value
        }))
    }

    const {
        optionsColors,
        optionsX,
        optionsY,
        optionsSlices,
        ...required
    } = options

    const canSubmit = () => {
        switch (options.optionsGraphType) {
            case TYPE_BAR, TYPE_LINE:
                return Object.values([optionsX, optionsY, ...required]).every(Boolean)
            case TYPE_PIE:
                return Object.values([optionsSlices, ...required]).every(Boolean)
            default:
                return false;
        }
    }

    const canToOptions = [...Object.keys(required)].filter(key => key.startsWith("upload")).map(key => options[key]).every(Boolean)

    return (
        <GraphFormContext.Provider value={{options, setOptions, canSubmit, canToOptions, handleChange}}>
            {children}
        </GraphFormContext.Provider>
    )
}

export default GraphFormContext