

function TableHeaders(props) {
    return <tr>
        {
            props.headers.map(header => {
                return <th key={header.toLowerCase().replace(" ", "_")} scope="col">{header}</th>
            })
        }
    </tr>
}

export default TableHeaders