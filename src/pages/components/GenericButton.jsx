import { Button } from "@headlessui/react";

function GenericButton (
    props
) {
    return <Button className={"genericButton border rounded " + props.dims} onClick={props.onClick} disabled={props.disabled}>
        {props.label}
    </Button>
}

export default GenericButton