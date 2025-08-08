import GenericButton from "./GenericButton"


function PickedColour(props) {
    return <div className="flex flex-col space-y-2 items-center">
        <div key={props.id} className={"rounded-full h-8 w-8"} style={{backgroundColor: props.color}}></div>
        <GenericButton label={"Remove " + props.color} dims="h-fit w-20" onClick={() => {props.onRemove(props.color)}}></GenericButton>
    </div>
}

export default PickedColour