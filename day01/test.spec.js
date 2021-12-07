import * as fs from 'fs';
import {partOne, partTwo} from './code';

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day01/input.json', 'utf-8'));
}

const testInput = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263
];

describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(7);
    })

    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(1532)
    })
});

describe('Part 2', () => {
    it('should pass test input', () => {
        expect(partTwo(testInput)).toBe(5);
    });

    it('should run real input', () => {
        expect(partTwo(loadInput())).toBe(1571);
    })
})
