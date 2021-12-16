import * as fs from 'fs'
import {buildSuperGrid, partOne, partOne2, partTwo} from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day15/input.json', 'utf-8'))
}

const miniInput = [
    '99999',
    '19111',
    '19191',
    '19191',
    '11191',
]

const testInput = [
    '1163751742',
    '1381373672',
    '2136511328',
    '3694931569',
    '7463417111',
    '1319128137',
    '1359912421',
    '3125421639',
    '1293138521',
    '2311944581',
]

describe('Part 1', () => {
    it('should pass mini input', () => {
        expect(partOne2(miniInput)).toBe(14)
    })
    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(40)
    })
    it('should run real input', () => {
        expect(partOne2(loadInput())).toBe(602)
    })
});

describe('Part 2', () => {
    it.skip('do stuff', () => {
        const result = buildSuperGrid(testInput)
        console.log(result)
    })
    it('test input', () => {
        expect(partTwo(testInput)).toBe(315)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput());
        expect(actual).toBeLessThan(2944)
        expect(actual).toBe(2935)
    })
})
