import * as fs from 'fs'
import {partOne, partTwo} from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day20/input.json', 'utf-8'))
}

const loadAlgorithm = () => {
    return '##...#####.###...##.##..###.#..####..#.####......#.#.##..#.###.##.#..#...##.#.##..######..##.#.##..#..##.......#.#.#.######......#.##...##.#.#...###...#.##.###.##.#.##.#..#.####.#.#.####.#..#.#.##.....#####.#..##......####...#..####..#.##.#.#...#.#.#.#...#..##.###..#..##.#...#.##.###..#######.#.###.###.###.#.#.###.#####...#.#.###.##...#..##.#.#..#...#####.....##..###.###..#.#.#.#...####.#...#.####.#.##.#.##...###.####.#.#.###..#...#.##.##.##..#...##.#....#####..#..#..#...#..#.#.#.#..####....#.#....#..###.#.'
}

const testInput = [
    '#..#.',
    '#....',
    '##..#',
    '..#..',
    '..###'
]

const testAlgorithm = '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##' +
    '#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###' +
    '.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.' +
    '.#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....' +
    '.#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..' +
    '...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....' +
    '..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#'


describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(testInput, testAlgorithm)).toBe(35)
    })
    it('should run real input', () => {
        const actual = partOne(loadInput(), loadAlgorithm());
        expect(actual).toBeGreaterThan(5604)
        expect(actual).toBeLessThan(6274)
        expect(actual).toBe(5619)
    })
});

describe('Part 2', () => {
    it('test sample input', () => {
        expect(partTwo(testInput, testAlgorithm)).toBe(3351)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput(), loadAlgorithm());
        expect(actual).toBe(20122)
    })
})
