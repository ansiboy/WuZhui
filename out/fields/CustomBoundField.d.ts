import { BoundField, BoundFieldParams } from "./BoundField";
import { GridViewEditableCell } from "./GridViewEditableCell";
export interface CustomBoundFieldParams<T> extends BoundFieldParams<T> {
    cellRender?: (dataItem: T, element: HTMLElement) => void;
}
export declare class CustomBoundField<T> extends BoundField<T> {
    constructor(params: CustomBoundFieldParams<T>);
    createItemCell(dataItem: T): GridViewEditableCell<T>;
}
