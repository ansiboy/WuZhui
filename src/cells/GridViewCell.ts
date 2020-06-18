import { Control } from "../Control";

export class GridViewCell extends Control<HTMLElement> {

    constructor(element: HTMLElement) {
        super(element);
    }
}

export interface GridViewCellControl {
    element: HTMLElement
    value: any
    // valueType?: ValueType
}


