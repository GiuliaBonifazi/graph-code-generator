export const LEVEL_ERROR = "E"
export const LEVEL_CORRECT = "C"
export const LEVEL_WARNING = "W"
export const LEVEL_ALL = [LEVEL_ERROR, LEVEL_CORRECT, LEVEL_WARNING]

export function levelToLabel(level) {
    switch (level) {
        case LEVEL_ERROR:
            return "Error"
        case LEVEL_CORRECT:
            return "Correct"
        case LEVEL_WARNING:
            return "Warning"
        default:
            return "Unknown"
    }
}

export function levelToColor(level) {
    switch(level) {
        case LEVEL_ERROR:
            return "#FE86A4"
        case LEVEL_WARNING:
            return "#FFB30F"
        case LEVEL_CORRECT:
            return "#2DAAE9"
        default:
            return "#021620"
    }
}

export default {LEVEL_ALL, LEVEL_CORRECT, LEVEL_ERROR, LEVEL_WARNING, levelToLabel, levelToColor}