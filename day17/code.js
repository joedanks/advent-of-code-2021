function minMax(string) {
    return string.split('..').map(i => parseInt(i, 10))
}

function hitTarget(x, y, trajX, trajY, target, maxY) {
    const [minTx, maxTx] = minMax(target[0])
    const [maxTy, minTy] = minMax(target[1])

    if (x >= minTx && x <= maxTx && y <= minTy && y >= maxTy) {
        return [true, maxY]
    } else if (x < minTx && trajX === 0) {
        return [false, 0]
    } else if (x < maxTx && y > maxTy) {
        return hitTarget(
            x + trajX,
            y + trajY,
            Math.max(trajX - 1, 0),
            trajY - 1,
            target,
            Math.max(y, maxY))
    } else {
        return [false, 0]
    }
}

export function partOne(testInput) {
    const valid = []
    for (let x = 6; x < 150; x++) {
        for (let y = 9; y < 150; y++) {
            const result = hitTarget(0, 0, x, y, testInput, 0)
            if (result[0]) {
                valid.push([x, y, result[1]])
            }
        }
    }

    return valid.map(([x, y, maxY]) => maxY)
        .reduce((a, b) => Math.max(a, b), 0)
}


export function partTwo(testInput) {
    const valid = []
    for (let x = 2; x < 180; x++) {
        for (let y = -100; y < 150; y++) {
            const result = hitTarget(0, 0, x, y, testInput, 0)
            if (result[0]) {
                valid.push([x, y, result[1]])
            }
        }
    }

    return valid.length
}
