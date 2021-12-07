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

function onlyDiagonal(lines) {
    return lines.filter(line => {
        const [start, end] = line

        return start[0] !== end[0] && start[1] !== end[1]
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

function addDiagonal(board, lines) {
    const newBoard = {
        ...board
    }
   
    lines.forEach(line => {
        const [start, end] = line
        const xBegin = parseInt(start[0], 10)
        const xFinish = parseInt(end[0], 10)
        const yBegin = parseInt(start[1], 10)
        const yFinish = parseInt(end[1], 10)

        const length = Math.max(xBegin, xFinish) - Math.min(xBegin, xFinish)

        const xFunc = () => {
            if (xBegin < xFinish) {
                return (i) => xBegin+i
            }
            return (i) => xBegin-i
        }
        
        const yFunc = () => {
            if (yBegin <= yFinish) {
                return (i) => yBegin+i
            }
            return (i) => yBegin-i
        }

        for(let i = 0; i <= length; i++) {
            const coord = `${xFunc()(i)},${yFunc()(i)}`
            if(newBoard[coord]) {
                newBoard[coord] = newBoard[coord] + 1
            } else {
                newBoard[coord] = 1
            }
        }
    })

    return newBoard
}

export function partOne(rawInput) {
    const lines = readInput(rawInput)
    const filtered = filterInvalid(lines)
    const board = fillBoard(filtered)

    const result = Object.entries(board)
    .filter(([key, value]) => value >= 2)

    return result.length
}

export function partTwo(rawInput) {
    const lines = readInput(rawInput)
    const noDiag = filterInvalid(lines)
    const onlyDiag = onlyDiagonal(lines)
    const board = addDiagonal(fillBoard(noDiag), onlyDiag)

    const result = Object.entries(board)
    .filter(([key, value]) => value >= 2)

    return result.length
}