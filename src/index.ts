import { NotEnoughArgs } from "./errors.ts"
import { ExeLoader } from "./ExeLoader.ts"
import { trimOffPathAndFilename } from "./helpers.ts"

function main(argc: number, argv: string[]): number {

    const args = trimOffPathAndFilename(argv)

    if (args.length < 1) {
        throw new NotEnoughArgs()
    }

    try {
        ExeLoader.run(args[0]!)
    } catch (error) {
        console.log(`Fatal error: ${(error as Error).message}`)
        return 1
    }

    return 0
}

process.exit(main(process.argv.length, process.argv))