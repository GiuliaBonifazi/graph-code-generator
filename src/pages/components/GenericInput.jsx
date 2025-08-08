function GenericInput(
    props
) {
    return <div className="px-[10rem] w-fit space-x-4">
        <label htmlFor={props.id}>{props.labelText}</label>
        <input id={props.id} type={props.type} className={"pasteArea border rounded " + (props.dim == null ?  "w-40 h-fit" : props.dim)}/>
    </div>
}

export default GenericInput