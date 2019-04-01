import { Control } from "./Control";
export declare type TextBoxParams<T> = {
    element: HTMLInputElement;
    dataField: keyof T;
    dataItem: T;
    valueType: 'string' | 'int' | 'float';
};
export declare class TextBox<T> extends Control<HTMLInputElement> {
    constructor(params: TextBoxParams<T>);
}
