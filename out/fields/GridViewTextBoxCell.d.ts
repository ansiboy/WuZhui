import { GridViewEditableCell } from "./GridViewEditableCell";
import { BoundField, ValueType } from "./BoundField";
export declare class GridViewTextBoxCell<T> extends GridViewEditableCell<T> {
    private _valueType;
    constructor(field: BoundField<T>, dataItem: any, valueType?: ValueType);
    createControl(value: any): HTMLElement;
    readonly controlValue: string | number | Date;
}
