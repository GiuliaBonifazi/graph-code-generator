export function countBy(array, key) {
    return array.reduce((accumulator, item) => {
        const value = item[key]
        accumulator[value] = (accumulator[value] || 0) + 1
        return accumulator
    }, {})
}

export default countBy