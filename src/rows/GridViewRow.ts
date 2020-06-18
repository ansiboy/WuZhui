import { Control } from "../Control";
import { GridView } from "../GridView";
import { GridViewRowType } from "./GridViewRowType";
import { GridViewCell } from "../cells/index";

export class GridViewRow extends Control<HTMLElement> {
    private _rowType: GridViewRowType;
    private _gridView: GridView<any>;

    constructor(rowType: GridViewRowType, rowElement: HTMLElement) {
        // let element = document.createElement('tr');
        super(rowElement);
        this._rowType = rowType;
    }

    get rowType(): GridViewRowType {
        return this._rowType;
    }

    get gridView(): GridView<any> {
        if (this._gridView == null) {
            let gridViewElement = findParentElement(this.element, 'table');
            console.assert(gridViewElement != null);
            this._gridView = <GridView<any>>Control.getControlByElement(gridViewElement);
            console.assert(this._gridView != null);
        }
        return this._gridView;
    }

    get cells(): GridViewCell[] {
        let cells = new Array<GridViewCell>();
        for (let i = 0; i < this.element.children.length; i++) {
            let cell = Control.getControlByElement(this.element.children[i] as HTMLElement) as GridViewCell;
            console.assert(cell != null);
            cells[i] = cell;
        }
        return cells;
    }
}

function findParentElement(element: HTMLElement, parentTagName: string) {
    console.assert(element != null);
    console.assert(parentTagName != null);
    parentTagName = parentTagName.toUpperCase();
    let p = element.parentElement;
    while (p) {
        if (p.tagName == parentTagName)
            return p;

        p = p.parentElement;
    }
}
