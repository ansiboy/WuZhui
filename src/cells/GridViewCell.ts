import { Control } from "../Control";

export class GridViewCell extends Control<HTMLElement> {

    constructor(element: HTMLElement = document.createElement('td')) {
        super(element);
    }
}

export interface GridViewCellControl {
    element: HTMLElement
    value: any
    // valueType?: ValueType
}


