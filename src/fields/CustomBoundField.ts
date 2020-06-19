import { BoundField, BoundFieldParams } from "./BoundField";
import { GridViewEditableCell } from "./GridViewEditableCell";

export interface CustomBoundFieldParams<T> extends BoundFieldParams<T> {
    cellRender?: (dataItem: T, element: HTMLElement) => void
}

export class CustomBoundField<T> extends BoundField<T> {
    constructor(params: CustomBoundFieldParams<T>) {
        super(params);
    }

    createItemCell(dataItem: T, cellElement: HTMLElement) {
        let cell = super.createItemCell(dataItem, cellElement) as GridViewEditableCell<T>;
        let cellRender = cell.render;

        cell.render = function (dataItem) {
            let it = this as typeof cell;
            let params = (it.field as CustomBoundField<T>).params as CustomBoundFieldParams<T>;
            if (it.mode == "read" && params.cellRender != null) {
                params.cellRender.apply(cell, [dataItem, it.element]);
                return;
            }

            cellRender.apply(cell, [dataItem]);
        }
        return cell;
    }
}