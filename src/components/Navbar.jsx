import { Disclosure} from "@headlessui/react";
import { Link } from "react-router-dom";


function Navbar() {
    return <Disclosure as="nav" className="flex p-2 lg:p-4 lg:h-24 items-center font-bold border-b mb-4">
        Welcome to the graph generator!
        <div className="h-full w-full flex content-center justify-end ">
            <Link to="/" className="genericButton border rounded h-fit w-fit p-2 self-end">
                Choose new dataset
            </Link>
        </div>
    </Disclosure>
}

export default Navbar;