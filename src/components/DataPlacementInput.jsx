import { useContext, useState } from "react";
import {TYPE_BAR, TYPE_LINE, TYPE_PIE} from "../states/GraphTypeStates";
import GenericInput from "./GenericInput";
import GenericButton from "./GenericButton";
import useGraphFormContext from "../hooks/useGraphFormContext";
import SelectInput from "./SelectInput";


function DataPlacementInput() {
    const [currBar, setcurrBar] = useState(null)

    const {options, handleChange} = useGraphFormContext()

    const onSelectCurrBar = (event) => setcurrBar(event.target.value)

    const onConfirmBar = () => {
        if (currBar != "" && currBar != null && !options.optionsBarData.includes(currBar)) {
            handleChange({
                target: {
                    name: "optionsBarData",
                    type: "text",
                    value: [...options.optionsBarData, currBar]
                }
            })
            setcurrBar(null)
        }
    }

    const onRemoveBar = (slice) => {
        handleChange({
                target: {
                    name: "optionsBarData",
                    type: "text",
                    value: options.optionsBarData.filter((el) => el != slice)
                }
            })
    }

    if (options.optionsGraphType == TYPE_LINE) {
        return <>
            <SelectInput
                label="X axis data: "
                inputName="optionsX"
                onClick={handleChange}
                values={options.uploadData.headers}
                currValue={options.optionsX}>
            </SelectInput>
            <SelectInput
                label="Y axis data: "
                inputName="optionsY"
                onClick={handleChange}
                values={options.uploadData.headers}
                currValue={options.optionsY}>
            </SelectInput>
        </>
    } else if (options.optionsGraphType == TYPE_PIE) {
        return <SelectInput 
            inputName="optionsSlices" 
            values={options.uploadData.headers} 
            onClick={handleChange} 
            currValue={options.optionsSlices}
            label="Slices: ">
        </SelectInput>
    } else if  (options.optionsGraphType == TYPE_BAR) {
        return <div className="flex flex-col items-center w-full space-y-4 min-h-24 border rounded p-4">
            <div className="flex flex-row space-x-2">
                <SelectInput
                    label="Bars: "
                    onClick={onSelectCurrBar}
                    values={options.uploadData.headers}
                    currValue={currBar}>
                </SelectInput>
                <GenericButton label="Confirm" dims="w-fit h-fit p-2" onClick={onConfirmBar}></GenericButton>
            </div>
            <div className="grid grid-flow-row w-full grid-cols-3 lg:grid-cols-5 gap-4">
                {
                    options.optionsBarData.map((bar) => {
                        return <div key={bar + "-div"} className="flex flex-col space-y-2 items-center border rounded h-fit w-fit p-2">
                            <p className="text-center">{bar}</p>
                            <GenericButton label={"Remove " + bar} dims="h-fit w-20" onClick={() => {onRemoveBar(bar)}}></GenericButton>
                        </div>
                    })
                }
            </div>
        </div>
    }
}

export default DataPlacementInput