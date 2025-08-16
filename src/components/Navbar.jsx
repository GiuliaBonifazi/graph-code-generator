import { Disclosure, Menu, MenuItem, MenuItems, MenuButton} from "@headlessui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import gpt5_query from "../model/queries/chatgpt-queries"
import gemini_query from "../model/queries/gemini-queries"
import deepseek_query from "../model/queries/deepseek-queries"


function Navbar(props) {
    const [modelState, setModelState] = useState(props.modelDefault)

    return <Disclosure as="nav" className="flex p-2 lg:p-4 lg:h-24 items-center font-bold border-b mb-4">
        Welcome to the graph generator!
        <div className="h-full w-full flex flex-row content-center justify-end space-x-4">
            <Menu as="div" className="relative self-end">
                <MenuButton className="genericButton border rounded h-fit p-2 w-48 text-center">
                    {modelState}
                </MenuButton>

                <MenuItems className="absolute z-50 flex flex-col space-y-2">
                    {
                        props.modelAll.map((model) => {
                            return <MenuItem key={model + "-menuItem"}>
                                <a key={model + "-a"} 
                                className="genericButton border rounded h-fit p-2 w-24 text-center"
                                onClick={() => {
                                    setModelState(model)
                                    switch (model) {
                                        case props.modelDeepseek:
                                            deepseek_query("Say hi back");
                                            break;
                                        case props.modelGpt:
                                            gpt5_query("Say hi back");
                                            break;
                                        case props.modelGemini:
                                            gemini_query("Say hi back")
                                            break;
                                        default:
                                            console.log("Whoops! Pick a model")
                                    }
                                }}>
                                    {model}
                                </a>
                            </MenuItem>
                        })
                    }
                </MenuItems>
            </Menu>
            <Link to="/" className="genericButton border rounded h-fit w-fit p-2 self-end">
                Choose new dataset
            </Link>
        </div>
    </Disclosure>
}

export default Navbar;