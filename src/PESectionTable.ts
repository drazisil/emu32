import { SectionHeader } from "./SectionHeader.ts"

export class PESectionTable {
    private sectionHeaders: SectionHeader[] = []

    constructor(data: Buffer, numberOfSections: number) {
        for (let i = 0; i < numberOfSections; i++) {
            this.sectionHeaders.push(SectionHeader.parse(data.subarray(i * SectionHeader.getSizeOf())))
            
        }
    }

    static parse(data: Buffer<ArrayBufferLike>, numberOfSections : number): PESectionTable {
        return new PESectionTable(data, numberOfSections)
    } 

    toString() {
                let o = "";
        this.sectionHeaders.forEach(entry => {
            o += entry.toString();
        });
        return "".concat("Section Table\n",
            `${o}\n`
        )
    }

}

