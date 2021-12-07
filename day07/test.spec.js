import * as fs from 'fs';
import {partOne, partTwo} from './code';

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day07/input.json', 'utf-8'));
}

const testInput = [
    16, 1, 2, 0, 4, 2, 7, 1, 2, 14
];

describe('Part 1', () => {
    it('should pass test input: 18 days', () => {
        expect(partOne(testInput)).toBe(37);
    })
    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(357353)
    })
});

describe('Part 2', () => {
    it('test input', () => {
        expect(partTwo(testInput)).toBe(168);
    });

    it('should run real input', () => {
        expect(partTwo(loadInput())).toBe(104822130);
    })
})
