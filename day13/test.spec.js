import * as fs from 'fs'
import {partOne, partTwo} from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day13/input.json', 'utf-8'))
}
const loadInstructions = () => {
    return JSON.parse(fs.readFileSync('src/day13/instructions.json', 'utf-8'))
}

const testInput = [
    '6,10',
    '0,14',
    '9,10',
    '0,3',
    '10,4',
    '4,11',
    '6,0',
    '6,12',
    '4,1',
    '0,13',
    '10,12',
    '3,4',
    '3,0',
    '8,4',
    '1,10',
    '2,14',
    '8,10',
    '9,0'
]

const testInstructions = [
    'fold along y=7',
    'fold along x=5'
]

describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(testInput, [testInstructions[0]])).toBe(17)
    })
    it('should run real input', () => {
        expect(partOne(loadInput(), [loadInstructions()[0]])).toBe(765)
    })
});

describe('Part 2', () => {
    it('test input', () => {
        expect(partTwo(testInput, testInstructions)).toBe(16)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput(), loadInstructions());
        expect(actual).toBe(98)
        //RZKZLPGH
    })
})
