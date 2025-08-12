import React from "react"

export const TYPE_PIE = "Pie chart"
export const TYPE_BAR = "Bar graph"
export const TYPE_LINE = "Line graph"
export const TYPE_DEFAULT = TYPE_PIE

export const TYPE_ALL = [TYPE_PIE, TYPE_BAR, TYPE_LINE]

export const GraphTypeContext = React.createContext(TYPE_DEFAULT)

export default {TYPE_BAR, TYPE_LINE, TYPE_PIE, TYPE_ALL}