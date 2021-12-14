import * as fs from 'fs'
import {partOne, partTwo} from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day14/input.json', 'utf-8'))
}

const testInsertions = [
    'CH -> B',
    'HH -> N',
    'CB -> H',
    'NH -> C',
    'HB -> C',
    'HC -> B',
    'HN -> C',
    'NN -> C',
    'BH -> H',
    'NC -> B',
    'NB -> B',
    'BN -> B',
    'BB -> N',
    'BC -> B',
    'CC -> N',
    'CN -> C',
]

const testTemplate = 'NNCB'

describe('Part 1', () => {
    it('should pass test input', () => {
        expect(partOne(testTemplate, testInsertions, 10)).toBe(1588n)
    })
    it('should run real input', () => {
        expect(partOne('VCOPVNKPFOOVPVSBKCOF', loadInput(), 1)).toBe(6)
        expect(partTwo('VCOPVNKPFOOVPVSBKCOF', loadInput(), 1)).toBe(6n)
        expect(partOne('VCOPVNKPFOOVPVSBKCOF', loadInput(), 2)).toBe(9)
        expect(partTwo('VCOPVNKPFOOVPVSBKCOF', loadInput(), 2)).toBe(9n)
        expect(partOne('VCOPVNKPFOOVPVSBKCOF', loadInput(), 3)).toBe(16)
        expect(partTwo('VCOPVNKPFOOVPVSBKCOF', loadInput(), 3)).toBe(16n)
        expect(partOne('VCOPVNKPFOOVPVSBKCOF', loadInput(), 4)).toBe(38)
        expect(partTwo('VCOPVNKPFOOVPVSBKCOF', loadInput(), 4)).toBe(38n)
        expect(partOne('VCOPVNKPFOOVPVSBKCOF', loadInput(), 5)).toBe(76)
        expect(partTwo('VCOPVNKPFOOVPVSBKCOF', loadInput(), 5)).toBe(76n)
        expect(partOne('VCOPVNKPFOOVPVSBKCOF', loadInput(), 10)).toBe(2851)
        expect(partTwo('VCOPVNKPFOOVPVSBKCOF', loadInput(), 10)).toBe(2851n)
    })
});

describe('Part 2', () => {
    it('test input', () => {
        expect(partTwo(testTemplate, testInsertions, 40)).toBe(2188189693529n)
    })

    it('should run real input', () => {
        const actual = partTwo('VCOPVNKPFOOVPVSBKCOF', loadInput(), 40);
        expect(actual).toBeGreaterThan(8897365387118n)
        expect(actual).toBe(10002813279337n)
    })
})

//9007199254740991
//3702674349
