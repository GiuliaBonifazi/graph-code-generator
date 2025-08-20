import useGraphFormContext from "../../hooks/useGraphFormContext"
import TableHeaders from "./TableHeaders"
import TableRow from "./TableRow"

function DataTable() {
    const {options} = useGraphFormContext()

    if (!options) {
        return <p>No data</p>
    }

    const rows = options.uploadData.rows
    const headers = options.uploadData.headers

    if (!rows || !headers) {
        return <p>No data</p>
    }

    return <>
        <table>
            <caption>Your data</caption>
            <TableHeaders headers={headers}></TableHeaders>
            {
                rows.map(row => {
                    return <TableRow row={row}></TableRow>
                })
            }
        </table>
    </>
}

export default DataTable