import { DataSource } from "maishu-toolkit";
import { Control } from "./Control";
export interface DropdownParams<T> {
    dataSource: DataSource<T>;
    element: HTMLSelectElement;
    nameField: keyof T;
    valueField: keyof T;
}
export declare class Dropdown<T> extends Control<HTMLSelectElement> {
    #private;
    constructor(params: DropdownParams<T>);
    get dataSource(): DataSource<T>;
    init(params: DropdownParams<T>): Promise<void>;
    private addOptionElement;
    private primaryKeyValue;
}
