function readInput(rawInput) {
    let lines = [];
    for(let i = 0; i < rawInput.length; i += 2) {
        const start = rawInput[i].split(',')
        const end = rawInput[i+1].split(',')

        lines.push([start, end])
    }
    return lines;
}

function filterInvalid(lines) {
    return lines.filter(line => {
        const [start, end] = line

        return start[0] === end[0] || start[1] === end[1]
    })
}

function fillBoard(lines) {
    let board = {}

    lines.forEach(line => {
        const [start, end] = line
        const xBegin = Math.min(start[0], end[0])
        const xFinish = Math.max(start[0], end[0])
        const yBegin = Math.min(start[1], end[1])
        const yEnd = Math.max(start[1], end[1])

        for (let x = xBegin; x <= xFinish; x++) {
            for(let y = yBegin; y <= yEnd; y++) {
                const coord = `${x},${y}`
                if (board[coord]) {
                    board[coord] = board[coord] + 1
                } else {
                    board[coord] = 1
                }
            }
        }
    })

    return board;
}

export function partOne(rawInput) {
    const lines = readInput(rawInput)
    const filtered = filterInvalid(lines)
    const board = fillBoard(filtered)

    const result = Object.entries(board)
    .filter(([key, value]) => value >= 2)

    return result.length
}

export function partTwo(input) {

}