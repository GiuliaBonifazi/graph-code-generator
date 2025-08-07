import { Button } from "@headlessui/react";

interface GenericButtonProps {
    label: string,
    dims: string,
    onClick? : React.MouseEventHandler
}

function GenericButton (
    {label, dims, onClick} : GenericButtonProps
) {
    return <Button className={"genericButton border rounded " + dims} onClick={onClick}>
        {label}
    </Button>
}

export default GenericButton