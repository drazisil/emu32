import { getLong, getShort } from "./helpers.ts"

const machineNames = new Map()
machineNames.set(0x14c, "IMAGE_FILE_MACHINE_I386")

function machineIDToString(machineId: number): string {
    return machineNames.get(machineId) ?? `UNKNOWN(${machineId.toString(16)})`
}

export class PEFileHeader {
    private machine // 2
    private numberOfSections // 2
    private timeDateStamp // 4
    private pointerToSymbolTable // 4
    private numberOfSymbols // 4
    private sizeOfOptionalHeader // 2
    private characteristics // 2
    
    private constructor(data: Buffer) {
        this.machine = machineIDToString(getShort(data, 0))
        this.numberOfSections = getShort(data, 2)
        this.timeDateStamp = getLong(data, 4)
        this.pointerToSymbolTable = getLong(data, 8)
        this.numberOfSymbols = getLong(data, 12)
        this.sizeOfOptionalHeader = getShort(data, 16)
        this.characteristics = getShort(data, 18)
        
    }
    getSectionCount(): number {
        return this.numberOfSections
    }
    getSizeOfOptionalHeader() {
        return this.sizeOfOptionalHeader
    }
    static Parse(data: Buffer<ArrayBufferLike>): PEFileHeader {
        return new PEFileHeader(data)
    }

    static getSizeOf() {
        return 20
    }

    toString() {
        return "".concat(
            "File Header\n",
            `Machine: ${this.machine}\n`,
            `Number of sections: ${this.numberOfSections}\n`,
            `Pointer to symbol table: ${this.pointerToSymbolTable}\n`,
            `Number of symbols: ${this.numberOfSymbols}\n`,
            `Size of optional header: ${this.sizeOfOptionalHeader}\n`,
            `Characteristics: ${this.characteristics}\n`
        )
    }



}
