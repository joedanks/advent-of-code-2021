import * as fs from 'fs'
import {partOne, partTwo} from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day08/input.json', 'utf-8'))
}

const testInputSimple = [
    'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'
]

const twoFiveInput = [
    'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe'
]

const testInput = [
    'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
    'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
    'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
    'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
    'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
    'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
    'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
    'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
    'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
    'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
]

describe('Part 1', () => {
    it('should pass simple test input', () => {
        expect(partOne(testInputSimple)).toBe(0)
    })
    it('should pass test input', () => {
        expect(partOne(testInput)).toBe(26)
    })
    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(272)
    })
});

describe('Part 2', () => {
    it('simple test input', () => {
        expect(partTwo(testInputSimple)).toBe(5353)
    });
    it('simple 2 & 5 test input', () => {
        expect(partTwo(twoFiveInput)).toBe(4548)
    });
    it('test input', () => {
        expect(partTwo(testInput)).toBe(61229)
    });

    it('should run real input', () => {
        expect(partTwo(loadInput())).toBe(1007675)
    })
})
