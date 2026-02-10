import { getLong, putLong } from "./helpers.ts";

export const DATA_DIRECTORY_NAMES  = [
    { name: "IMAGE_DIRECTORY_ENTRY_EXPORT", index: 0, altName: ".edata" },
    { name: "IMAGE_DIRECTORY_ENTRY_IMPORT", index: 1, altName: ".idata" },
    { name: "IMAGE_DIRECTORY_ENTRY_RESOURCE", index: 2, altName: ".rsrc" },
    { name: "IMAGE_DIRECTORY_ENTRY_EXCEPTION", index: 3, altName: ".pdata" },
    { name: "IMAGE_DIRECTORY_ENTRY_SECURITY", index: 4, altName: "" },
    { name: "IMAGE_DIRECTORY_ENTRY_BASERELOC", index: 5, altName: ".reloc" },
    { name: "IMAGE_DIRECTORY_ENTRY_DEBUG", index: 6, altName: ".debug" },
    { name: "IMAGE_DIRECTORY_ENTRY_ARCHITECTURE", index: 7, altName: "" },
    { name: "IMAGE_DIRECTORY_ENTRY_GLOBALPTR", index: 8, altName: "" },
    { name: "IMAGE_DIRECTORY_ENTRY_TLS", index: 9, altName: ".tls" },
    { name: "IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG", index: 10, altName: "" },
    { name: "IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT", index: 11, altName: "" },
    { name: "IMAGE_DIRECTORY_ENTRY_IAT", index: 12, altName: "" },
    { name: "IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT", index: 13, altName: "" },
    { name: "IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR", index: 14, altName: "" },
]

function getDirectoryNameByIndex(index: number) {}

class DataDirectoryEntry {
    private virtualAddress = Buffer.alloc(4); // 4
    private size = Buffer.alloc(4); // 4

    static getSizeOf() {
        return 8;
    }

    getVirtualAddress() {
        return getLong(this.virtualAddress, 0);
    }

    setVirtualAddress(value: number) {
        putLong(this.virtualAddress, 0, value);
    }

    getSize() {
        return getLong(this.size, 0);
    }

    setSize(value: number) {
        putLong(this.size, 0, value);
    }

    static Read(data: Buffer) {
        const self = new DataDirectoryEntry();
        self.setVirtualAddress(getLong(data, 0));
        self.setSize(getLong(data, 4));
        return self;
    }

    write() {
        const b = Buffer.alloc(DataDirectoryEntry.getSizeOf());
        this.virtualAddress.copy(b, 0);
        this.size.copy(b, 4);
        return b;
    }

    toString() {
        return `${this.getVirtualAddress()}, Size: ${this.getSize()}\n`;
    }
}
export class DataDirectoryList {
    private entries: DataDirectoryEntry[] = [];
    static Read(data: Buffer<ArrayBufferLike>, numberOfRvaAndSizes: number) {
        const self = new DataDirectoryList();
        for (let i = 0; i < numberOfRvaAndSizes; i++) {
            let start = DataDirectoryEntry.getSizeOf() * i;
            let end = start + DataDirectoryEntry.getSizeOf();
            self.entries[i] = DataDirectoryEntry.Read(data.subarray(start, end));
        }
        return self;
    }

    toString() {
        let o = "";
        this.entries.forEach(entry => {
            o += entry.toString();
        });
        return o;
    }
}
