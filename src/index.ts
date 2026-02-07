import { NotEnoughArgs } from "./errors.ts"
import { ExeLoader } from "./ExeLoader.ts"
import { trimOffPathAndFilename } from "./helpers.ts"

function main(argc: number, argv: string[]): number {

    const args = trimOffPathAndFilename(argv)

    if (args.length < 1) {
        throw new NotEnoughArgs()
    }

    try {
        const exe = ExeLoader.Parse(args[0]!)
        console.log(exe.toString())
    } catch (error) {
        console.log(`Fatal error: ${(error as Error).message}`)
        console.dir(error)
        return 1
    }

    return 0
}

process.exit(main(process.argv.length, process.argv))