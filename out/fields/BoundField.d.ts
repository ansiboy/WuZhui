/// <reference path="DataControlField.d.ts" />
import { DataControlFieldParams, DataControlField, GridViewCell } from "./DataControlField";
export interface BoundFieldParams<T> extends DataControlFieldParams {
    dataField: keyof T;
    dataFormatString?: string;
    controlStyle?: Partial<CSSStyleDeclaration> | string;
    nullText?: string;
    readOnly?: boolean;
    valueType?: ValueType;
}
export declare type ValueType = 'number' | 'date' | 'string' | 'boolean';
export declare class BoundField<T> extends DataControlField<T, BoundFieldParams<T>> {
    /**
     * Gets the caption displayed for a field when the field's value is null.
     */
    get nullText(): string;
    createItemCell(dataItem: T): GridViewCell;
    /**
     * Gets the field for the value.
     */
    get dataField(): keyof T;
    /**
     * Gets the string that specifies the display format for the value of the field.
     */
    get dataFormatString(): string;
    get controlStyle(): string | Partial<CSSStyleDeclaration>;
    get readOnly(): boolean;
    createControl(): GridViewCellControl;
}
export interface GridViewCellControl {
    element: HTMLElement;
    value: any;
}
