function computeBoardEntries(rawRows) {
    let entries = new Array(10)
    for (let i = 0; i < 5; i++) {
        const row = rawRows[i].split(' ').filter(x => x !== '').map(x => parseInt(x, 10))
        entries[i] = row
        
        row.forEach((r, index) => {
            if (!entries[index+5])
            entries[index+5] = new Array(5)
            entries[index+5][i] = row[index]
        })
    }
    return entries
}

export function readBoards(input) {
    let boards = []
    let currentBoard = {
        rawRows: []
    }
    input.forEach(row => {
        if (row === '') {
            boards.push(currentBoard)
            currentBoard = {
                rawRows: []
            }
        } else {
            currentBoard.rawRows.push(row)
        }
    });
    boards.push(currentBoard);

    boards.map(board => {
        board.entries = computeBoardEntries(board.rawRows)
        return board
    })

    return boards
}

function isWinner(entries, selectedNumbers) {
    return entries.map((entry) => {
        return entry.every(e => selectedNumbers.includes(e))
    }).reduce((a, b) => a || b, false)
}

function findWinner(boards, selectedNumbers) {
    for(let i = 0; i < boards.length; i++) {
        if (isWinner(boards[i].entries, selectedNumbers)) {
            return boards[i]
        }
    }
}

function filterWinners(boards, selectedNumbers) {
    const a = boards.filter(board => 
        !isWinner(board.entries, selectedNumbers)
    )
    return a
}

function sumNonPicked(entries, selectedNumbers) {
    const a = entries.slice(0, 5)
    const b = a.flat()
    const c = b.filter(x => !selectedNumbers.includes(x))
    const d = c.reduce((a, b) => a + b, 0)
    return d
}

export function partOne(input, rawBoards) {
    const boards = readBoards(rawBoards)

    let selectedNumbers = []
    for(let i = 0; i < input.length; i++) {
        selectedNumbers.push(input[i])

        const winner = findWinner(boards, selectedNumbers)
        if(winner) {
            const sum = sumNonPicked(winner.entries, selectedNumbers)

            return sum * input[i]
        }
    }
    return 0
}

export function partTwo(input, rawBoards) {
    let boards = readBoards(rawBoards)

    let selectedNumbers = []
    for(let i = 0; i < input.length; i++) {
        selectedNumbers.push(input[i])

        const newBoards = filterWinners(boards, selectedNumbers)
        if (newBoards.length === 0 && boards.length === 1) {
            const sum = sumNonPicked(boards[0].entries, selectedNumbers)
            return sum * input[i]
        }
        boards = newBoards
    }
    return 0
}