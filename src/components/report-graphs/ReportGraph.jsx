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
import { levelToLabel, LEVEL_ALL, levelToColor } from "../../states/ReportLevelStates";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const ReportGraph = ({correct, graph_type}) => {
    const {getReportsForGraphsByTypeAndCorrect, criteriaLabels} = useReportStatsContext()
    const sortedReports = getReportsForGraphsByTypeAndCorrect(graph_type, correct)
    const datasets = LEVEL_ALL.map(level => ({
        label: levelToLabel(level),
        data: sortedReports[level],
        backgroundColor: levelToColor(level)
    }))

    const data = {
        labels: criteriaLabels,
        datasets: datasets,
        barThickness: 400
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: (correct ? "Correct " : "Wrong ") + 'Reports'
            }
        },
        scales: {
            y: {
                suggestedMax: 10,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }

    return <div className="w-full h-[25rem] overflow-x-scroll">
        <Bar className="p-4" options={options} data={data}></Bar>
    </div>
}

export default ReportGraph