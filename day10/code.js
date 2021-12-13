function isOpen(character) {
    return ['(', '[', '{', '<'].includes(character)
}

function matchesOpen(open, close) {
    return (open === '(' && close === ')')
        || (open === '[' && close === ']')
        || (open === '{' && close === '}')
        || (open === '<' && close === '>')
}

function getClose(character) {
    if (character === '(')
        return ')'
    if (character === '[')
        return ']'
    if (character === '{')
        return '}'
    if (character === '<')
        return '>'
}

function findFirstIllegal(line) {
    const input = line.split('')
    const stack = []

    const illegals = input.map(i => {
        if (isOpen(i)) {
            stack.push(i)
            return undefined
        } else if (matchesOpen(stack.pop(), i)) {
            return undefined
        } else {
            return i
        }
    }).filter(x => x)

    return illegals.length ? illegals[0] : undefined
}

function scoreIllegalCharacter(character) {
    if (character === ')')
        return 3
    if (character === ']')
        return 57
    if (character === '}')
        return 1197
    if (character === '>')
        return 25137
}

export function partOne(testInput) {
    return testInput.map(line => findFirstIllegal(line))
        .filter(x => x)
        .map(c => scoreIllegalCharacter(c))
        .reduce((a, b) => a + b, 0)
}


function scoreAutoCompleteCharacter(character) {
    if (character === ')')
        return 1
    if (character === ']')
        return 2
    if (character === '}')
        return 3
    if (character === '>')
        return 4
}

function completeLine(line) {
    const input = line.split('')
    const stack = []

    input.forEach(i => {
        if (isOpen(i)) {
            stack.push(i)
        } else {
            stack.pop()
        }
    })

    return stack.reverse().map(i => getClose(i))
}

function scoreAutoCompleteLine(autoComplete) {
    return autoComplete.map(c => scoreAutoCompleteCharacter(c))
        .reduce((prev, curr) => {
            return (prev * 5) + curr
        }, 0)
}

export function partTwo(testInput) {
    const incomplete = testInput.map(line => {
        if (findFirstIllegal(line)) {
            return undefined
        }
        return line
    })
        .filter(x => x);
    const scores = incomplete
        .map(line => completeLine(line))
        .map(autoComplete => scoreAutoCompleteLine(autoComplete))
        .sort((a, b) => a - b)
    const middle = Math.floor(scores.length/2);

    return scores[middle]
}
