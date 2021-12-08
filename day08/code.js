/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
 */
const realSignalMappings = {
    0: 'abcefg',
    1: 'cf',
    2: 'acdeg',
    3: 'acdfg',
    4: 'bcdf',
    5: 'abdfg',
    6: 'abdefg',
    7: 'acf',
    8: 'abcdefg',
    9: 'abcdfg'
}

function parseNote(rawInput) {
    const [rawSignals, rawOutput] = rawInput.split('|');
    const signals = rawSignals.trim()
        .split(' ')
        .map(x => x.trim())
    const output = rawOutput.trim()
        .split(' ')
        .map(x => x.trim())

    return {
        rawInput,
        rawSignals,
        rawOutput,
        signals,
        output
    }
}

function parseNotes(rawInput) {
    return rawInput.map(x => parseNote(x))
}

function find1Pattern(signals) {
    return signals.filter(s => s.length === 2)[0]
}

function find2Pattern(signals, threePattern, fivePattern) {
    return signals.filter(s => s.length === 5)
        .filter(s => s !== threePattern)
        .filter(s => s !== fivePattern)[0]
}

function find3Pattern(signals, onePattern) {
    const oneParts = onePattern.split('')

    const filter = signals.filter(x => x.length === 5);
    return filter
        .filter(x => oneParts.every(p => x.includes(p)))[0]
}

function find4Pattern(signals) {
    return signals.filter(s => s.length === 4)[0]
}

function find5Pattern(signals, threePattern, ninePattern) {
    const filter = signals.filter(x => x.length === 5);
    return filter
        .filter(x => x !== threePattern)
        .filter(x => x.split('').every(p => ninePattern.includes(p)))[0]
}

function find6Pattern(signals, zeroPattern, ninePattern) {
    return signals.filter(x => x.length === 6)
        .filter(x => x !== zeroPattern)
        .filter(x => x !== ninePattern)[0]
}

function find7Pattern(signals) {
    return signals.filter(s => s.length === 3)[0]
}

function find8Pattern(signals) {
    return signals.filter(s => s.length === 7)[0]
}

function find9Pattern(signals, fourPattern) {
    const fourParts = fourPattern.split('')

    const filter = signals.filter(x => x.length === 6);
    return filter
        .filter(x => fourParts.every(p => x.includes(p)))[0]
}

function find0Pattern(signals, sevenPattern, ninePattern) {
    const sevenParts = sevenPattern.split('')

    return signals.filter(x => x.length === 6)
        .filter(x => x !== ninePattern)
        .filter(x => sevenParts.every(p => x.includes(p)))[0]
}

export function partOne(testInput) {
    const notes = parseNotes(testInput)
    const easyDigitLengths = [2,3,4,7]

    const results = notes.flatMap(n => n.output)
        .filter(o => easyDigitLengths.some(x => x === o.length))

    return results.length
}

function splitAndSort(string) {
    return string.split('').sort().join('')
}

function calculateNoteResult(note) {
    const one = find1Pattern(note.signals)
    const three = find3Pattern(note.signals, one)
    const four = find4Pattern(note.signals)
    const nine = find9Pattern(note.signals, four)
    const five = find5Pattern(note.signals, three, nine)
    const two = find2Pattern(note.signals, three, five)
    const seven = find7Pattern(note.signals)
    const zero = find0Pattern(note.signals, seven, nine)
    const six = find6Pattern(note.signals, zero, nine)
    const eight = find8Pattern(note.signals)

    const resultString = note.output.map(o => {
        const parts = o.split('').sort().join('')

        if (parts === splitAndSort(one)) {
            return '1'
        }
        if (parts === splitAndSort(two)) {
            return '2'
        }
        if (parts === splitAndSort(three)) {
            return '3'
        }
        if (parts === splitAndSort(four)) {
            return '4'
        }
        if (parts === splitAndSort(five)) {
            return '5'
        }
        if (parts === splitAndSort(six)) {
            return '6'
        }
        if (parts === splitAndSort(seven)) {
            return '7'
        }
        if (parts === splitAndSort(eight)) {
            return '8'
        }
        if (parts === splitAndSort(nine)) {
            return '9'
        }
        return '0'
    }).join('')

    return parseInt(resultString, 10)
}

export function partTwo(testInput) {
    const notes = parseNotes(testInput)

    return notes.map(note => calculateNoteResult(note))
        .reduce((a, b) => a + b, 0)
}
