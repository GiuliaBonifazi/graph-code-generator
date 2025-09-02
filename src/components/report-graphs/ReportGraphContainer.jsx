import ReportGraph from "./ReportGraph"

const ReportGraphContainer = ({type}) => {
    return <div>
        <h2>{type}</h2>
        <div className="flex flex-col lg:flex-row space-x-8">
            <ReportGraph key={"true" + type} correct={true} graph_type={type}></ReportGraph>
            <ReportGraph key={"false" + type} correct={false} graph_type={type}></ReportGraph>
        </div>
    </div>
}

export default ReportGraphContainer