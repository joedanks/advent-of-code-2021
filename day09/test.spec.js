import * as fs from 'fs'
import {partOne, partTwo} from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day09/input.json', 'utf-8'))
}

const loadSmallInput = () => {
    return JSON.parse(fs.readFileSync('src/day09/subinput.json', 'utf-8'))
}

const testInput = [
    '2199943210',
    '3987894921',
    '9856789892',
    '8767896789',
    '9899965678'
]

describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(15)
    })
    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(526)
    })
});

describe('Part 2', () => {
    it('sort', () => {
        const list = [4,7,1,2,9,0]

        expect(list.sort((a, b) => b - a)).toStrictEqual([9,7,4,2,1,0])
    })

    it('test input', () => {
        expect(partTwo(testInput)).toBe(1134)
    })

    it('should run sub real input', () => {
        const actual = partTwo(loadSmallInput());
        expect(actual).toBe(75)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput());
        expect(actual).toBe(0)
    })
})
