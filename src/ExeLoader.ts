import { readFileSync } from "node:fs";
import { FileLoadError } from "./errors.ts";
import {PEFile} from "./PEFile.ts"

export class ExeLoader {
    private filepath: string = "";
    private peFile: PEFile
    
    static Parse(arg0: string) {
        const self = new ExeLoader(arg0);
        self.load()
        return self
    }
    static run(arg0: string) {
    }
    
    private constructor(filepath: string) {
        this.filepath = filepath;
        const data = this.load();
        this.peFile = PEFile.parse(data)
    }

    private load() {
        try {
            return readFileSync(this.filepath);        
        } catch (error) {
            throw FileLoadError.FromError(error as Error);
        }
    }

    toString() {
        return "".concat(
            "PE File\n",
            this.peFile.toString()
        )
    }
}
