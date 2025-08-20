

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
    const splitData = data.split(/\r?\n/)
    const headers = splitData[0].split(delimiter)
    const rows = splitData
        .slice(1)
        .map(row =>{ return row.split(delimiter) })
    console.log(headers, rows)
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