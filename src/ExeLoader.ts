import { readFileSync } from "node:fs";
import { FileLoadError } from "./errors.ts";

export class ExeLoader {
    private filepath: string = "";

    static run(arg0: string) {
        const self = new ExeLoader(arg0);
        self.load();
    }

    private constructor(filepath: string) {
        this.filepath = filepath;
    }

    private load() {
        try {
            const exeContents = readFileSync(this.filepath, { encoding: "binary" });
        } catch (error) {
            throw FileLoadError.FromError(error as Error);
        }
    }
}
