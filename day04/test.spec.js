import * as fs from 'fs';
import { partOne, partTwo, readBoards } from './code';

function loadInput() {
    return JSON.parse(fs.readFileSync('day04/input.json', 'utf-8'))
}

function loadBoards() {
    return JSON.parse(fs.readFileSync('day04/boards.json', 'utf-8'))
}


const testInput = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];

const testBoards = [
'22 13 17 11  0',
' 8  2 23  4 24',
'21  9 14 16  7',
' 6 10  3 18  5',
' 1 12 20 15 19',
'',
' 3 15  0  2 22',
' 9 18 13 17  5',
'19  8  7 25 23',
'20 11 10 24  4',
'14 21 16 12  6',
'',
'14 21 17 24  4',
'10 16 15  9 19',
'18  8 23 26 20',
'22 11 13  6  5',
' 2  0 12  3  7'
]

describe('Part One', () => {
    it('should pass test input', () => {
        expect(partOne(testInput, testBoards)).toBe(4512);
    })
    it('should do winners', () => {
        const entry = [14, 21, 17, 24,  4]
        const selected = [7,4,9,5,11,17,23,2,0,14,21,24]

        const win = entry.every(e => selected.includes(e))

        expect(win).toBe(true)
    })
    it('should load real boards', () => {
        readBoards(testBoards)
    })
    it('should pass real input', () => {
        // expect(partOne(loadInput(), loadBoards())).toBeLessThan(63342);
        expect(partOne(loadInput(), loadBoards())).toBe(0);
    })
})

describe('Part Two', () => {
    it('should pass test input', () => {
        expect(partTwo(testInput, testBoards)).toBe(1924)
    })
    it.only('should pass real input', () => {
        const result = partTwo(loadInput(), loadBoards())
        expect(result).toBe(8224)
    })
})