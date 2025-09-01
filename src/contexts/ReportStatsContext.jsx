import { useState, createContext, useEffect } from "react";
import { select_all_criteria, select_all_reports } from "../utils/queries/database/select_queries";

const ReportStatsContext = createContext({})

export const ReportStatsProvider = ({ children }) => {
    const [reports, setReports] = useState([])
    const [criteria, setCriteria] = useState([])

    useEffect(() => {
        const fetchCriteria = async () => {
            const queryRes = await select_all_criteria()

            if(queryRes) {
                setCriteria(queryRes)
            }
        }

        fetchCriteria()
    }, [setCriteria])

    useEffect(() => {
        const fetchReports = async () => {
            const queryRes = await select_all_reports();

            if (queryRes && criteria) {
                const mappedRes = queryRes.map((report) => ({
                    ...report,
                    criterion_name: criteria.find(c => c.id === report.criterion_id)?.name || "Unknown"
                }));
                setReports(mappedRes);
            }
        };

        fetchReports();
    }, [criteria]);

    return (
        <ReportStatsContext.Provider value={{reports}}>
            {children}
        </ReportStatsContext.Provider>
    )
}

export default ReportStatsContext