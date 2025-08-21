import useGraphFormContext from "../../hooks/useGraphFormContext"
import { flexRender, useReactTable, getCoreRowModel, } from "@tanstack/react-table"

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

    const table = useReactTable({
        data: rows,
        columns: headers,
        getCoreRowModel: getCoreRowModel(),
    })
    return <>
        <table className="border rounded ">
            <caption>Your data</caption>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th className="border text-left text-sm font-semibold w-fit p-2"
                                key={header.id} colSpan="col">
                                {
                                    flexRender(header.column.columnDef.header, header.getContext())
                                }
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                        <td className="border w-fit p-2 text-center"
                            key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default DataTable