import { Disclosure} from "@headlessui/react";
import { Link } from "react-router-dom";


function Navbar() {
    return <Disclosure as="nav" className="lg:flex lg:p-4 lg:h-24 lg:items-center font-bold border-b mb-4">
        Welcome to the graph generator!
        <div className="lg:h-full lg:w-full lg:flex lg:content-center lg:justify-end ">
            <Link to="/" className="genericButton border rounded h-fit w-fit p-2 self-end">
                Choose new dataset
            </Link>
        </div>
    </Disclosure>
}

export default Navbar;