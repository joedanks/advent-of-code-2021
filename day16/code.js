const hexToBinary = {
    0: '0000',
    1: '0001',
    2: '0010',
    3: '0011',
    4: '0100',
    5: '0101',
    6: '0110',
    7: '0111',
    8: '1000',
    9: '1001',
    A: '1010',
    B: '1011',
    C: '1100',
    D: '1101',
    E: '1110',
    F: '1111',
}

const operator = {
    0: (a, b) => a + b,
    1: (a, b) => a * b,
    2: (a, b) => Math.min(a, b),
    3: (a, b) => Math.max(a, b),
    5: (a, b) => a > b ? 1 : 0,
    6: (a, b) => b > a ? 1 : 0,
    7: (a, b) => a === b ? 1 : 0
}

function cutString(input, index) {
    return [input.substring(0, index), input.substring(index)]
}

export function convertHexToBinary(input) {
    return input.split('')
        .map(h => hexToBinary[h])
        .join('')
}

function getHeaderValues(input) {
    const header = input.substring(0, 6)
    const [versionString, typeString] = cutString(header, 3)
    const version = parseInt(versionString, 2)
    const type = parseInt(typeString, 2)

    return [version, type]
}

function parseChunk(input) {
    const [chunk, remaining] = cutString(input, 5)
    const [prefix, value] = cutString(chunk, 1)

    return [prefix, value, remaining]
}

function readLiteral(input) {
    let result = ''
    let prefix = 1
    let remaining = input
    do {
        const [nextPrefix, value, nextRemaining] = parseChunk(remaining)
        prefix = parseInt(nextPrefix, 10)
        result += value
        remaining = nextRemaining
    } while (prefix)

    return [parseInt(result, 2), remaining]
}

function readOperator(input) {
    const [lengthId, remaining] = cutString(input, 1)
    if (lengthId === '0') {
        const cut = cutString(remaining, 15)
        const length = parseInt(cut[0], 2)
        const r = cutString(cut[1], length)

        return [{
            lengthId,
            length,
            subPackets: readPackets(r[0])
        }, r[1]]
    } else {
        const cut = cutString(remaining, 11)
        const numberOfPackets = parseInt(cut[0], 2)
        const subPackets = []
        let otherRemaining = cut[1]

        for (let i = 0; i < numberOfPackets; i++) {
            const[packet, nextRemaining] = readPacket(otherRemaining)
            subPackets.push(packet)
            otherRemaining = nextRemaining
        }

        return [{
            lengthId,
            numberOfPackets,
            subPackets
        }, otherRemaining]
    }
}

export function readPacket(input) {
    const [version, type] = getHeaderValues(input)

    if (type === 4) {
        const [value, remaining] = readLiteral(input.substring(6))
        return [{
            version,
            type,
            value
        }, remaining]
    }
    const [operator, remaining] = readOperator(input.substring(6))
    return [{
        version,
        type,
        ...operator
    }, remaining]
}

function readPackets(input) {
    if (input.includes(1)) {
        const [packet, remaining] = readPacket(input)

        return [packet, ...readPackets(remaining)]
    }
    return []
}

function sumPacketVersion(packet) {
    if (packet.subPackets) {
        return packet.subPackets.reduce((a, b) => a + sumPacketVersion(b), 0) + packet.version
    }
    return packet.version
}

export function partOne(input) {
    const binary = convertHexToBinary(input)
    const packets = readPackets(binary)

    return packets.reduce((a, b) => {
        return a + sumPacketVersion(b)
    }, 0)
}

function evaluatePacket(packet) {
    if (packet.value || packet.value === 0) {
        return packet.value
    }
    return packet.subPackets.map(p => evaluatePacket(p))
        .reduce(operator[packet.type])
}

export function partTwo(input) {
    const binary = convertHexToBinary(input)
    const packets = readPackets(binary)

    if (packets.length > 1) {
        return Number.NEGATIVE_INFINITY
    }

    return evaluatePacket(packets[0])
}
