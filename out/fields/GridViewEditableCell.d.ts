import { GridViewDataCell } from "./DataControlField";
import { BoundField, GridViewCellControl } from "./BoundField";
export declare class GridViewEditableCell<T> extends GridViewDataCell<T> {
    private _dataItem;
    private _field;
    private _mode;
    control: GridViewCellControl;
    constructor(field: BoundField<T>, dataItem: T);
    readonly dataItem: T;
    readonly field: BoundField<T>;
    readonly mode: "read" | "edit";
    beginEdit(): void;
    endEdit(): void;
    cancelEdit(): void;
    render(dataItem: T): void;
    createControl(): HTMLElement;
    readonly controlValue: any;
}
