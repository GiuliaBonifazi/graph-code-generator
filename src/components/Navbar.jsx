import { Disclosure, Menu, MenuItem, MenuItems, MenuButton} from "@headlessui/react";
import { Link } from "react-router-dom";


function Navbar(props) {

    return <Disclosure as="nav" className="flex p-2 lg:p-4 lg:h-24 items-center font-bold border-b mb-4">
        Welcome to the graph generator!
        <div className="h-full w-full flex flex-row content-center justify-end space-x-4">
            <Link to="/" className="genericButton border rounded h-fit w-fit p-2 self-end text-center">
                Choose new dataset
            </Link>
            <Link to="/" className="genericButton border rounded h-fit w-fit p-2 self-end text-center">
                See report stats
            </Link>
        </div>
    </Disclosure>
}

export default Navbar;