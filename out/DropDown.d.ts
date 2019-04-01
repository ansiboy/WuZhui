import { DataSource } from "./DataSource";
import { Control } from "./Control";
export interface DropDownArguments<T> {
    dataSource: DataSource<T>;
    element: HTMLSelectElement;
    nameField?: keyof T;
    valueField?: keyof T;
}
export declare class DropDown<T> extends Control<HTMLSelectElement> {
    constructor(params: DropDownArguments<T>);
    init<T>(params: DropDownArguments<T>): Promise<void>;
}
