function splitTemplate(template) {
    const split = template.split('')
    const pairs = []

    for (let i = 0; i < split.length - 1; i++) {
        pairs.push(`${split[i]}${split[i + 1]}`)
    }

    return pairs
}

function parseInsertions(rawInsertions) {
    return rawInsertions.map(i => {
        const [pair, result] = i.split(' -> ')

        return {
            [pair]: result
        }
    })
        .reduce((a, b) => {
            return {
                ...a,
                ...b
            }
        }, {})
}

function step(template, insertions) {
    const pairs = splitTemplate(template)

    return pairs.map(p => {
        const insert = insertions[p]

        if (insert) {
            const [one, three] = p.split('')
            return [one, insert, three].join('')
        }
        return p
    }).map((r, index) => {
        if (index === 0) {
            return r
        }
        return r.substring(1)
    }).join('')
}

function reduceTemplate(template) {
    return template.split('')
        .reduce((prev, curr) => {
            const existing = prev[curr] | 0

            return {
                ...prev,
                [curr]: 1 + existing
            }
        }, {})
}

function findMax(reducedTemplate) {
    return Object.values(reducedTemplate)
        .reduce((a, b) => {
            return a > b ? a : b
        }, 0)
}

function findMin(reducedTemplate) {
    return Object.values(reducedTemplate)
        .reduce((a, b) => {
            return a < b ? a : b
        }, Number.MAX_VALUE)
}

export function partOne(testTemplate, testInsertions, steps) {
    const insertions = parseInsertions(testInsertions)
    let template = testTemplate

    for (let i = 0; i < steps; i++) {
        template = step(template, insertions)
    }

    const reduced = reduceTemplate(template)
    const max = findMax(reduced)
    const min = findMin(reduced)

    // const total = Object.values(reduced)
    //     .reduce((a, b) => a + b, 0)
    // console.log(`Total: ${total}`)
    // const finalPairs = splitTemplate(template)
    // console.log(`Total pairs: ${finalPairs.length}`)

    return max - min
}

function parseTemplate(template) {
    const split = template.split('')
    const pairs = []

    for (let i = 0; i < split.length - 1; i++) {
        pairs.push(`${split[i]}${split[i + 1]}`)
    }

    return pairs.reduce((a, b) => {
        const existing = a[b] | 0
        return {
            ...a,
            [b]: 1 + existing
        }
    }, {})
}

function step2(template, insertions) {
    return Object.entries(template).map(([p, count]) => {
        const insert = insertions[p]

        if (insert) {
            const [one, three] = p.split('')
            return [`${one}${insert}`, `${insert}${three}`, count]
        }
        return [p]
    }).reduce((prev, curr) => {
        const [a, b, count] = curr
        const existingA = prev[a] ? prev[a] : 0n
        const existingB = prev[b] ? prev[b] : 0n

        return {
            ...prev,
            [a]: existingA + BigInt(count),
            [b]: existingB + BigInt(count)
        }
    }, {})
}

function reduceTemplate2(template) {
    return Object.entries(template)
        .map(([key, value]) => {
            const [_, k] = key.split((''))

            return {[k]: value}
        })
        .reduce((prev, curr) => {
            const mergedCurr = Object.entries(curr)
                .map(([key, value]) => {
                    const prevElement = prev[key] || 0n
                    return [key, value + prevElement]
                })

            return {
                ...prev,
                ...Object.fromEntries(mergedCurr)
            }
        }, {})
}

export function partTwo(inputTemplate, inputInsertions, steps) {
    const insertions = parseInsertions(inputInsertions)
    let template = parseTemplate(inputTemplate)

    for (let i = 0; i < steps; i++) {
        template = step2(template, insertions)
    }

    const reduced = reduceTemplate2(template)

    reduced[inputTemplate.charAt(0)] = reduced[inputTemplate.charAt(0)] + 1n

    // const total = Object.values(reduced)
    //     .reduce((a, b) => a + b, 0n)
    // console.log(`Total: ${total}`)
    // const finalPairCount = Object.values(template)
    //     .reduce((a, b) => a + b, 0n)
    // console.log(`Total pairs: ${finalPairCount}`)

    const max = findMax(reduced)
    const min = findMin(reduced)

    return max - min
}
