import { DataSource } from "maishu-toolkit";
import { Control } from "./Control";
export interface DropDownParams<T> {
    dataSource: DataSource<T>;
    element: HTMLSelectElement;
    nameField?: keyof T;
    valueField?: keyof T;
}
export declare class DropDown<T> extends Control<HTMLSelectElement> {
    constructor(params: DropDownParams<T>);
    init<T>(params: DropDownParams<T>): Promise<void>;
}
