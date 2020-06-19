import { GridViewCell } from "./GridViewCell";
import { DataControlField } from "../fields/DataControlField";

export class GridViewCommandCell<T> extends GridViewCell {
    cacelButton: HTMLElement;
    deleteButton: HTMLElement;
    editButton: HTMLElement;
    newButton: HTMLElement;
    updateButton: HTMLElement;
    insertButton: HTMLElement;

    constructor(field: DataControlField<T>, cellElement: HTMLElement) {
        super(cellElement, "GridViewCommandCell")
    }
}