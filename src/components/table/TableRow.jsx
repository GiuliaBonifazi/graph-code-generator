

function TableRow(props) {
    return <tr>
        {
            props.row.map((data, index) => {
                return <td key={"data_" + data.toLowerCase().replace(" ", "_") + "_" + index}>{data}</td>
            })
        }
    </tr>
}

export default TableRow