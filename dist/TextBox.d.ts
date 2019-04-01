import { Control } from "./Control";
export declare class TextBox<T> extends Control<HTMLInputElement> {
    constructor(params: {
        element: HTMLInputElement;
        dataField: keyof T;
        dataItem: T;
        valueType: 'string' | 'int' | 'float';
    });
}
