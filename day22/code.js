import _ from 'lodash'

// function buildCube(x, y, z) {
//     const cube = {}
//     for (let i = 0; i <= x; i++) {
//
//     }
// }

function parseInstruction(input) {
    const [onOff, cube] = input.split(' ')
    const [xs, ys, zs] = cube.split(',')
        .map(s => s.substring(2))
        .map(s => s.split('..').map(x => parseInt(x, 10)))
    return [onOff, xs, ys, zs]
}

function getCubeEntries(xs, ys, zs, xBoundary, yBoundary, zBoundary) {
    const entries = []
    if (xs[1] < xBoundary[0] || xs[0] > xBoundary[1]) {
        return []
    }
    if (ys[1] < yBoundary[0] || ys[0] > yBoundary[1]) {
        return []
    }
    if (zs[1] < zBoundary || zs[0] > zBoundary[1]) {
        return []
    }

    const minX = Math.max(xs[0], xBoundary[0]);
    const maxX = Math.min(xs[1], xBoundary[1]);
    const minY = Math.max(ys[0], yBoundary[0]);
    const maxY = Math.min(ys[1], yBoundary[1]);
    const minZ = Math.max(zs[0], zBoundary[0]);
    const maxZ = Math.min(zs[1], zBoundary[1]);
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                entries.push(`${x},${y},${z}`)
            }
        }
    }

    return entries
}

function execute(instruction, cube, xBoundary, yBoundary, zBoundary) {
    const [onOff, xs, ys, zs] = instruction
    const entries = getCubeEntries(xs, ys, zs, xBoundary, yBoundary, zBoundary)

    if (onOff === 'on') {
        entries.forEach(e => {
            cube[e] = 'o'
        })
    } else {
        entries.forEach(e => {
            delete cube[e]
        })
    }
}

function sumOnWithinBounds(xs, ys, zs, cube) {
    return Object.keys(cube)
        .map(k => k.split(',').map(kk => parseInt(kk, 10)))
        .filter(([x, y, z]) => {
            return x >= xs[0]
                && x <= xs[1]
                && y >= ys[0]
                && y <= ys[1]
                && z >= zs[0]
                && z <= zs[1]
        }).length
}

export function partOne(instructions) {
    const cube = {}
    const xBoundary = [-50, 50]
    const yBoundary = [-50, 50]
    const zBoundary = [-50, 50]

    instructions.map(i => parseInstruction(i))
        .forEach(instruction => execute(instruction, cube, xBoundary, yBoundary, zBoundary))

    return sumOnWithinBounds(xBoundary, yBoundary, zBoundary, cube)
}

// function calcVolume(xs, ys, zs) {
//     const x = BigInt(xs[1] - xs[0])
//     const y = BigInt(ys[1] - ys[0])
//     const z = BigInt(zs[1] - zs[0])

//     return x * y * z
// }

class Rectangle {
    constructor(xs, ys, zs, action = 'unknown') {
        this.minX = xs[0]
        this.maxX = xs[1]
        this.minY = ys[0]
        this.maxY = ys[1]
        this.minZ = zs[0]
        this.maxZ = zs[1]
        this.action = action
    }

    intersects(other) {
        return (this.minX <= other.maxX && this.maxX >= other.minX)
            && (this.minY <= other.maxY && this.maxY >= other.minY)
            && (this.minZ <= other.maxZ && this.maxZ >= other.minZ)
    }

    get volume() {
        const x = BigInt(Math.abs(this.maxX - this.minX))
        const y = BigInt(Math.abs(this.maxY - this.minY))
        const z = BigInt(Math.abs(this.maxZ - this.minZ))

        return x * y * z
    }
}

function buildSplitRectangles(a, b) {
    const xSegments = [
        [Math.min(a.minX, b.minX), a.minX === b.minX ? Math.max(a.minX, b.minX) : Math.max(a.minX, b.minX) - 1],
        [Math.max(a.minX, b.minX), Math.min(a.maxX, b.maxX)],
        [a.maxX === b.maxX ? Math.min(a.maxX, b.maxX) : Math.min(a.maxX, b.maxX) + 1, Math.max(a.maxX, b.maxX)],
    ].filter(([x1, x2]) => x1 !== x2)
    const ySegments = [
        [Math.min(a.minY, b.minY), a.minY === b.minY ? Math.max(a.minY, b.minY) : Math.max(a.minY, b.minY) - 1],
        [Math.max(a.minY, b.minY), Math.min(a.maxY, b.maxY)],
        [a.maxY === b.maxY ? Math.min(a.maxY, b.maxY) : Math.min(a.maxY, b.maxY) + 1, Math.max(a.maxY, b.maxY)],
    ].filter(([y1, y2]) => y1 !== y2)
    const zSegments = [
        [Math.min(a.minZ, b.minZ), a.minZ === b.minZ ? Math.max(a.minZ, b.minZ) : Math.max(a.minZ, b.minZ) - 1],
        [Math.max(a.minZ, b.minZ), Math.min(a.maxZ, b.maxZ)],
        [a.maxZ === b.maxZ ? Math.min(a.maxZ, b.maxZ) : Math.min(a.maxZ, b.maxZ) + 1, Math.max(a.maxZ, b.maxZ)],
    ].filter(([z1, z2]) => z1 !== z2)

    const splitRectangles = xSegments.flatMap(xs => {
        return ySegments.flatMap(ys => {
            return zSegments.map(zs => {
                return new Rectangle(xs, ys, zs)
            })
        })
    })
    return splitRectangles
        .map(r => {
            if (r.intersects(a) && r.intersects(b)) {
                r.action = b.action
                return r
            } else if (r.intersects(a)) {
                r.action = a.action
                return r
            } else if (r.intersects(b)) {
                r.action = b.action
                return r
            }
            return undefined
        })
        .filter(r => r !== undefined)
        .filter(r => r.action === 'on')
}

function anyIntersect(rectangles) {
    for (let i = 0; i < rectangles.length - 1; i++) {
        const a = rectangles[i]
        for (let j = i+1; j < rectangles.length; j++) {
            const b = rectangles[j]

            if (a.intersects(b)) {
                return true
            }
        }
    }
    return false
}

function applyRectangle(rectangles, next) {
    if (!rectangles.length) {
        return [next]
    }

    const [noInts, splits] = rectangles.reduce(([noIntersections, splits], r) => {
        if (r.intersects(next)) {
            return [
                noIntersections,
                [...splits, ...buildSplitRectangles(r, next)]
            ]
        }
        return [
            [...noIntersections, r],
            splits
        ]
    }, [[], []])

    if (!splits.length) {
        return [...noInts, next]
    }

    const reduced = splits.reduce((acc, split) => {
        return applyRectangle(acc, split)
    }, noInts)
    return reduced
}

export function partTwo(instructions) {
    const originalRectangles = instructions.map(i => parseInstruction(i))
        .map(inst => new Rectangle(inst[1], inst[2], inst[3], inst[0]))


    const first = originalRectangles.shift()

    const result = originalRectangles.reduce((rectangles, next) => {
        if (anyIntersect(rectangles)) {
            console.log('bad news')
        }
        return applyRectangle(rectangles, next)
    }, [first])

    return result.map(r => r.volume)
        .reduce((a, b) => a + b)
}

