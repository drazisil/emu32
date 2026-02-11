import { PEOptionalHeader } from "./PEOptionalHeader.ts";
import { PEFileHeader } from "./PEFileHeader.ts";

export class NTHeaders {
    private fileHeader: PEFileHeader
    private startOfOptionalHeader: number
    private optionalHeader: PEOptionalHeader;
    
    
    private constructor(data: Buffer) {
        this.validatePESignature(data);
        this.fileHeader = PEFileHeader.Parse(data.subarray(4))
        this.startOfOptionalHeader = PEFileHeader.getSizeOf() + 4
        this.optionalHeader = PEOptionalHeader.Parse(data.subarray(this.startOfOptionalHeader, this.startOfOptionalHeader + this.fileHeader.getSizeOfOptionalHeader()), this.fileHeader.getSizeOfOptionalHeader())
    }
    getSizeOf(): number {
        return this.fileHeader.getSizeOfOptionalHeader() + this.fileHeader.getSizeOfOptionalHeader()
    }
    getSectionCount(): number {
        return this.fileHeader.getSectionCount()
    }
    private validatePESignature(data: Buffer) {
        const PE_SIGNATURE = "PE\0\0";

        if (data.subarray(0, 4).toString() !== PE_SIGNATURE)
            throw new Error('PE sig does not match');
    }
    static parse(data: Buffer): any {
        return new NTHeaders(data);
    }

    getSizeOfOptionalHeader() {
        return this.fileHeader.getSizeOfOptionalHeader()
    }

    getStartOfOptionalHeader() {
        return this.startOfOptionalHeader
    }

    toString(): string {
        return "".concat("NT Headers\n",
            this.fileHeader.toString(),
            this.optionalHeader.toString()
        )
    }

}
