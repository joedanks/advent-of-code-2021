import * as fs from 'fs';
import { partOne, partTwo, readBoards } from './code';

function loadInput() {
    return JSON.parse(fs.readFileSync('day05/input.json', 'utf-8'))
}

const testInput = [
    '0,9','5,9',
    '8,0','0,8',
    '9,4','3,4',
    '2,2','2,1',
    '7,0','7,4',
    '6,4','2,0',
    '0,9','2,9',
    '3,4','1,4',
    '0,0','8,8',
    '5,5','8,2',
]

describe('Part One', () => {
    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(5)
    })
    it('should pass real input', () => {
        expect(partOne(loadInput())).toBe(5280)
    })
})

describe('Part Two', () => {
    it('should pass test input', () => {
        expect(partTwo(testInput)).toBe(12)
    })
    it('should pass real input', () => {
        const result = partTwo(loadInput())
        expect(result).toBeGreaterThan(12680)
        expect(result).toBe(12680)
    })
})