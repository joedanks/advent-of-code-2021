function getPositionString(x, y) {
    return `${x},${y}`
}

function readPositionString(positionString) {
    return positionString.split(',').map(p => parseInt(p, 10))
}

function getNeighborPositions(positionString) {
    const [x, y] = readPositionString(positionString)

    return [
        getPositionString(x + 1, y),
        getPositionString(x, y + 1),
        getPositionString(x, y - 1),
        getPositionString(x - 1, y),
    ]
}

function getNeighborPositionsDownAndRight(positionString) {
    const [x, y] = readPositionString(positionString)

    return [
        getPositionString(x + 1, y),
        getPositionString(x, y + 1),
    ]
}

function parseGrid(rawInput) {
    return rawInput.map((row, y) => {
        return row.split('').map((position, x) => {
            const positionString = getPositionString(x, y)

            return {
                [positionString]: {
                    position: positionString,
                    tentative: Number.POSITIVE_INFINITY,
                    risk: parseInt(position, 10),
                    visited: false
                }
            }
        }).reduce((a, b) => Object.assign({}, a, b), {})
    }).reduce((a, b) => Object.assign({}, a, b), {})
}

function wrapRisk(riskPlusOne) {
    if (riskPlusOne > 9) {
        return wrapRisk(riskPlusOne - 9)
    }
    return riskPlusOne
}

function assignFiveValues(array, originalValue, originalSize, index) {
    for (let i = 0; i < 5; i++) {
        const nextIndex = originalSize * i + index
        array[nextIndex] = wrapRisk(originalValue + i)
    }
}

export function buildSuperGrid(rawInput) {
    const final = []
    const fiveTimesWide = rawInput.map(row => {
        const original = row.split('').map(r => parseInt(r, 10))
        const size = original.length
        const next = new Array(size * 5)
        original.forEach((r, index) => {
            assignFiveValues(next, r, size, index)
        })
        return next.join('')
    })
    for (let i = 0; i < 5; i++) {
        fiveTimesWide.forEach(r =>
            final.push(
                r.split('')
                    .map(r => parseInt(r, 10))
                    .map(r => wrapRisk(r + i))
                    .join('')
            )
        )
    }

    return final
}

function getEndPosition(rawInput) {
    return getPositionString(rawInput[0].length - 1, rawInput.length - 1)
}

function sumGrid(grid) {
    return Object.values(grid)
        .reduce((a, b) => a + b, 0)
}

function topRight(rawInput) {
    const x = rawInput[0].split('')
        .map(x => parseInt(x, 10))
        .reduce((a, b) => a + b, 0)
    const y = rawInput.map(row => row.charAt(row.length - 1))
        .map(y => parseInt(y, 10))
        .reduce((a, b) => a + b, 0)
    return x + y
}

function bottomLeft(rawInput) {
    const x = rawInput[rawInput.length - 1].split('')
        .map(x => parseInt(x, 10))
        .reduce((a, b) => a + b, 0)
    const y = rawInput.map(row => row.charAt(0))
        .map(y => parseInt(y, 10))
        .reduce((a, b) => a + b, 0)
    return x + y
}

function middleRight(grid) {
    const totalPositions = Object.keys(grid).length
    const shortestCount = Math.sqrt(totalPositions)
    let total = 0
    let x = 0
    let y = 0
    for (let i = 0; i < shortestCount - 1; i++) {
        total += grid[getPositionString(++x, y)]
        total += grid[getPositionString(x, ++y)]
    }
    return total
}

function middleDown(grid) {
    const totalPositions = Object.keys(grid).length
    const shortestCount = Math.sqrt(totalPositions)
    let total = 0
    let x = 0
    let y = 0
    for (let i = 0; i < shortestCount - 1; i++) {
        total += grid[getPositionString(x, ++y)]
        total += grid[getPositionString(++x, y)]
    }
    return total
}

function shortestRouteRisk(rawInput, grid) {
    const top = topRight(rawInput)
    const bottom = bottomLeft(rawInput)
    const middleR = middleRight(grid)
    const middleD = middleDown(grid)

    return Math.min(
        Math.min(top, bottom),
        Math.min(middleR, middleD)
    )
}

function step(path, endPosition, worstCase, pathTooLong, grid) {
    if (path.position === endPosition) {
        return [path]
    }
    if (path.risk > worstCase) {
        return []
    }
    if (path.length > pathTooLong) {
        return []
    }
    return getNeighborPositions(path.position)
        .filter(n => !path.path.includes(n))
        .filter(n => grid[n])
        .flatMap(n => {
            const next = {
                position: n,
                path: path.path.concat(n),
                risk: path.risk + grid[n]
            }
            return step(next, endPosition, worstCase, pathTooLong, grid)
        })
}

function stepDownOrRight(path, endPosition, worstCase, pathTooLong, grid) {
    if (path.risk > worstCase) {
        return []
    }
    if (path.position === endPosition) {
        return [path]
    }
    if (path.length > pathTooLong) {
        return []
    }
    return getNeighborPositionsDownAndRight(path.position)
        .filter(n => !path.path.includes(n))
        .filter(n => grid[n])
        .flatMap(n => {
            const next = {
                position: n,
                path: path.path.concat(n),
                risk: path.risk + grid[n]
            }
            const paths = stepDownOrRight(next, endPosition, worstCase, pathTooLong, grid);
            return paths
        })
}

function updateNeighbors(node, grid) {
    if (node.visited) {
        return []
    }

    const neighbors = getNeighborPositions(node.position)
        .map(p => grid[p])
        .filter(n => n)
        .filter(n => !n.visited)

    neighbors
        .forEach(neighbor => {
            const tentative = node.tentative + neighbor.risk
            neighbor.tentative = Math.min(neighbor.tentative, tentative)
        })
    node.visited = true
}

function getUnVisitedNeighborPositions(grid) {
    const unvisitedNeighbors = Object.entries(grid)
        .filter(([key, value]) => value.visited)
        .flatMap(([key, value]) => getNeighborPositions(key))
        .filter(p => grid[p])
        .filter(p => !grid[p].visited)

    return [...new Set(unvisitedNeighbors)]
}

function getUnVisitedNeighbors(grid) {
    return getUnVisitedNeighborPositions(grid)
        .map(p => grid[p])
}

function getUnVisitedNeighborPositions2(grid) {
    return Object.entries(grid)
        .filter(([key, value]) => value.visited)
        .flatMap(([key, value]) => getNeighborPositions(key).map(p => [value, p]))
        .filter(([node, neighborPosition]) => grid[neighborPosition])
}


function getMinUnvisitedTentative(grid) {
    return Object.values(grid)
        .filter(node => !node.visited)
        .map(node => node.tentative)
        .reduce((a, b) => Math.min(a, b), Number.POSITIVE_INFINITY)
}

function sortPriority(a, b) {
    return a.tentative - b.tentative
}

export function partOne(rawInput) {
    const startGrid = Date.now()
    const grid = parseGrid(rawInput)

    console.log(`Parse grid: ${Date.now() - startGrid} ms`)
    grid['0,0'].tentative = 0
    grid['0,0'].risk = 0

    updateNeighbors(grid['0,0'], grid)

    let priorityQueue = getUnVisitedNeighbors(grid).sort(sortPriority)
    const end = grid[getPositionString(rawInput[0].length - 1, rawInput.length - 1)];

    while (!end.visited) {
        const next = priorityQueue.shift()

        updateNeighbors(next, grid)

        priorityQueue = [... new Set(priorityQueue.concat(getUnVisitedNeighbors(grid)))].sort(sortPriority)
    }

    return end.tentative
}

function updateNeighbors2(node, grid) {
    const neighbors = getNeighborPositions(node.position)
        .map(p => grid[p])
        .filter(n => n)

    const changedNeighbors = neighbors
        .flatMap(neighbor => {
            const tentative = node.tentative + neighbor.risk
            if (tentative < neighbor.tentative) {
                neighbor.tentative = tentative
                return [neighbor]
            }
            return []
        })

    node.visited = true

    return changedNeighbors
}

export function partOne2(rawInput) {
    const startGrid = Date.now()
    const grid = parseGrid(rawInput)
    console.log(`Parse grid: ${Date.now() - startGrid} ms`)
    const endPosition = getPositionString(rawInput[0].length - 1, rawInput.length - 1)
    const start = grid['0,0'];
    start.tentative = 0
    start.risk = 0

    let queue = updateNeighbors2(start, grid).sort(sortPriority)

    while(queue.length) {
        const next = queue.shift()
        if (next.position !== endPosition) {
            queue = [...new Set(queue.concat(updateNeighbors2(next, grid)))].sort(sortPriority)
        }
    }

    return grid[endPosition].tentative
}

export function partTwo(rawInput) {
    const start = Date.now()
    const superInput = buildSuperGrid(rawInput)

    console.log(`Build super grid: ${Date.now() - start} ms`)
    return partOne2(superInput)
}
