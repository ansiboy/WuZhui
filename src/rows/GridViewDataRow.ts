import { GridViewRow } from "./GridViewRow";
import { GridView } from "../GridView";
import { GridViewRowType } from "./GridViewRowType";

export class GridViewDataRow extends GridViewRow {
    private _dataItem: any;

    constructor(gridView: GridView<any>, dataItem: any, rowElement: HTMLElement) {
        super(GridViewRowType.Data, rowElement, gridView);
        this._dataItem = dataItem;
        for (var i = 0; i < gridView.columns.length; i++) {
            var column = gridView.columns[i];
            var cell = column.createItemCell(dataItem, this.gridView.elementProvider.createCellElement("body"));
            cell.visible = column.visible;

            this.appendChild(cell);
        }
    }

    get dataItem() {
        return this._dataItem;
    }
}
