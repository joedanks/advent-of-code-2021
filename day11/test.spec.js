import * as fs from 'fs'
import { parseOctopi, partOne, partTwo, step } from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('day11/input.json', 'utf-8'))
}

const testInput = [
    '5483143223',
    '2745854711',
    '5264556173',
    '6141336146',
    '6357385478',
    '4167524645',
    '2176841721',
    '6882881134',
    '4846848554',
    '5283751526'
]

describe('Part 1', () => {
    const flashInput = [
        '11111',
        '19991',
        '19191',
        '19991',
        '11111'
    ]

    it.skip('should flash and bump neighbors', () => {
        const octopi = parseOctopi(flashInput)

        step(octopi)
        
        ```
        34543
        40004
        50005
        40004
        34543
        ```
        console.log(octopi)  
    })

    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(1656)
    })
    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(1694)
    })
});

describe('Part 2', () => {
    it('test input', () => {
        expect(partTwo(testInput)).toBe(195)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput());
        expect(actual).toBe(346)
    })
})
