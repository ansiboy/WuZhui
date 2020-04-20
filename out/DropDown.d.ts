import { DataSource } from "./DataSource";
import { Control } from "./Control";
export interface DropDownParams<T> {
    dataSource: DataSource<T>;
    element: HTMLSelectElement;
    nameField?: keyof T;
    valueField?: keyof T;
    emptyText?: string;
}
export declare class DropDown<T> extends Control<HTMLSelectElement> {
    constructor(params: DropDownParams<T>);
    init<T>(params: DropDownParams<T>): Promise<void>;
}
