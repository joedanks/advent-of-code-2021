import * as fs from 'fs';
import {partOne, partTwo} from './code';

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day06/input.json', 'utf-8'));
}

const testInput = [
    3,4,3,1,2
];

describe('Part 1', () => {
    it('should pass test input: 18 days', () => {
        expect(partOne(testInput, 18)).toBe(26);
    })
    it('should pass test input: 80 days', () => {
        expect(partOne(testInput, 80)).toBe(5934);
    })
    it('should run real input', () => {
        expect(partOne(loadInput(), 80)).toBe(388419)
    })
});

describe('Part 2', () => {
    describe('test input', () => {
        it('256 days', () => {
            expect(partOne(testInput, 256)).toBe(26984457539);
        });

    });

    it('should run real input', () => {
        expect(partOne(loadInput(), 256)).toBe(1740449478328);
    })
})
