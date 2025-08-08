import Title from "./components/Title"
import GenericInput from "./components/GenericInput"
import PickedColour from "./components/PickedColour"
import { useState } from "react"
import GenericButton from "./components/GenericButton"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"


const GraphOptions = () => {
    const [currColor, setCurrColor] = useState("#000000")
    const [pickedColors, setPickedColors] = useState([])
    const [graphType, setGraphType] = useState(null)

    const onConfirmPickedColor = (event) => {
        if (currColor != null && !pickedColors.includes(currColor)) {
            setPickedColors([...pickedColors, currColor])
            setCurrColor(null)
        }
    }

    const onNewPickedColor = (event) => {
        setCurrColor(event.target.value)
    }

    const onRemoveColor = (color) => {
        setPickedColors(pickedColors.filter((element) => element != color))
    }

    return <>
        <Title title="Graph options"></Title>
        {/* TODO DATA PREVIEW */}
        <div className="flex justify-center items-center">
            <Menu as="div">
                <MenuButton className="genericButton border rounded h-fit p-2 w-48 text-center">
                    {graphType == null ? "Pick graph type" : graphType}
                </MenuButton>

                <MenuItems className="flex flex-col space-y-2">
                    {
                        ["Line graph", "Bar graph", "Pie chart"].map((element) => {
                            return <MenuItem >
                                <a
                                className="genericButton border rounded h-fit p-2 w-24 text-center"
                                onClick={() => setGraphType(element)}>
                                    {element}
                                </a>
                            </MenuItem>
                        }) 
                    }
                </MenuItems>
            </Menu>
        </div>
        <form className="flex flex-col justify-start space-y-4 pl-[10rem] pr-0">
            <GenericInput labelText="X axis data" id="x-axis-data" type="text"></GenericInput>
            <GenericInput labelText="Y axis data" id="y-axis-data" type="text"></GenericInput>
            <div id="picked-colors-container" className="flex flex-row w-fit space-x-8">
                <GenericInput labelText="Pick your colours" id="colour-input" type="color" dim="h-8 w-12" onChange={onNewPickedColor}/>
                <GenericButton label="Confirm color" dims="h-fit p-2 w-fit" onClick={onConfirmPickedColor}/>
                <div id="picked-colors-container" className="grid grid-flow-row grid-cols-5 gap-4">
                    {
                        pickedColors.map((color) => {
                            return <PickedColour 
                                key={color} 
                                color={color} 
                                onRemove={onRemoveColor}>
                            </PickedColour>
                        })
                    }
                </div>
            </div>
        </form>
    </>
}

export default GraphOptions