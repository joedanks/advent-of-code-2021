import * as fs from 'fs'
import {partOne, partTwo, sumAndReduce, reduce, parseRawInput, magnitude} from './code'

const loadInput = () => {
    return JSON.parse(fs.readFileSync('src/day18/input.json', 'utf-8'))
}

const testInput = [
    '[1,1]',
    '[2,2]',
    '[3,3]',
    '[4,4]',
    '[5,5]',
    '[6,6]'
]

const largerTest = [
    '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
    '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
    '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
    '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
    '[7,[5,[[3,8],[1,4]]]]',
    '[[2,[2,2]],[8,[8,1]]]',
    '[2,9]',
    '[1,[[[9,3],9],[[9,0],[0,7]]]]',
    '[[[5,[7,4]],7],1]',
    '[[[[4,2],2],6],[8,7]]'
]

const realTest = [
    '[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]',
    '[[[5,[2,8]],4],[5,[[9,9],0]]]',
    '[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]',
    '[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]',
    '[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]',
    '[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]',
    '[[[[5,4],[7,7]],8],[[8,3],8]]',
    '[[9,3],[[9,9],[6,[4,9]]]]',
    '[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]',
    '[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]',
]

describe('Part 1', () => {
    it('should explode with no number to left', () => {
        const input = '[[[[[9,8],1],2],3],4]'
        expect(reduce(parseRawInput(input)).join('')).toBe('[[[[09]2]3]4]')
    })
    it('should explode with no number to right', () => {
        const input = '[7,[6,[5,[4,[3,2]]]]]'
        expect(reduce(parseRawInput(input)).join('')).toBe('[7[6[5[70]]]]')
    })
    it('should explode with number far to right', () => {
        const input = '[[6,[5,[4,[3,2]]]],1]'
        expect(reduce(parseRawInput(input)).join('')).toBe('[[6[5[70]]]3]')
    })
    it('should explode sample', () => {
        const input = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'
        expect(reduce(parseRawInput(input)).join('')).toBe('[[3[2[80]]][9[5[70]]]]')
    })
    it('should sum and reduce test input', () => {
        expect(sumAndReduce(testInput).join('')).toBe('[[[[50][74]][55]][66]]')
    })
    it('should sum and reduce larger test input', () => {
        expect(sumAndReduce(largerTest).join('')).toBe('[[[[87][77]][[86][77]]][[[07][66]][87]]]')
    })
    it('should calc magnitude of test input', () => {
        const input = '[[1,2],[[3,4],5]]'
        expect(magnitude(parseRawInput(input))).toBe(143)
    })
    it('should calc magnitude of bigger test input', () => {
        const input = '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
        expect(magnitude(parseRawInput(input))).toBe(3488)
    })
    it('should reduce test input', () => {
        expect(sumAndReduce(realTest).join('')).toBe('[[[[66][76]][[77][70]]][[[77][77]][[78][99]]]]')
    })
    it('should pass test input', () => {
        expect(partOne(realTest)).toBe(4140)
    })
    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(4033)
    })
});

describe('Part 2', () => {
    it('test sample input', () => {
        expect(partTwo(realTest)).toBe(3993)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput());
        expect(actual).toBe(4864)
    })
})

