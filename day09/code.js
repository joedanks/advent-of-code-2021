function getPositionString(x, y) {
    return `${x},${y}`
}

function getPosition(positionString) {
    return positionString.split(',').map(p => parseInt(p, 10))
}

function union(setA, setB) {
    let start = Date.now()
    // return new Set([...setA, ...setB])
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    const time = Date.now() - start;
    if (time > 5)
        console.log(`Union: ${time} ms, A: ${setA.size}, B: ${setB.size}`)
    return _union
}

function parseGrid(rawInput) {
    return rawInput.map((row, y) => {
        return row.split('').map((position, x) => {
            const positionString = getPositionString(x, y)

            return {
                [positionString]: parseInt(position, 10)
            }
        }).reduce((a, b) => Object.assign({}, a, b), {})
    }).reduce((a, b) => Object.assign({}, a, b), {})
}

function adjacentPositions(x, y) {
    return [
        getPositionString(x - 1, y),
        getPositionString(x + 1, y),
        getPositionString(x, y - 1),
        getPositionString(x, y + 1),
    ]
}

function findAdjacent(x, y, grid) {
    const adjacent = adjacentPositions(x, y)
        .map(positionString => grid[positionString])
    return adjacent.filter(x => x !== undefined)
}

function isLowPoint(x, y, grid) {
    const point = grid[getPositionString(x, y)]

    const adjacent = findAdjacent(x, y, grid);
    return adjacent
        .every(adjacent => adjacent > point)
}

export function partOne(testInput) {
    const grid = parseGrid(testInput)

    const lowPositions = Object.keys(grid)
        .filter(positionString => {
            const [x, y] = getPosition(positionString)

            return isLowPoint(x, y, grid)
        });
    return lowPositions
        .map(positionString => grid[positionString])
        .map(value => value + 1)
        .reduce((a, b) => a + b, 0)
}

function expand(x, y, grid, basinPositions, boundaryPositions) {
    const newBasins = new Set(basinPositions)
    const newBoundaries = new Set(boundaryPositions)
    const newAdjacentPositions = adjacentPositions(x, y)
        .filter(p => !boundaryPositions.has(p))
        .filter(p => !basinPositions.has(p))

    const positionString = getPositionString(x, y);
    newBasins.add(positionString)

    const filteredAdjacent = newAdjacentPositions
        .map(p => {
            return [p, grid[p]]
        })
        .filter(([p, value]) => value !== undefined)
        // .filter(([p, value]) => value >= grid[positionString])
        // .sort((a, b) => b[1] - a[1])

    if (filteredAdjacent.length === 0) {
        return [newBasins, newBoundaries]
    }
    const filter = filteredAdjacent
        .sort((a, b) => b[1] - a[1])
        .map(([p, value]) => {
            if (value === 9) {
                return [newBasins, newBoundaries.add(p)]
            } else if (value !== undefined) {
                const [newX, newY] = getPosition(p)

                const expanded = expand(newX, newY, grid, newBasins, newBoundaries);
                expanded[0].forEach(x => newBasins.add(x))
                expanded[1].forEach(x => newBoundaries.add(x))
                return expanded
            } else {
                return [newBasins, newBoundaries]
            }
        }).filter(x => x);
    return filter
        .reduce((prev, curr) => {
            return [
                union(prev[0], curr[0]),
                union(prev[1], curr[1])
            ]
        }, [new Set(), new Set()])
}

export function partTwo(testInput) {
    const grid = parseGrid(testInput)

    const lowPositions = Object.keys(grid)
        .filter(positionString => {
            const [x, y] = getPosition(positionString)

            return isLowPoint(x, y, grid)
        });

    const boundaries = new Set()

    const basins = lowPositions.map(p => {
        const [x, y] = getPosition(p)
        const start = Date.now()
        const expanded = expand(x, y, grid, new Set(), boundaries);
        expanded[1].forEach(b => boundaries.add(b))
        console.log(`Time: ${Date.now() - start} ms, Entries: ${expanded[0].size}`)
        return expanded
    })

    const sort = basins.map(b => b[0].size)
        .sort((a, b) => b - a);
    const result = sort
        .slice(0, 3)
        .reduce((a, b) => a * b, 1)

    console.log(basins)

    return result
}
