
interface GenericInputProps {
    labelText: string,
    id: string,
    type: string,
    dim?: string
}

function GenericInput(
    {labelText, id, type, dim} : GenericInputProps
) {
    return <div className="px-[10rem] w-fit space-x-4">
        <label htmlFor={id}>{labelText}</label>
        <input id={id} type={type} className={"pasteArea border rounded " + (dim == null ?  "w-40 h-fit" : dim)}/>
    </div>
}

export default GenericInput