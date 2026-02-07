
export class PESectionTable {
    private name: string

    constructor(data: Buffer) {
        this.name = data.subarray(0, 8).toString("utf8")
    }

    static parse(data: Buffer<ArrayBufferLike>): PESectionTable {
        return new PESectionTable(data)
    } 

    toString() {
        return "".concat("Section Table\n")
    }

}
export class PESection { }
