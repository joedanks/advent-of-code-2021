function computeBoardEntries(rawRows) {
    let entries = new Array(10).fill([]);
    for (let i = 0; i < 5; i++) {
        const row = rawRows[i].split(' ').filter(x => x !== '')
        entries[i] = row
        entries[i+5][i] = row[i]
    }
    return entries
}

function readBoards(input) {
    let boards = []
    let currentBoard = {
        rawRows = []
    }
    input.forEach(row => {
        if (row === '') {
            boards.push(currentBoard)
            currentBoard = {
                rawRows = []
            }
        } else {
            currentBoard.rawRows.push(row)
        }
    });

    boards.map(board => {
        board.entries = computeBoardEntries(board.rawRows)
        return board
    })

    return boards
}

function isWinner(entries, selectedNumbers) {
    entries.map((entry) => {
        return entry.every(e => selectedNumbers.includes(e))
    }).reduce(a, b => a || b, false)
}

function findWinner(boards, selectedNumbers) {
    for(let i = 0; i < boards.length; i++) {
        if (isWinner(boards[i].entries)) {
            return boards[i]
        }
    }
}

function sumNonPicked(entries, selectedNumbers) {
    return entries.slice(0, 5)
    .flat()
    .filter(x => !selectedNumbers.includes(x))
    .reduce(a, b => a + parseInt(b, 10), 0)
}

export function partOne(input, rawBoards) {
    const boards = readBoards(rawBoards)

    let selectedNumbers = []
    for(let i = 0; i < input.length; i++) {
        selectedNumbers.push(input[i])

        const winner = findWinner(boards)
        if(winner) {
            const sum = sumNonPicked(winner.entries, selectedNumbers)

            return sum * input[i]
        }
    }
    return 0
}

export function partTwo(input, boards) {

}