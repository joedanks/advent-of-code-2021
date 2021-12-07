import * as fs from 'fs';
import {findCO2Rating, findOxygenRating, partOne, partTwo} from './code';

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day03/input.json', 'utf-8'));
}

const testInput = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
];

describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(198);
    })

    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(749376)
    })
});

describe('Part 2', () => {
    describe('test input', () => {
        it('compute oxygen generator rating', () => {
            expect(findOxygenRating(testInput)).toBe('10111')
        });
        it('compute co2 scrubber rating', () => {
            expect(findCO2Rating(testInput)).toBe('01010')
        })
        it('should pass test input', () => {
            expect(partTwo(testInput)).toBe(230);
        });

    });

    it('should run real input', () => {
        expect(partTwo(loadInput())).toBe(2372923);
    })
})
