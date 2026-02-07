
const machineNames = new Map()
machineNames.set(0x14c, "IMAGE_FILE_MACHINE_I386")

function machineIDToString(machineId: number): string {
    return machineNames.get(machineId) ??  `UNKNOWN(${machineId.toString(16)})`
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
        this.machine = machineIDToString(data.readInt16LE(0))
        
    }
    static Parse(data: Buffer<ArrayBufferLike>): PEFileHeader {
        return new PEFileHeader(data)
    } 

    static get getSizeOf() {
        return 20
    }

    toString() {
        return "".concat(
            "File Header\n",
            `Machine: ${this.machine}\n`
        )
    }


    
}
