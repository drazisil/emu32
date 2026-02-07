
class NotEnoughArgs extends Error {}

function main(argc: number, argv: string[]): number {

    const args = trimOffPathAndFilename(argv)

    if (args.length < 1)
        throw new NotEnoughArgs()


    console.log(args.length)
    console.log(args)

    return 1
}

function trimOffPathAndFilename(argv: string[]) {
    return argv.slice(2)
}

process.exit(main(process.argv.length, process.argv))