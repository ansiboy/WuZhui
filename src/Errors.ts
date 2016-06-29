namespace wuzhui {
    export class Errors {
        constructor(parameters) {

        }

        static notImplemented(message?: string) {
            message = message || "Not implemented";
            return new Error(message);
        }
        static argumentNull(paramName) {
            return new Error("Argument '" + paramName + "' can not be null.");
        }
        static controllBelonsAnother() {
            return new Error("The control is belongs another control.");
        }
    }
}