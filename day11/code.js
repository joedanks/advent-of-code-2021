function getPositionString(x, y) {
    return `${x},${y}`
}

function readPositionString(string) {
    return string.split(',').map(i => parseInt(i, 10))
}

export function parseOctopi(rawInput) {
    return rawInput.flatMap((line, y) => {
        return line.split('')
            .map(x => parseInt(x, 10))
            .map((e, x) => {
                return {
                    [getPositionString(x, y)]: {
                        position: getPositionString(x, y),
                        energy: e,
                        flashes: 0,
                        flashed: false
                    }
                }
            })
            .reduce((prev, curr) => {
                return Object.assign({}, prev, curr)
            }, {})
    }).reduce((prev, curr) => {
        return Object.assign({}, prev, curr)
    }, {})
}

function getNeighborPositions(positionString) {
    const [x, y] = readPositionString(positionString)

    return [
        getPositionString(x - 1, y - 1),
        getPositionString(x - 1, y),
        getPositionString(x - 1, y + 1),
        getPositionString(x, y - 1),
        getPositionString(x, y + 1),
        getPositionString(x + 1, y - 1),
        getPositionString(x + 1, y),
        getPositionString(x + 1, y + 1),
    ]
}

function bumpOct(positionString, octopus, octopi) {
    if (!octopus.flashed) {
        octopus.energy = octopus.energy + 1

        if (octopus.energy > 9) {
            octopus.energy = 0
            octopus.flashed = true
            octopus.flashes = octopus.flashes + 1
            bumpNeighbors(positionString, octopus, octopi)
        }
    }
}

function bumpNeighbors(positionString, octopus, octopi) {
    const neighborPositions = getNeighborPositions(positionString)

    return neighborPositions.map(n => [n, octopi[n]])
        .filter(([n, x]) => x)
        .forEach(([key, oct]) => {
            bumpOct(key, oct, octopi)
        })
}

export function step(octopi) {
    Object.entries(octopi)
        .forEach(([key, octopus]) => {
            bumpOct(key, octopus, octopi)
        })
}

function resetFlashed(octopi) {
    Object.entries(octopi)
        .forEach(([key, octopus]) => {
            octopus.flashed = false
        })
}

function allFlashed(octopi) {
    return Object.values(octopi)
        .every(octopus => octopus.flashed)
}

function sumFlashes(octopi) {
    return Object.values(octopi)
        .map(octopus => octopus.flashes)
        .reduce((a, b) => a + b, 0)
}

export function partOne(testInput) {
    const octopi = parseOctopi(testInput)

    for (let i = 0; i < 100; i++) {
        step(octopi)
        resetFlashed(octopi)
    }

    return sumFlashes(octopi)
}

export function partTwo(testInput) {
    const octopi = parseOctopi(testInput)

    let i = 1
    while(true) {
        step(octopi)
        if(allFlashed(octopi)) {
            return i
        }
        resetFlashed(octopi)
        i++
    }
}
