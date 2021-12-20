import * as fs from 'fs'
import { partOne, partTwo } from './code'

const loadInput = () => {
    return [
        '144..178',//x
        '-100..-76'//y
    ]
}

const testInput = [
    '20..30',
    '-10..-5'
]

describe('Part 1', () => {
    it('should pass simple test input', () => {
        expect(partOne(testInput)).toBe(45)
    })
    it('should run real input', () => {
        const result = partOne(loadInput())
        expect(result).toBeGreaterThan(190)
        expect(result).toBe(4950)
    })
});

describe('Part 2', () => {
    it('test input', () => {
        expect(partTwo(testInput)).toBe(112)
    })


    it.only('should run real input', () => {
        const actual = partTwo(loadInput());
        expect(actual).toBeGreaterThan(1452)
        expect(actual).toBe(1477)
    })
})
