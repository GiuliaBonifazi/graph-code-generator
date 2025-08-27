import { useContext, useState } from "react";
import {TYPE_BAR, TYPE_LINE, TYPE_PIE} from "../states/GraphTypeStates";
import GenericInput from "./GenericInput";
import GenericButton from "./GenericButton";
import useGraphFormContext from "../hooks/useGraphFormContext";


function DataPlacementInput() {
    const [currSlice, setCurrSlice] = useState(null)

    const {options, handleChange} = useGraphFormContext()

    const onConfirmSlice = () => {
        if (currSlice != "" && currSlice != null) {
            handleChange({
                target: {
                    name: "optionsSlices",
                    type: "text",
                    value: [...options.optionsSlices, currSlice]
                }
            })
            setCurrSlice(null)
        }
    }

    const onRemoveSlice = (slice) => {
        handleChange({
                target: {
                    name: "optionsSlices",
                    type: "text",
                    value: options.optionsSlices.filter((el) => el != slice)
                }
            })
    }

    if (options.optionsGraphType == TYPE_LINE) {
        return <>
            <GenericInput labelText="X axis data:" id="x-axis-data" type="text" name="optionsX" onChange={handleChange}></GenericInput>
            <GenericInput labelText="Y axis data:" id="y-axis-data" type="text" name="optionsY" onChange={handleChange}></GenericInput>
        </>
    } else if (options.optionsGraphType == TYPE_PIE) {
        return <div className="flex flex-col lg:flex-row w-full lg:space-x-4 space-y-4 min-h-24">
            <div className="flex flex-row space-x-2">
                <GenericInput labelText="Slices:" id="data-slice" type="text" onChange={(event) => setCurrSlice(event.target.value)}></GenericInput>
                <GenericButton label="Confirm" dims="w-fit h-fit p-2" onClick={onConfirmSlice}></GenericButton>
            </div>
            <div className="grid grid-flow-row w-full grid-cols-3 lg:grid-cols-5 gap-4">
                {
                    options.optionsSlices.map((slice) => {
                        return <div key={slice + "-div"} className="flex flex-col space-y-2 items-center border rounded h-fit w-fit p-2">
                            <p className="text-center">{slice}</p>
                            <GenericButton label={"Remove " + slice} dims="h-fit w-20" onClick={() => {onRemoveSlice(slice)}}></GenericButton>
                        </div>
                    })
                }
            </div>
        </div>
    } else if  (options.optionsGraphType == TYPE_BAR) {
        return <>
            <GenericInput labelText="Bar data: " id="bar-data" type="text" name="optionsBarData" onChange={handleChange}></GenericInput>
        </>
    }
}

export default DataPlacementInput