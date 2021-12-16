import * as fs from 'fs'
import {partOne, partTwo, readPacket, convertHexToBinary} from './code'

const loadInput = () => {
    return '005173980232D7F50C740109F3B9F3F0005425D36565F202012CAC0170004262EC658B0200FC3A8AB0EA5FF331201507003710004262243F8F600086C378B7152529CB4981400B202D04C00C0028048095070038C00B50028C00C50030805D3700240049210021C00810038400A400688C00C3003E605A4A19A62D3E741480261B00464C9E6A5DF3A455999C2430E0054FCBE7260084F4B37B2D60034325DE114B66A3A4012E4FFC62801069839983820061A60EE7526781E513C8050D00042E34C24898000844608F70E840198DD152262801D382460164D9BCE14CC20C179F17200812785261CE484E5D85801A59FDA64976DB504008665EB65E97C52DCAA82803B1264604D342040109E802B09E13CBC22B040154CBE53F8015796D8A4B6C50C01787B800974B413A5990400B8CA6008CE22D003992F9A2BCD421F2C9CA889802506B40159FEE0065C8A6FCF66004C695008E6F7D1693BDAEAD2993A9FEE790B62872001F54A0AC7F9B2C959535EFD4426E98CC864801029F0D935B3005E64CA8012F9AD9ACB84CC67BDBF7DF4A70086739D648BF396BFF603377389587C62211006470B68021895FCFBC249BCDF2C8200C1803D1F21DC273007E3A4148CA4008746F8630D840219B9B7C9DFFD2C9A8478CD3F9A4974401A99D65BA0BC716007FA7BFE8B6C933C8BD4A139005B1E00AC9760A73BA229A87520C017E007C679824EDC95B732C9FB04B007873BCCC94E789A18C8E399841627F6CF3C50A0174A6676199ABDA5F4F92E752E63C911ACC01793A6FB2B84D0020526FD26F6402334F935802200087C3D8DD0E0401A8CF0A23A100A0B294CCF671E00A0002110823D4231007A0D4198EC40181E802924D3272BE70BD3D4C8A100A613B6AFB7481668024200D4188C108C401D89716A080'
}

const testInput = [

]

describe('Part 1', () => {
    it('should read sample literal packet', () => {
        const input = 'D2FE28'
        const binary = convertHexToBinary(input)
        const packet = readPacket(binary)

        expect(packet).not.toBeNull()
    });
    it('should read sample operator packet', () => {
        const input = '38006F45291200'
        const binary = convertHexToBinary(input)
        const packet = readPacket(binary)

        expect(packet).not.toBeNull()
    });
    it('should pass first test input', () => {
        expect(partOne('8A004A801A8002F478')).toBe(16)
    })
    it('should pass second test input', () => {
        expect(partOne('620080001611562C8802118E34')).toBe(12)
    })
    it('should pass third test input', () => {
        expect(partOne('C0015000016115A2E0802F182340')).toBe(23)
    })
    it('should pass fourth test input', () => {
        expect(partOne('A0016C880162017C3686B18A3D4780')).toBe(31)
    })
    it('should run real input', () => {
        expect(partOne(loadInput())).toBe(886)
    })
});

describe('Part 2', () => {
    it('test first input - sum', () => {
        expect(partTwo('C200B40A82')).toBe(3)
    })
    it('test second input - product', () => {
        expect(partTwo('04005AC33890')).toBe(54)
    })
    it('test third input - min', () => {
        expect(partTwo('880086C3E88112')).toBe(7)
    })
    it('test fourth input - max', () => {
        expect(partTwo('CE00C43D881120')).toBe(9)
    })
    it('test fifth input - less than', () => {
        expect(partTwo('D8005AC2A8F0')).toBe(1)
    })
    it('test sixth input - greater than', () => {
        expect(partTwo('F600BC2D8F')).toBe(0)
    })
    it('test seventh input - equal', () => {
        expect(partTwo('9C005AC2F8F0')).toBe(0)
    })
    it('test eighth input', () => {
        expect(partTwo('9C0141080250320F1802104A08')).toBe(1)
    })

    it('should run real input', () => {
        const actual = partTwo(loadInput());
        expect(actual).toBe(184487454837)
    })
})

