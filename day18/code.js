function sum(left, right) {
    return ['[', ...left, ...right, ']']
}

function arraysEqual(left, right) {
    return JSON.stringify(left) === JSON.stringify(right)
}

function explodeOnce(index, input) {
    let result = [...input]
    let leftOfPair
    let leftOfPairIndex
    for (let l = index; l >= 0 && leftOfPair === undefined; l--) {
        const maybe = parseInt(input[l], 10)
        if (!isNaN(maybe)) {
            leftOfPair = maybe
            leftOfPairIndex = l
        }
    }
    let rightOfPair
    let rightOfPairIndex
    for (let r = index + 3; r < input.length && rightOfPair === undefined; r++) {
        const maybe = parseInt(input[r], 10)
        if (!isNaN(maybe)) {
            rightOfPair = maybe
            rightOfPairIndex = r
        }
    }

    const left = parseInt(input[index + 1], 10)
    const right = parseInt(input[index + 2], 10)

    if (leftOfPair !== undefined && rightOfPair !== undefined) {
        result[leftOfPairIndex] = (leftOfPair + left).toString(10)
        result[rightOfPairIndex] = (rightOfPair + right).toString(10)
        result.splice(index, 4, '0')
        return result
    }
    if (leftOfPair !== undefined) {
        result[leftOfPairIndex] = (left + leftOfPair).toString(10)
        result.splice(index, 4, '0')
        return result
    }
    if (rightOfPair !== undefined) {
        result[rightOfPairIndex] = (right + rightOfPair).toString(10)
        result.splice(index, 4, '0')
        return result
    }
    result.splice(index, 4, '0', '0')
    return result
}

function splitOnce(index, value, input) {
    const left = Math.floor(value / 2).toString(10);
    const right = Math.ceil(value / 2).toString(10);

    let result = [...input]
    result.splice(index, 1, '[', left, right, ']')

    return result
}

function split(input) {
    let result = [...input]

    for (let i = 0; i < input.length; i++) {
        let x = parseInt(result[i], 10)
        if (!isNaN(x) && x > 9) {
            return splitOnce(i, x, result)
        }
    }
    return result
}

function explode(input) {
    let openCount = 0
    let index = 0
    let result = [...input]
    do {
        const i = result[index]
        let x = Number.NaN

        if (i === '[') {
            openCount++
        } else if (i === ']') {
            openCount--
        } else {
            x = parseInt(i, 10)
        }

        if (openCount > 4) {
            result = explodeOnce(index, result)
            index = 0
            openCount = 0
            continue
        }
        index++
    } while (index < result.length)
    return result
}

export function reduce(input) {
    let clean = false
    let prev = [...input]
    let result = [...input]

    do {
        result = explode(result)
        if (arraysEqual(prev, result)) {
            result = split(result)
            if (arraysEqual(prev, result)) {
                clean = true
            }
        }
        prev = result
    } while (!clean)

    return result
}

export function sumAndReduce(list) {
    return list.map(x => parseRawInput(x))
        .reduce((prev, curr) => {
            return reduce(sum(prev, curr))
        })
}

export function parseRawInput(rawInput) {
    return rawInput.split('').filter(x => x !== ',')
}

const fullPair = /^\[\d+]$/

export function magnitude(input) {
    let result = [...input]
    let index = 0
    do {
        const maybe = result.slice(index, index + 4)

        if (maybe.join('').match(fullPair)) {
            const left = parseInt(result[index + 1], 10)
            const right = parseInt(result[index + 2], 10)
            result.splice(index, 4, (3 * left + 2 * right).toString(10))
            index = 0
            continue
        }
        index++
    } while (index < result.length - 1)

    return parseInt(result[0], 10)
}

export function partOne(input) {
    const result = sumAndReduce(input)

    return magnitude(result)
}


export function partTwo(input) {
    const nextInput = []
    for (let i = 0; i < input.length - 1; i++) {
        const left = input[i]
        for (let j = i + 1; j < input.length; j++) {
            const right = input[j]

            nextInput.push([left, right])
            nextInput.push([right, left])
        }
    }

    return nextInput.map(x => partOne(x))
        .reduce((a, b) => Math.max(a, b))
}

