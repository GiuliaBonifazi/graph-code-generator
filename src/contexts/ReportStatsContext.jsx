import { useState, createContext, useEffect } from "react";
import select_all_reports from "../utils/queries/database/select_queries";

const ReportStatsContext = createContext({})

export const ReportStatsProvider = ({ children }) => {
    const [reports, setReports] = useState([])

    useEffect(() => {
        const queryRes = select_all_reports()

        if (queryRes) {
            setReports(queryRes)
        }
    })

    return (
        <ReportStatsContext.Provider value={{reports}}>
            {children}
        </ReportStatsContext.Provider>
    )
}