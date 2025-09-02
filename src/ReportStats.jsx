import useReportStatsContext from "./hooks/useReportStatsContext"
import {TYPE_ALL} from "./states/GraphTypeStates"
import ReportGraph from "./components/report-graphs/ReportGraph"
import ReportGraphContainer from "./components/report-graphs/ReportGraphContainer"
import { Title } from "./components/Title"


const ReportStats = () => {
    const {reports, criteria} = useReportStatsContext()

    return <>
        <Title title="Report Statistics"></Title>
        <div className="flex flex-col space-y-8  px-8">
            {
                TYPE_ALL.map(type => {
                    return <ReportGraphContainer key={type + "container"} type={type}></ReportGraphContainer>
                })
            }
        </div>
    </>
}

export default ReportStats