import { useState, createContext, useEffect } from "react";
import { select_all_criteria, select_all_reports } from "../utils/queries/database/select_queries";

const ReportStatsContext = createContext({})

export const ReportStatsProvider = ({ children }) => {
    const [reports, setReports] = useState([])
    const [criteria, setCriteria] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const crit = await select_all_criteria()

            if (crit) {
                setCriteria(crit)
            
                const queryRes = await select_all_reports();
                if (queryRes) {
                    const mappedRes = queryRes.map((report) => ({
                        ...report,
                        criterion_name: crit.find(c => c.id === report.criterion_id)?.name || "Unknown"
                    }));
                    setReports(mappedRes);
                }
            }
        }

        fetchData()
    }, [])

    return (
        <ReportStatsContext.Provider value={{reports, criteria}}>
            {children}
        </ReportStatsContext.Provider>
    )
}

export default ReportStatsContext