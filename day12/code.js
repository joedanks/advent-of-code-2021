function parseMap(rawInput) {
    return rawInput.map(input => {
        const [first, second] = input.split('-')

        return {
            [first]: [second],
            [second]: [first]
        }
    })
        .reduce((prev, curr) => {
            const next = {
                ...prev
            }
            Object.entries(curr)
                .forEach(([key, value]) => {
                    const existing = prev[key]

                    if (existing) {
                        next[key] = existing.concat(value)
                    } else {
                        next[key] = value
                    }
                })
            return next
        }, {})
}

const upperCase = /^[A-Z]+$/

function move(current, map) {
    if (current.location === 'end') {
        return [current]
    }

    const availableLocations = map[current.location]
        .filter(possible => possible !== 'start')
        .filter(possible => {
            if (current.path.includes(possible)) {
                return possible.match(upperCase)
            }
            return true
        })

    const nextSteps = availableLocations.map(next => {
        return {
            location: next,
            path: [...current.path, next]
        }
    })

    return nextSteps.flatMap(next => move(next, map))
}

export function partOne(testInput) {
    const map = parseMap(testInput)
    const start = {
        location: 'start',
        path: ['start']
    }

    const result = move(start, map)

    return result.length
}

function move2(current, map) {
    if (current.location === 'end') {
        return [current]
    }

    const availableLocations = map[current.location]
        .filter(possible => possible !== 'start')
        .filter(possible => {
            if (current.path.includes(possible)) {
                if (possible.match(upperCase)) {
                    return true
                }
                return !current.smallTwice
            }
            return true
        })

    const nextSteps = availableLocations.map(next => {
        let smallTwice = current.smallTwice

        if (current.path.includes(next) && !next.match(upperCase)) {
            smallTwice = true
        }

        return {
            location: next,
            path: [...current.path, next],
            smallTwice
        }
    })

    return nextSteps.flatMap(next => move2(next, map))
}

export function partTwo(testInput) {
    const map = parseMap(testInput)
    const start = {
        location: 'start',
        path: ['start']
    }

    const result = move2(start, map)

    return result.length
}
