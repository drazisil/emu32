import { PEOptionalHeader } from "./PEOptionalHeader.ts";
import { PEFileHeader } from "./PEFileHeader.ts";

export class NTHeaders {
    private fileHeader: PEFileHeader
    private optionalHeader: PEOptionalHeader;


    private constructor(data: Buffer) {
        this.validatePESignature(data);
        this.fileHeader = PEFileHeader.Parse(data.subarray(4))
        const startOfOptionAlHeader = PEFileHeader.getSizeOf() + 4
        this.optionalHeader = PEOptionalHeader.Parse(data.subarray(startOfOptionAlHeader, startOfOptionAlHeader + this.fileHeader.getSizeOfOptionalHeader()))
    }
    private validatePESignature(data: Buffer) {
        const PE_SIGNATURE = "PE\0\0";

        if (data.subarray(0, 4).toString() !== PE_SIGNATURE)
            throw new Error('PE sig does not match');
    }
    static parse(data: Buffer): any {
        return new NTHeaders(data);
    }

    toString(): string {
        return "".concat("NT Headers\n",
            this.fileHeader.toString(),
            this.optionalHeader.toString()
        )
    }

}
