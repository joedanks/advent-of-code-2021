function parseGrid(rawInput) {
    return rawInput.map(i => ({[i]: '#'}))
        .reduce((prev, curr) => {
            return {
                ...prev,
                ...curr
            }
        }, {})
}
/*
    1,10 -> fold y=7 -> 1,4
    7 - (10 - 7)

    0,14 -> fold y=7 -> 0,0
    7 - (14 - 7)
 */
function parsePositionString(positionString) {
    return positionString.split(',')
        .map(i => parseInt(i, 10))
}

function getPositionString(x, y) {
    return `${x},${y}`
}

function parseInstruction(instruction) {
    const [xOrY, index] = instruction.replace('fold along ', '')
        .split('=')

    return [xOrY, parseInt(index, 10)]
}

function getXOrY(xOrY, pointString) {
    const [x, y] = parsePositionString(pointString)

    if (xOrY === 'x') {
        return x
    }
    return y
}

function foldPoint(xOrY, pointString, index) {
    const [x, y] = parsePositionString(pointString)

    if (xOrY === 'x') {
        return getPositionString(index - (x - index), y)
    }
    return getPositionString(x, index - (y - index))
}

function fold(grid, xOrY, index) {
    const folded = Object.entries(grid)
        .map(([point, value]) => {
            if (getXOrY(xOrY, point) > index) {
                return [foldPoint(xOrY, point, index), value]
            }
            return [point, value]
        })

    return Object.fromEntries(folded)
}

export function partOne(testInput, foldInput) {
    const grid = parseGrid(testInput)

    const result = foldInput.reduce((nextGrid, instruction) => {
        return fold(nextGrid, ...parseInstruction(instruction))
    }, grid)

    return Object.keys(result).length
}

function getMaxX(grid) {
    return Object.keys(grid)
        .map(point => parsePositionString(point)[0])
        .reduce((a, b) => a > b ? a : b, 0)
}

function getMaxY(grid) {
    return Object.keys(grid)
        .map(point => parsePositionString(point)[1])
        .reduce((a, b) => a > b ? a : b, 0)
}

function printGrid(grid) {
    const maxX = getMaxX(grid) + 1;
    const maxY = getMaxY(grid) + 1
    const printGrid = new Array(maxY)

    for(let x = 0; x < maxY; x++) {
        printGrid[x] = new Array(maxX).fill('.')
    }

    Object.entries(grid)
        .forEach(([key, value]) => {
            const [x, y] = parsePositionString(key)

            printGrid[y][x] = value
        })

    console.log(printGrid.map(row => row.join(''))
        .reduce((prev, curr) => prev + '\n' + curr, ''))
}

export function partTwo(testInput, foldInput) {
    const grid = parseGrid(testInput)

    const result = foldInput.reduce((nextGrid, instruction) => {
        return fold(nextGrid, ...parseInstruction(instruction))
    }, grid)

    printGrid(result)
    return Object.keys(result).length
}
