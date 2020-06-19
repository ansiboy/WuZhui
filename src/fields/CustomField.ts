import { DataControlFieldParams, DataControlField } from "./DataControlField";
import { GridViewCell } from "../cells/index";

export interface CustomFieldParams<T> extends DataControlFieldParams {
    createHeaderCell?: (cellElement: HTMLElement) => GridViewCell,
    createFooterCell?: (cellElement: HTMLElement) => GridViewCell,
    createItemCell: (dataItem: T, cellElement: HTMLElement) => GridViewCell
}

export class CustomField<T> extends DataControlField<T, CustomFieldParams<T>> {
    createHeaderCell(cellElement: HTMLElement): GridViewCell {
        if (this.params.createHeaderCell) {
            let cell = this.params.createHeaderCell(cellElement);
            cell.style(this.headerStyle);
            return cell;
        }
        return super.createHeaderCell(cellElement);
    }
    createFooterCell(cellElement: HTMLElement): GridViewCell {
        if (this.params.createFooterCell) {
            let cell = this.params.createFooterCell(cellElement);
            if (this.params.footerStyle)
                cell.style(this.params.footerStyle);

            return cell;
        }

        return super.createFooterCell(cellElement);
    }
    createItemCell(dataItem: any, cellElement: HTMLElement): GridViewCell {
        if (this.params.createItemCell) {
            let cell = this.params.createItemCell.apply(this, [dataItem, cellElement]);
            cell.style(this.params.itemStyle);
            return cell;
        }

        return super.createItemCell(dataItem, cellElement);
    }
}