import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"

const SelectInput = ({values, onClick, currValue, inputName, label}) => {
    return <>
        <div className="flex flex-row space-x-4">
            <label>{label}</label>
            <Menu as="div" className="relative">
                <MenuButton className="genericButton border rounded h-fit p-2 w-48 text-center">
                    {currValue ? currValue : "Choose a value"}
                </MenuButton>

                <MenuItems className="absolute z-50 flex flex-col border rounded">
                    {
                        values.map((value) => {
                            return <MenuItem key={value.header.replace(" " + "-") + "-menuitem"}>
                                <button
                                name={inputName}
                                value={value.header}
                                type="button"
                                className="genericButton h-fit p-2 w-24 text-center border"
                                onClick={onClick}
                                tabIndex={0}>
                                    {value.header}
                                </button>
                            </MenuItem>
                        }) 
                    }
                </MenuItems>
            </Menu>
        </div>
    </>
}

export default SelectInput