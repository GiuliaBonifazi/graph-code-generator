

function parseFile (file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            return resolve({
                hasFailed: true,
                data: null,
                message: "File does not exist."
            })
        }
    
        const reader = new FileReader()
        reader.onload = () => {
            const data = reader.result
            const name = file.name
            let type = file.type

            if (!type || type === "text/plain") {
                if (name.endsWith(".csv")) {
                    type = "text/csv";
                } else if (name.endsWith(".tsv")) {
                    type = "text/tsv";
                }
            }
            
            switch (type) {
                case "text/csv":
                    return resolve(parseCsvOrTsv(data, ","))
                case "text/tsv":
                    return resolve(parseCsvOrTsv(data, "\t"))
                case "text/plain":
                    return resolve({
                        hasFailed: true,
                        data: data,
                        message: ".txt not yet implemented"
                    })
                default:
                    return resolve({
                        hasFailed: true,
                        data: data,
                        message: `Unknown format: ${type}`
                    })
            }
        }
        reader.onerror = () => {
            return resolve({
                hasFailed: true,
                data: data,
                message: "Failed to read file"
            })
        }

        reader.readAsText(file)
    })
}

function parseCsvOrTsv(data, delimiter) {
    const splitData = data.replaceAll("\"", "").split(/\r?\n/).filter(row => row != "")
    const headers = splitData[0]
        .split(delimiter)
        .map(header => {
            return {
                header: header,
                accessorKey: header.toLowerCase().replace(" ", "_")
            }
        })
    const rows = splitData
        .slice(1)
        .map((row) => {
            const splitByCell = row.trim().split(delimiter).map((cell, column_index) => {
                return {
                    [headers[column_index].accessorKey]: cell
                }
            })
            return Object.assign({}, ...splitByCell)
        })
    return {
        hasFailed: false,
        data: {
            headers: headers,
            rows: rows
        },
        message: "Success"
    }
}

export default parseFile