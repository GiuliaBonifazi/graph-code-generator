import Title from "./components/Title"
import GenericInput from "./components/GenericInput"


const GraphOptions = () => {
    return <>
        <Title title="Graph options"></Title>
        {/* TODO DATA PREVIEW */}
        <form className="flex flex-col justify-start space-y-4">
            <GenericInput labelText="X axis data" id="x-axis-data" type="text"></GenericInput>
            <GenericInput labelText="Y axis data" id="y-axis-data" type="text"></GenericInput>
            <div className="flex flex-row w-fit space-x-2">
                <GenericInput labelText="Pick your colours" id="colour-input" type="color" dim="h-8 w-12"/>
            </div>
        </form>
    </>
}

export default GraphOptions