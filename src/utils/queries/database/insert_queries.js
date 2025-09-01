export async function insert_reports(reports) {
    const response = await fetch("http://127.0.0.1:5000/add_reports", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reports)
    })

    return response
}

export default insert_reports