import { Control } from "../Control";
import { CellType } from "../types";

export class GridViewCell extends Control<HTMLElement> {
    type: CellType;
    constructor(element: HTMLElement, type: CellType = "GridViewCell") {
        super(element);

        this.type = type;
    }
}

export interface GridViewCellControl {
    element: HTMLElement
    value: any
    // valueType?: ValueType
}


