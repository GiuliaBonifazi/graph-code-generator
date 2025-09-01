import useReportStatsContext from "./hooks/useReportStatsContext"
import {TYPE_ALL} from "./states/GraphTypeStates"
import ReportGraph from "./components/report-graphs/ReportGraph"


const ReportStats = () => {
    const {reports, criteria} = useReportStatsContext()

    return <>
        {
            TYPE_ALL.map(type => {
                return <div key={type} className="flex flex-row">
                    <ReportGraph key={"true" + type} correct={true} graph_type={type}></ReportGraph>
                    <ReportGraph key={"false" + type} correct={false} graph_type={type}></ReportGraph>
                </div>
            })
        }
    </>
}

export default ReportStats