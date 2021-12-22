const board = [...Array(10).keys()].map((x, i) => i + 1)

function nextBoardPosition(curr, move) {
    let index = (board.indexOf(curr) + move) % board.length
    return board[index]
}

const deterministicDice = [...Array(100).keys()].map((x, i) => i + 1)

function getDeterministicValue(prevRollsCount) {
    let index = prevRollsCount % deterministicDice.length

    return deterministicDice[index]
}

export function partOne(one, two) {
    let playerOne = {
        score: 0,
        position: one
    }
    let playerTwo = {
        score: 0,
        position: two
    }
    let players = [playerOne, playerTwo]
    let diceRolls = 0
    while (playerOne.score < 1000 && playerTwo.score < 1000) {
        const player = players.shift()
        const diceRollTotal = getDeterministicValue(diceRolls++)
            + getDeterministicValue(diceRolls++)
            + getDeterministicValue(diceRolls++)
        const nextPosition = nextBoardPosition(player.position, diceRollTotal)

        player.score += nextPosition
        player.position = nextPosition

        players.push(player)
    }

    const loser = players.reduce((a, b) => a.score < b.score ? a : b)

    return diceRolls * loser.score
}

const quantumRolls = [1, 2, 3].flatMap(roll => {
    return [1, 2, 3].flatMap(secondRoll => {
        return [1, 2, 3].map(thirdRoll => {
            return [roll, secondRoll, thirdRoll]
        })
    })
})

const weightedQuantumRolls = quantumRolls.reduce((prev, curr) => {
    const total = curr.reduce((a, b) => a + b)
    if (prev[total] === undefined) {
        prev[total] = 0n
    }
    return {
        ...prev,
        [total]: prev[total] + 1n
    }
}, {})

const moveCache = {}
const gameCache = {}

function turn(curr, next, parentWeight) {
    if (next.score >= 21) {
        return [[next.name, parentWeight]]
    }
    return Object.entries(weightedQuantumRolls)
        .flatMap(([rollTotal, weight]) => {
            const nextPositionKey = `${rollTotal},${curr.position}`
            let nextPosition = moveCache[nextPositionKey]
            if (nextPosition === undefined) {
                nextPosition = nextBoardPosition(curr.position, parseInt(rollTotal, 10))
                moveCache[nextPositionKey] = nextPosition
            }

            return turn(
                next,
                {
                    ...curr,
                    score: curr.score + nextPosition,
                    position: nextPosition
                },
                weight * parentWeight
            )
        })
}

function sumWins(playerName, allGames) {
    return allGames.filter(([n, _]) => n === playerName)
        .reduce((a, b) => a + b[1], 0n)
}

export function partTwo(one, two) {
    let playerOne = {
        name: 'one',
        score: 0,
        position: one
    }
    let playerTwo = {
        name: 'two',
        score: 0,
        position: two
    }
    const winners = turn(playerOne, playerTwo, 1n)
    const oneWins = sumWins('one', winners)
    const twoWins = sumWins('two', winners)

    return oneWins > twoWins ? oneWins : twoWins
}

