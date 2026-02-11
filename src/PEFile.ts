import {NotEnoughDataError} from "./errors.ts"
import { NTHeaders } from "./NTHeaders.ts"
import { PESectionTable } from "./PESectionTable.ts"
import { PESection } from "./PESection.ts"

export class PEFile {
    
    private ntHeaders: NTHeaders
    private peSectionTable: PESectionTable
    private peSections: PESection[] = []
    
    constructor(data: Buffer) {
        this.ntHeaders = NTHeaders.parse(data)
        this.peSectionTable = PESectionTable.parse(data.subarray(this.ntHeaders.getStartOfOptionalHeader() + this.ntHeaders.getSizeOfOptionalHeader()), this.ntHeaders.getSectionCount())
    }
    static parse(data: Buffer): PEFile {
        if (data.byteLength < 4)
            throw new NotEnoughDataError()
        
        const peSigPointer = data.readInt16LE(0x3c)
        
        const self = new PEFile(data.subarray(peSigPointer))
        return self
    }

    private SectionsToString() {
        const sectionStrings =  this.peSections.map((section) => {
            return section.toString()
        })
        return sectionStrings.join("\n")
    }

    toString(): string {
        return "".concat(
            this.ntHeaders.toString(),
            this.peSectionTable.toString(),
            this.SectionsToString(),
            
        )
    }
 }
