/// <reference path="DataControlField.d.ts" />
import { GridViewDataCell, DataControlFieldParams, DataControlField, GridViewCell } from "./DataControlField";
export declare type ValueType = 'number' | 'date' | 'string' | 'boolean';
export declare class GridViewEditableCell<T> extends GridViewDataCell<T> {
    private _dataItem;
    private _valueType;
    private _field;
    private _mode;
    constructor(field: BoundField<T>, dataItem: any, valueType?: ValueType);
    readonly field: BoundField<T>;
    readonly mode: "read" | "edit";
    beginEdit(): void;
    endEdit(): void;
    cancelEdit(): void;
    render(dataItem: T): void;
    readonly controlValue: string | number | Date;
}
export interface BoundFieldParams<T> extends DataControlFieldParams {
    dataField: keyof T;
    dataFormatString?: string;
    controlStyle?: CSSStyleDeclaration | string;
    nullText?: string;
    readOnly?: boolean;
}
export declare class BoundField<T> extends DataControlField<T> {
    private _valueElement;
    constructor(params: BoundFieldParams<T>);
    private params;
    /**
     * Gets the caption displayed for a field when the field's value is null.
     */
    readonly nullText: string;
    createItemCell(dataItem: T): GridViewCell;
    /**
     * Gets the field for the value.
     */
    readonly dataField: keyof T;
    /**
     * Gets the string that specifies the display format for the value of the field.
     */
    readonly dataFormatString: string;
    readonly controlStyle: string | CSSStyleDeclaration;
    readonly readOnly: boolean;
}
