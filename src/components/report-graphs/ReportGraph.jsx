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

ChartJS.defaults.color ="#021620"

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
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
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

    return <div className="w-full overflow-x-scroll">
        <h3>{(correct ? "Correct " : "Wrong ") + 'Reports'}</h3>
        <div className={`min-w-[100rem] h-[25rem]`}>
            <Bar className={`p-4`} options={options} data={data}></Bar>
        </div>
    </div>
}

export default ReportGraph