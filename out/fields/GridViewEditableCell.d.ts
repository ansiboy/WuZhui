import { GridViewDataCell } from "./DataControlField";
import { BoundField } from "./BoundField";
export declare abstract class GridViewEditableCell<T> extends GridViewDataCell<T> {
    private _dataItem;
    private _field;
    private _mode;
    constructor(field: BoundField<T>, dataItem: any);
    readonly field: BoundField<T>;
    readonly mode: "read" | "edit";
    beginEdit(): void;
    endEdit(): void;
    cancelEdit(): void;
    render(dataItem: T): void;
    abstract createControl(value: any): HTMLElement;
    abstract readonly controlValue: any;
}
