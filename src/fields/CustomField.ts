import { GridViewCell, DataControlFieldParams, DataControlField } from "./DataControlField";

export interface CustomFieldParams<T> extends DataControlFieldParams {
    createHeaderCell?: () => GridViewCell,
    createFooterCell?: () => GridViewCell,
    createItemCell: (dataItem: T) => GridViewCell
}

export class CustomField<T> extends DataControlField<T, CustomFieldParams<T>> {
    createHeaderCell(): GridViewCell {
        if (this.params.createHeaderCell) {
            let cell = this.params.createHeaderCell();
            cell.style(this.headerStyle);
            return cell;
        }

        return super.createHeaderCell();
    }
    createFooterCell(): GridViewCell {
        if (this.params.createFooterCell) {
            let cell = this.params.createFooterCell();
            if (this.params.footerStyle)
                cell.style(this.params.footerStyle);
                
            return cell;
        }

        return super.createFooterCell();
    }
    createItemCell(dataItem: any): GridViewCell {
        if (this.params.createItemCell) {
            let cell = this.params.createItemCell.apply(this, [dataItem]);
            cell.style(this.params.itemStyle);
            return cell;
        }

        return super.createItemCell(dataItem);
    }
}