import { useContext, useState } from "react";
import {GraphTypeContext, TYPE_BAR, TYPE_LINE, TYPE_PIE} from "../contexts/GraphTypeContext";
import GenericInput from "./GenericInput";
import GenericButton from "./GenericButton";


function DataPlacementInput(props) {
    const [currSlice, setCurrSlice] = useState(null)
    const [pickedSlices, setPickedSlices] = useState([])

    const onConfirmSlice = () => {
        if (currSlice != "" && currSlice != null) {
            setPickedSlices([...pickedSlices, currSlice])
            setCurrSlice(null)
        }
    }

    const onRemoveSlice = (slice) => {
        setPickedSlices(pickedSlices.filter((el) => el != slice))
    }

    if (props.type == TYPE_BAR || props.type == TYPE_LINE) {
        return <>
            <GenericInput labelText="X axis data:" id="x-axis-data" type="text"></GenericInput>
            <GenericInput labelText="Y axis data:" id="y-axis-data" type="text"></GenericInput>
        </>
    } else if (props.type == TYPE_PIE) {
        return <div className="flex flex-col lg:flex-row w-full lg:space-x-4 space-y-4 min-h-24">
            <div className="flex flex-row space-x-2">
                <GenericInput labelText="Slices:" id="data-slice" type="text" onChange={(event) => setCurrSlice(event.target.value)}></GenericInput>
                <GenericButton label="Confirm" dims="w-fit h-fit p-2" onClick={onConfirmSlice}></GenericButton>
            </div>
            <div className="grid grid-flow-row w-full grid-cols-3 lg:grid-cols-5 gap-4">
                {
                    pickedSlices.map((slice) => {
                        return <div key={slice + "-div"} className="flex flex-col space-y-2 items-center border rounded h-fit w-fit p-2">
                            <p className="text-center">{slice}</p>
                            <GenericButton label={"Remove " + slice} dims="h-fit w-20" onClick={() => {onRemoveSlice(slice)}}></GenericButton>
                        </div>
                    })
                }
            </div>
        </div>
    }
}

export default DataPlacementInput