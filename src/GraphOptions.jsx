import Title from "./components/Title"
import GenericInput from "./components/GenericInput"
import PickedColour from "./components/PickedColour"
import { useState } from "react"
import GenericButton from "./components/GenericButton"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { useNavigate } from "react-router-dom"
import {TYPE_BAR, TYPE_LINE, TYPE_PIE, TYPE_ALL} from "./states/GraphOptionsStates"


const GraphOptions = () => {
    const [currColor, setCurrColor] = useState("#000000")
    const [pickedColors, setPickedColors] = useState([])
    const [graphType, setGraphType] = useState(TYPE_PIE)
    const navigate = useNavigate()

    const onConfirmPickedColor = () => {
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
        <div className="flex flex-col space-y-4">
            <div className="flex justify-center items-center">
                <Menu as="div" className="relative">
                    <MenuButton className="genericButton border rounded h-fit p-2 w-48 text-center">
                        {graphType}
                    </MenuButton>

                    <MenuItems className="absolute z-50 flex flex-col space-y-2">
                        {
                            TYPE_ALL.map((element) => {
                                return <MenuItem key={element.replace(" " + "-") + "-menuitem"}>
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
            <form 
                className="flex flex-col justify-start space-y-4 px-8 lg:px-40"
                onSubmit={(event) => {
                    event.preventDefault()
                    navigate('/graph-review/')
                }}   
                >
                <GenericInput labelText="X axis data" id="x-axis-data" type="text"></GenericInput>
                <GenericInput labelText="Y axis data" id="y-axis-data" type="text"></GenericInput>
                <div id="picked-colors-container" className="flex flex-col lg:flex-row w-full lg:space-x-4 min-h-24">
                    <div className="flex flex-row w-fit min-h-24">
                        <GenericInput labelText="Pick your colours" id="colour-input" type="color" dim="h-8 w-12 mr-8" onChange={onNewPickedColor}/>
                        <GenericButton label="Confirm color" dims="h-fit p-2 w-fit" onClick={onConfirmPickedColor}/>
                    </div>
                    <div id="picked-colors-container" className="grid grid-flow-row w-full grid-cols-3 lg:grid-cols-5 gap-4">
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
                <textarea
                    className='pasteArea border lg:w-full h-[20rem] lg:h-[25rem]'
                    placeholder="Prompt here" 
                />
                <input 
                    className='genericButton border rounded h-fit w-24 p-2 self-end mt-4' 
                    type='submit'>
                </input>
            </form>
        </div>
    </>
}

export default GraphOptions