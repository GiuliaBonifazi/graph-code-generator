import useReportStatsContext from "./hooks/useReportStatsContext"


const ReportStats = () => {
    const {reports} = useReportStatsContext()

    return <>
        <p>
            {
                reports
            }
        </p>
    </>
}

export default ReportStats