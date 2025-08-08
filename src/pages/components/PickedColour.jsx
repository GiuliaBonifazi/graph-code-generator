

function PickedColour(props) {
    return <>
        <div key={props.id} className={"rounded-full h-8 w-8"} style={{backgroundColor: props.color}}></div>
    </>
}

export default PickedColour