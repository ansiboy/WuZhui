import { DataSource } from "maishu-toolkit";
import { Control } from "./Control";
export interface DropDownParams<T> {
    dataSource: DataSource<T>;
    element: HTMLSelectElement;
    nameField: keyof T;
    valueField: keyof T;
}
export declare class DropDown<T> extends Control<HTMLSelectElement> {
    #private;
    constructor(params: DropDownParams<T>);
    get dataSource(): DataSource<T>;
    init(params: DropDownParams<T>): Promise<void>;
    private addOptionElement;
    private primaryKeyValue;
}
