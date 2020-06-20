import { Control } from "../Control";
import { GridView } from "../GridView";
import { GridViewRowType } from "./GridViewRowType";
import { GridViewCell } from "../cells/index";
import { Errors } from "../Errors";

export class GridViewRow extends Control<HTMLElement> {
    #rowType: GridViewRowType;
    #gridView: GridView<any>;

    constructor(rowType: GridViewRowType, rowElement: HTMLElement, gridView: GridView<any>) {
        super(rowElement);

        if (gridView == null)
            throw Errors.argumentNull("gridView");

        this.#gridView = gridView;
        this.#rowType = rowType;
    }

    get rowType(): GridViewRowType {
        return this.#rowType;
    }

    get gridView(): GridView<any> {
        return this.#gridView;
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

// function findParentElement(element: HTMLElement, parentTagName: string) {
//     console.assert(element != null);
//     console.assert(parentTagName != null);
//     parentTagName = parentTagName.toUpperCase();
//     let p = element.parentElement;
//     while (p) {
//         if (p.tagName == parentTagName)
//             return p;

//         p = p.parentElement;
//     }
// }
