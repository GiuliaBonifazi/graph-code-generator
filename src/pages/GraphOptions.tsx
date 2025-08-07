import Title from "./components/Title"
import TextInput from "./components/TextInput"


const GraphOptions = () => {
    return <>
        <Title title="Graph options"></Title>
        {/* TODO DATA PREVIEW */}
        <form className="flex flex-col justify-start">
            <TextInput labelText="X axis data" id="x-axis-data"></TextInput>
            <TextInput labelText="Y axis data" id="y-axis-data"></TextInput>
        </form>
    </>
}

export default GraphOptions