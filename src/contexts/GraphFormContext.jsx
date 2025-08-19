import { useState, createContext } from "react";
import {TYPE_BAR, TYPE_LINE, TYPE_PIE, TYPE_ALL, TYPE_DEFAULT} from "../states/GraphTypeStates"

const GraphFormContext = createContext({})

export const GraphFormProvider = ({ children }) => {
    const [options, setOptions] = useState({
        uploadData: "",
        optionsColors: [],
        optionsGraphType: TYPE_DEFAULT,
        optionsX: "",
        optionsY: "",
        optionsSlices: [],
        optionsPrompt: "Hi there!"
    })

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

        setOptions(data => ({
            ...data,
            [name]: value
        }))

        console.log(name, value, options)
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
            case TYPE_BAR:
            case TYPE_LINE:
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