import * as fs from 'fs'
import { partOne, partTwo } from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('day12/input.json', 'utf-8'))
}

const testInput = [
    'start-A',
    'start-b',
    'A-c',
    'A-b',
    'b-d',
    'A-end',
    'b-end'
]

describe('Part 1', () => {
    it('should pass simple test input', () => {
        expect(partOne(testInput)).toBe(10)
    })
    it('should pass larger test input', () => {
        const largerInput = [
            "dc-end",
            "HN-start",
            "start-kj",
            "dc-start",
            "dc-HN",
            "LN-dc",
            "HN-end",
            "kj-sa",
            "kj-HN",
            "kj-dc",
        ]

        expect(partOne(largerInput)).toBe(19)
    })
    it('should pass even larger test input', () => {
        const largerInput = [
            "fs-end",
            "he-DX",
            "fs-he",
            "start-DX",
            "pj-DX",
            "end-zg",
            "zg-sl",
            "zg-pj",
            "pj-he",
            "RW-he",
            "fs-DX",
            "pj-RW",
            "zg-RW",
            "start-pj",
            "he-WI",
            "zg-he",
            "pj-fs",
            "start-RW",
        ]

        expect(partOne(largerInput)).toBe(226)
    })
    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(4304)
    })
});

describe.only('Part 2', () => {
    it('test input', () => {
        expect(partTwo(testInput)).toBe(36)
    })

    it('should pass larger test input', () => {
        const largerInput = [
            "dc-end",
            "HN-start",
            "start-kj",
            "dc-start",
            "dc-HN",
            "LN-dc",
            "HN-end",
            "kj-sa",
            "kj-HN",
            "kj-dc",
        ]

        expect(partTwo(largerInput)).toBe(103)
    })
    it('should pass even larger test input', () => {
        const largerInput = [
            "fs-end",
            "he-DX",
            "fs-he",
            "start-DX",
            "pj-DX",
            "end-zg",
            "zg-sl",
            "zg-pj",
            "pj-he",
            "RW-he",
            "fs-DX",
            "pj-RW",
            "zg-RW",
            "start-pj",
            "he-WI",
            "zg-he",
            "pj-fs",
            "start-RW",
        ]

        expect(partTwo(largerInput)).toBe(3509)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput());
        expect(actual).toBe(118242)
    })
})
