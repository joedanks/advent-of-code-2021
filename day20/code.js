function getPositionString(x, y) {
    return `${x},${y}`
}

function readPositionString(positionString) {
    return positionString.split(',').map(p => parseInt(p, 10))
}

function getNeighborPositions(positionString) {
    const [x, y] = readPositionString(positionString)

    return [
        getPositionString(x - 1, y - 1),
        getPositionString(x, y - 1),
        getPositionString(x + 1, y - 1),
        getPositionString(x - 1, y),
        getPositionString(x, y),
        getPositionString(x + 1, y),
        getPositionString(x - 1, y + 1),
        getPositionString(x, y + 1),
        getPositionString(x + 1, y + 1),
    ]
}

function buildGrid(rawInput) {
    const grid = {}

    rawInput.forEach((row, y) => {
        row.split('').forEach((v, x) => {
            grid[getPositionString(x, y)] = v
        })
    })

    return grid
}

function padInput(rawInput) {
    const amountToPad = 4
    const padded = []
    const originalLength = rawInput[0].length

    for (let i = 0; i < amountToPad; i++) {
        padded.push(Array(originalLength + (2 * amountToPad)).fill('.').join(''))
    }
    rawInput.forEach(row => {
        const pad = Array(amountToPad).fill('.').join('')
        padded.push(pad + row +pad)
    })
    for (let i = 0; i < amountToPad; i++) {
        padded.push(Array(originalLength + (2 * amountToPad)).fill('.').join(''))
    }
    return padded
}

function computeNextValue(position, inputImage, algorithm, defaultValue) {
    const binaryString = getNeighborPositions(position)
        .map(p => inputImage[p] || defaultValue)
        .map(x => x === '#' ? '1' : '0')
        .join('')

    const index = parseInt(binaryString, 2);
    const value = algorithm.charAt(index);
    return value
}

function getPositionsOutsideGrid(inputImage) {
    const keys = Object.keys(inputImage);
    return [
        ...new Set(
            keys
                .flatMap(p => getNeighborPositions(p))
        )
    ]
}

function enhance(inputImage, algorithm, defaultValue) {
    const next = {}
    const positions = getPositionsOutsideGrid(inputImage);

    positions
        .forEach(position => {
            const nextValue = computeNextValue(position, inputImage, algorithm, defaultValue)

            next[position] = nextValue
        })

    return next;
}

function maxY(grid) {
    return Object.keys(grid)
        .map(p => readPositionString(p))
        .map(([x, y]) => y)
        .reduce((a, b) => Math.max(a, b))
}

function minY(grid) {
    return Object.keys(grid)
        .map(p => readPositionString(p))
        .map(([x, y]) => y)
        .reduce((a, b) => Math.min(a, b))
}

function maxX(grid) {
    return Object.keys(grid)
        .map(p => readPositionString(p))
        .map(([x, y]) => x)
        .reduce((a, b) => Math.max(a, b))
}

function minX(grid) {
    return Object.keys(grid)
        .map(p => readPositionString(p))
        .map(([x, y]) => x)
        .reduce((a, b) => Math.min(a, b))
}

export function partOne(input, algorithm) {
    const grid = buildGrid(input)
    const first = enhance(grid, algorithm, '.')

    const second = enhance(first, algorithm, algorithm[0])

    return Object.values(second).filter(v => v === '#').length
}

export function partTwo(input, algorithm) {
    const grid = buildGrid(input)
    const alternatingDefaults = ['.', algorithm[0]]

    let result = grid
    for (let i = 0; i < 50; i++) {
        const defaultValue = alternatingDefaults.shift()
        result = enhance(result, algorithm, defaultValue)
        alternatingDefaults.push(defaultValue)
    }

    return Object.values(result).filter(v => v === '#').length
}

