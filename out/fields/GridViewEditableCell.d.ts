import { GridViewDataCell } from "./DataControlField";
import { BoundField, GridViewCellControl } from "./BoundField";
export declare class GridViewEditableCell<T> extends GridViewDataCell<T> {
    private _dataItem;
    private _field;
    private _mode;
    control: GridViewCellControl;
    constructor(field: BoundField<T>, dataItem: T);
    get dataItem(): T;
    get field(): BoundField<T>;
    get mode(): "read" | "edit";
    beginEdit(): void;
    endEdit(): void;
    cancelEdit(): void;
    render(dataItem: T): void;
    createControl(): HTMLElement;
    get controlValue(): any;
}
