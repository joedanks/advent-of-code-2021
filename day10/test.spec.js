import * as fs from 'fs'
import {partOne, partTwo} from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day10/input.json', 'utf-8'))
}

const testInput = [
    '[({(<(())[]>[[{[]{<()<>>',
    '[(()[<>])]({[<{<<[]>>(',
    '{([(<{}[<>[]}>{[]{[(<()>',
    '(((({<>}<{<{<>}{[]{[]{}',
    '[[<[([]))<([[{}[[()]]]',
    '[{[{({}]{}}([{[{{{}}([]',
    '{<[[]]>}<{[{[{[]{()[[[]',
    '[<(<(<(<{}))><([]([]()',
    '<{([([[(<>()){}]>(<<{{',
    '<{([{{}}[<[[[<>{}]]]>[]]'
]

describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(26397)
    })
    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(462693)
    })
});

describe('Part 2', () => {
    it('test input', () => {
        expect(partTwo(testInput)).toBe(288957)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput());
        expect(actual).toBe(0)
    })
})
