import { useState, createContext, useEffect } from "react";
import { select_all_criteria, select_all_reports } from "../utils/queries/database/select_queries";
import {countBy} from "../utils/arrays"
import {LEVEL_ALL} from "../states/ReportLevelStates"

const ReportStatsContext = createContext({})

export const ReportStatsProvider = ({ children }) => {
    const [reports, setReports] = useState([])
    const [criteriaLabels, setCriteriaLabels] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const crit = await select_all_criteria()

            if (crit) {
                const queryRes = await select_all_reports();
                if (queryRes) {
                    const mappedRes = queryRes.map((report) => ({
                        ...report,
                        criterion_name: crit.find(c => c.id === report.criterion_id).name
                    }));
                    setReports(mappedRes);
                    setCriteriaLabels(crit.map(c => c.name))
                }
            }
        }

        fetchData()
    }, [])

    const getReportsForGraphsByTypeAndCorrect = (type, correct) => {
        const dividedByTypeAndCorrect = reports
            .filter(r => r.correct == correct )
            .filter(r => r.graph_type_name == type)
            .map(r => ({
                level: r.level,
                cr_name: r.criterion_name
            }))
        const dividedByLevels = LEVEL_ALL.map(level => ({
            [level]: countBy(dividedByTypeAndCorrect.filter(r => r.level == level), "cr_name")
        }))

        return Object.assign({}, ...dividedByLevels)
    }

    return (
        <ReportStatsContext.Provider value={{criteriaLabels, getReportsForGraphsByTypeAndCorrect}}>
            {children}
        </ReportStatsContext.Provider>
    )
}

export default ReportStatsContext