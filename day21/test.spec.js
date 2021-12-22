import {partOne, partTwo} from './code'

describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(4, 8)).toBe(739785)
    })
    it('should run real input', () => {
        const actual = partOne(2, 10);
        expect(actual).toBe(571032)
    })
});

describe('Part 2', () => {
    it('test sample input', () => {
        expect(partTwo(4, 8)).toBe(444356092776315n)
    })

    it('should run real input', () => {
        const actual = partTwo(2, 10);
        expect(actual).toBe(49975322685009n)
    })
})

