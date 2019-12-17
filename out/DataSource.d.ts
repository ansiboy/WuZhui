export interface DataSourceSelectResult<T> {
    totalRowCount: number;
    dataItems: Array<T>;
}
export interface DataSourceError extends Error {
    handled: boolean;
    method: DataMethod;
}
export declare type DataMethod = 'select' | 'update' | 'delete' | 'insert';
export declare class DataSource<T> {
    private args;
    primaryKeys: (keyof T)[];
    inserting: import("./Utility").Callback2<DataSource<T>, T, number>;
    inserted: import("./Utility").Callback2<DataSource<T>, T, number>;
    deleting: import("./Utility").Callback1<DataSource<T>, T>;
    deleted: import("./Utility").Callback1<DataSource<T>, T>;
    updating: import("./Utility").Callback1<DataSource<T>, T>;
    updated: import("./Utility").Callback1<DataSource<T>, T>;
    selecting: import("./Utility").Callback1<DataSource<T>, DataSourceSelectArguments>;
    selected: import("./Utility").Callback1<DataSource<T>, DataSourceSelectResult<T>>;
    error: import("./Utility").Callback1<this, DataSourceError>;
    constructor(args: DataSourceArguments<T>);
    get canDelete(): boolean;
    get canInsert(): boolean;
    get canUpdate(): boolean;
    executeInsert(item: T, args?: any): Promise<any>;
    executeDelete(item: T, args?: any): Promise<any>;
    executeUpdate(item: T, args?: any): Promise<any>;
    executeSelect(args?: DataSourceSelectArguments): Promise<DataSourceSelectResult<T>>;
    insert(item: T): any;
    insert(item: T, index?: number): any;
    delete(item: T, args?: any): Promise<any>;
    update(item: T, args?: any): Promise<any>;
    isSameItem(theItem: T, otherItem: T): boolean;
    private checkPrimaryKeys;
    select(args?: DataSourceSelectArguments): Promise<DataSourceSelectResult<T>>;
    private processError;
}
export declare class DataSourceSelectArguments {
    startRowIndex?: number;
    maximumRows?: number;
    sortExpression?: string;
    filter?: string;
    constructor();
}
export declare type DataSourceArguments<T> = {
    primaryKeys?: (keyof T)[];
    select: ((args: DataSourceSelectArguments) => Promise<DataSourceSelectResult<T>>);
    insert?: ((item: T, args?: any) => Promise<any>);
    update?: ((item: T, args?: any) => Promise<any>);
    delete?: ((item: T, args?: any) => Promise<any>);
    sort?: (items: T[]) => T[];
};
export declare class ArrayDataSource<T> extends DataSource<T> {
    constructor(items: T[]);
}
