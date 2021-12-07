import * as fs from 'fs';
import {partOne, partTwo} from './code';

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day02/input.json', 'utf-8'));
}

const testInput = [
    {"forward": 5},
    {"down": 5},
    {"forward": 8},
    {"up": 3},
    {"down": 8},
    {"forward": 2}
];

describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(150);
    })

    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(1580000)
    })
});

describe('Part 2', () => {
    it('should pass test input', () => {
        expect(partTwo(testInput)).toBe(900);
    });

    it('should run real input', () => {
        expect(partTwo(loadInput())).toBe(1251263225);
    })
})
