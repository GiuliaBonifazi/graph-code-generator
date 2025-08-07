
interface TextInputProps {
    labelText: string,
    id: string
}

function TextInput(
    {labelText, id} : TextInputProps
) {
    return <div className="px-[10rem] space-x-4">
        <label htmlFor={id}>{labelText}</label>
        <input id={id} type="text" className="pasteArea border rounded w-40 h-fit mt-4"></input>
    </div>
}

export default TextInput