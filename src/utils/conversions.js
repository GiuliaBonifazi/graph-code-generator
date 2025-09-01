

export function addReportToCriterion(criterion, graphType) {
    return {
        name: criterion.name,
        description: criterion.description,
        criterion_id: criterion.id,
        level: criterion.level ? criterion.level : "W",
        correct: true,
        graph_type_name: graphType
    }
}

export function stripReportToInsert(report) {
    return {
        criterion_id: report.criterion_id,
        level: report.level,
        correct: report.correct,
        graph_type_name: report.graph_type_name
    }
}

export default {addReportToCriterion, stripReportToInsert}