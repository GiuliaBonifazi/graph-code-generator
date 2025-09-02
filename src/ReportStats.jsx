import useReportStatsContext from "./hooks/useReportStatsContext"
import {TYPE_ALL} from "./states/GraphTypeStates"
import ReportGraph from "./components/report-graphs/ReportGraph"
import ReportGraphContainer from "./components/report-graphs/ReportGraphContainer"
import { Title } from "./components/Title"


const ReportStats = () => {
    const {reports, criteria} = useReportStatsContext()

    return <>
        <Title title="Report Statistics"></Title>
        {
            TYPE_ALL.map(type => {
                return <ReportGraphContainer key={type + "container"} type={type}></ReportGraphContainer>
            })
        }
    </>
}

export default ReportStats