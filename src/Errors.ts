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
        static columnsCanntEmpty() {
            return new Error("Columns cannt empty.");
        }
        static dataSourceCanntInsert() {
            return new Error("DataSource can not insert.");
        }
        static dataSourceCanntUpdate() {
            return new Error("DataSource can not update.");
        }
        static dataSourceCanntDelete() {
            return new Error("DataSource can not delete.");
        }
        static primaryKeyNull(key:string){
            let msg = `Primary key named '${key}' value is null.`;
            return new Error(msg);
        }
    }
}