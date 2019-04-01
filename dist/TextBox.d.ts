import { Control } from "./Control";
export declare type TextBoxArguments<T> = {
    element: HTMLInputElement;
    dataField: keyof T;
    dataItem: T;
    valueType: 'string' | 'int' | 'float';
};
export declare class TextBox<T> extends Control<HTMLInputElement> {
    constructor(params: TextBoxArguments<T>);
}
