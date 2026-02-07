class ClonableError extends Error {
    static FromError(src: Error) {
        const self = new FileLoadError();
        self.cause = src.cause;
        self.message = src.message;
        self.stack = src.stack ?? "";
    }

}
export class NotEnoughArgs extends ClonableError { }
export class FileLoadError extends ClonableError {
}
