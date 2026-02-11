import { getLong, getShort } from "./helpers.ts";

export class SectionHeader {
    private name: Buffer = Buffer.alloc(8); // 8
    private virtualSize = 0; // 4
    private virtualAddress = 0; // 4
    private sizeOfRawData = 0; // 4
    private pointerToRawData = 0; // 4
    private pointerToRelocations = 0; // 4
    private pointerToLineNumbers = 0; // 4
    private numberOfRelocations = 0; // 2
    private numberOfLineNumbers = 0; // 2
    private characteristics = 0; // 4

    Read(data: Buffer) {
        this.name = data.subarray(0, 8);
        this.virtualSize = getLong(data, 8);
        this.virtualAddress = getLong(data, 12);
        this.sizeOfRawData = getLong(data, 16)
        this.pointerToRawData = getLong(data, 20)
        this.pointerToRelocations = getLong(data, 24)
        this.pointerToLineNumbers = getLong(data, 28)
        this.numberOfRelocations = getShort(data, 30)
        this.numberOfLineNumbers = getShort(data, 32    )
        this.characteristics - getLong(data, 36)
    }
    constructor() { }

    static getSizeOf() {
        return 40;
    }

    static parse(data: Buffer) {
        const self = new SectionHeader();
        self.Read(data);
        return self;
    }


    getName() {
        return this.name.toString("utf8");
    }

    toString() {
        return "".concat(
            `Name: ${this.getName()}\n`,
            `Size: ${this.virtualSize}\n`,
            `Address: ${this.virtualAddress}\n`,
            `Size of Raw Data: ${this.sizeOfRawData}\n`,
            `Pointer to raw data: ${this.pointerToRawData}\n`,
            `Pointer to relocations: ${this.pointerToRelocations}\n`,
            `Pointer to line numbers: ${this.pointerToLineNumbers}\n`
        );
    }
}
