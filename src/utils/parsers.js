

export function parseFile (file) {
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
                    return resolve(parseDsv(data, ","))
                case "text/tsv":
                    return resolve(parseDsv(data, "\t"))
                case "text/plain":
                    return resolve(tryParseDsv(data))
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

export function tryParseDsv(data) {
    const csvAttempt = parseDsv(data, ",")
    if (csvAttempt.hasFailed) {
        const tsvAttempt = parseDsv(data, "\t")
        return tsvAttempt
    } else {
        return csvAttempt
    }
}

function parseDsv(data, delimiter) {
    try {
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
        if (headers.length == 1) {
            return {
                hasFailed: true,
                data: {},
                message: "Parsing error or unsuitable data"
            }
        } else {
            return {
                hasFailed: false,
                data: {
                    headers: headers,
                    rows: rows
                },
                message: "Success"
            }
        }
    } catch {
        return {
            hasFailed: true,
            data: {},
            message: "Format is neither CSV not TSV"
        }
    }
}

export default {parseFile, tryParseDsv}