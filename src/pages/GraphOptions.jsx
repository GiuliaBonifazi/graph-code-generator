import Title from "./components/Title"
import GenericInput from "./components/GenericInput"
import PickedColour from "./components/PickedColour"
import { useState } from "react"
import GenericButton from "./components/GenericButton"


const GraphOptions = () => {
    const [currColor, setCurrColor] = useState(null)
    const [pickedColors, setPickedColors] = useState([])

    const onConfirmPickedColor = (event) => {
        if (currColor != null) {
            setPickedColors([...pickedColors, currColor])
            console.log(pickedColors)
            setCurrColor(null)
        }
    }

    const onNewPickedColor = (event) => {
        setCurrColor(event.target.value)
    }

    return <>
        <Title title="Graph options"></Title>
        {/* TODO DATA PREVIEW */}
        
        <form className="flex flex-col justify-start space-y-4 pl-[10rem] pr-0">
            <GenericInput labelText="X axis data" id="x-axis-data" type="text"></GenericInput>
            <GenericInput labelText="Y axis data" id="y-axis-data" type="text"></GenericInput>
            <div id="picked-colors-container" className="flex flex-row w-fit space-x-8">
                <GenericInput labelText="Pick your colours" id="colour-input" type="color" dim="h-8 w-12" onChange={onNewPickedColor}/>
                <GenericButton label="Confirm color" dims="h-fit p-2 w-fit" onClick={onConfirmPickedColor}/>
                <div id="picked-colors-container" className="grid grid-flow-row grid-cols-5 gap-4">
                    {
                        pickedColors.map((color, index) => {
                            return <PickedColour key={"colour-number-" + index} color={color}></PickedColour>
                        })
                    }
                </div>
            </div>
        </form>
    </>
}

export default GraphOptions