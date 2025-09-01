export async function select_all_criteria() {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_criteria')
        if (!response.ok) throw new Error("Failed to fetch")

        const data = await response.json()
        return data
    } catch (err) {
        console.error("Error fetching criteria:", err)
        return []
    }
}

export async function select_all_reports() {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_reports')
        if (!response.ok) throw new Error("Failed to fetch")

        const data = await response.json()
        return data
    } catch (err) {
        console.error("Error fetching criteria:", err)
        return []
    }
}