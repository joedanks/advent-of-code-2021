function fuelCost(distance) {
    return (distance * (distance + 1)) / 2
}

export function partOne(testInput) {
    const maxPosition = testInput.reduce((a, b) => a > b ? a : b, Number.MIN_SAFE_INTEGER)
    const minPosition = testInput.reduce((a, b) => a < b ? a : b, Number.MAX_SAFE_INTEGER)

    let minCost = Number.MAX_SAFE_INTEGER

    for (let position = minPosition; position < maxPosition; position++) {
        const cost = testInput.map(i => Math.abs(i - position))
            .reduce((a, b) => a + b, 0)

        if (cost < minCost) {
            minCost = cost
        }
    }
    return minCost
}

export function partTwo(testInput) {
    const maxPosition = testInput.reduce((a, b) => a > b ? a : b, Number.MIN_SAFE_INTEGER)
    const minPosition = testInput.reduce((a, b) => a < b ? a : b, Number.MAX_SAFE_INTEGER)

    let minCost = Number.MAX_SAFE_INTEGER

    for (let position = minPosition; position < maxPosition; position++) {
        const cost = testInput.map(i => fuelCost(Math.abs(i - position)))
            .reduce((a, b) => a + b, 0)

        if (cost < minCost) {
            minCost = cost
        }
    }
    return minCost
}
