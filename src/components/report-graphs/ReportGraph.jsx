import useReportStatsContext from "../../hooks/useReportStatsContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function countBy(array, key) {
    return array.reduce((accumulator, item) => {
        const value = item[key]
        accumulator[value] = (accumulator[value] || 0) + 1
        return accumulator
    }, {})
}

const ReportGraph = ({correct, graph_type}) => {
    const {reports, criteria} = useReportStatsContext()
    console.log(graph_type)

    const mappedReports = reports
        .filter(r => r.correct == correct )
        .filter(r => r.graph_type_name == graph_type)
        .map( r => ({
            level: r.level,
            name: criteria.find(c => c.id == r.criterion_id).name,
        }))

    console.log("mapped: " + mappedReports)

    const data = {
        labels: criteria.map(c => c.name),
        datasets: [
            {
                label: "Error",
                data: countBy(mappedReports.filter(r => r.level == "E"), "name"),
                borderColor: "#000000"
            },
            {
                label: "Warning",
                data: countBy(mappedReports.filter(r => r.level == "W"), "name"),
                borderColor: "#000000",
            },
            {
                label: "Correct",
                data: countBy(mappedReports.filter(r => r.level == "C"), "name"),
                borderColor: "#000000"
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Reports'
            }
        }
    }

    return <Bar options={options} data={data}></Bar>
}

export default ReportGraph