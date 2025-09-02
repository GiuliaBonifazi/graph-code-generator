import {Title} from "./components/Title"
import GenericInput from "./components/GenericInput"
import PickedColour from "./components/PickedColour"
import DataPlacementInput from "./components/DataPlacementInput"
import { useState } from "react"
import GenericButton from "./components/GenericButton"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { useNavigate } from "react-router-dom"
import useGraphFormContext from "./hooks/useGraphFormContext"
import {TYPE_ALL} from "./states/GraphTypeStates"
import DataTable from "./components/table/DataTable"


const GraphOptions = () => {
    const [currColor, setCurrColor] = useState("#000000")
    const [pickedColors, setPickedColors] = useState([])
    const navigate = useNavigate()

    const {handleChange, canSubmit, options, onSubmit} = useGraphFormContext()

    const onConfirmPickedColor = () => {
        if (currColor != null && !pickedColors.includes(currColor)) {
            setPickedColors([...options.optionsColors, currColor])
            handleChange({
                target: {
                    name: "optionsColors",
                    type: "text",
                    value: [...options.optionsColors, currColor]
                }
            })
            setCurrColor(null)
        }
    }

    const onNewPickedColor = (event) => {
        setCurrColor(event.target.value)
    }

    const onRemoveColor = (color) => {
        handleChange({
            target: {
                name: "optionsColors",
                type: "text",
                value: options.optionsColors.filter((element) => element != color)
            }
        })
    }

    return <>
        <Title title="Graph options"></Title>
        <div className="flex flex-col space-y-4">
            <div className="flex justify-center items-center">
                <Menu as="div" className="relative">
                    <MenuButton className="genericButton border rounded h-fit p-2 w-48 text-center">
                        {options.optionsGraphType}
                    </MenuButton>

                    <MenuItems className="absolute z-50 flex flex-col space-y-2">
                        {
                            TYPE_ALL.map((element) => {
                                return <MenuItem key={element.replace(" " + "-") + "-menuitem"}>
                                    <a
                                    className="genericButton border rounded h-fit p-2 w-24 text-center"
                                    onClick={() => {
                                        handleChange({
                                            target: {
                                                name: "optionsGraphType",
                                                type: "menuItem",
                                                value: element
                                            }
                                        })
                                    }}>
                                        {element}
                                    </a>
                                </MenuItem>
                            }) 
                        }
                    </MenuItems>
                </Menu>
            </div>
            <form 
                className="flex flex-col justify-start space-y-4 mx-8 lg:mx-40"
                onSubmit={(event) => {
                    event.preventDefault()
                    onSubmit()
                    navigate('/graph-review/')
                }}   
                >
                <div className="w-full flex flex-row justify-center items-center">
                    <div className="overflow-auto h-[15rem] lg:h-[20rem] w-fit">
                        <DataTable></DataTable>
                    </div>
                </div>
                <DataPlacementInput></DataPlacementInput>
                <div id="picked-colors-container" className="flex flex-col lg:flex-row w-full lg:space-x-4 min-h-24">
                    <div className="flex flex-row w-fit min-h-24">
                        <GenericInput labelText="Pick your colours" id="colour-input" type="color" dim="h-8 w-12 mr-8" onChange={onNewPickedColor}/>
                        <GenericButton label="Confirm color" dims="h-fit p-2 w-fit" onClick={onConfirmPickedColor}/>
                    </div>
                    <div className="grid grid-flow-row w-full grid-cols-3 lg:grid-cols-5 gap-4">
                        {
                            options.optionsColors.map((color) => {
                                return <PickedColour 
                                    key={color} 
                                    color={color} 
                                    onRemove={onRemoveColor}>
                                </PickedColour>
                            })
                        }
                    </div>
                </div>
                <input 
                    className='genericButton border rounded h-fit w-24 p-2 self-end mt-4' 
                    type='submit'>
                </input>
            </form>
        </div>
    </>
}

export default GraphOptions