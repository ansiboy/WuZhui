export declare class Errors {
    constructor(parameters: any);
    static notImplemented(message?: string): Error;
    static argumentNull(paramName: any): Error;
    static controllBelonsAnother(): Error;
    static columnsCanntEmpty(): Error;
    static dataSourceCanntInsert(): Error;
    static dataSourceCanntUpdate(): Error;
    static dataSourceCanntDelete(): Error;
    static primaryKeyNull(key: string): Error;
    static queryResultTypeError(): Error;
    static argumentFieldNull(argumentName: string, fieldName: string): Error;
}
