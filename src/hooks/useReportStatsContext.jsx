import { useContext } from "react"
import ReportStatsContext from "../contexts/ReportStatsContext"


const useReportStatsContext = () => {
    const context = useContext(ReportStatsContext)
    if (!context) {
        throw new Error("useReportStatsContext must be used within a ReportStatsProvider")
    }
    return context
}

export default useReportStatsContext