import { DataControlField } from "./DataControlField";
export class CustomField extends DataControlField {
    createHeaderCell() {
        if (this.params.createHeaderCell) {
            let cell = this.params.createHeaderCell();
            cell.style(this.headerStyle);
            return cell;
        }
        return super.createHeaderCell();
    }
    createFooterCell() {
        if (this.params.createFooterCell) {
            let cell = this.params.createFooterCell();
            cell.style(this.params.footerStyle);
            return cell;
        }
        return super.createFooterCell();
    }
    createItemCell(dataItem) {
        if (this.params.createItemCell) {
            let cell = this.params.createItemCell.apply(this, [dataItem]);
            cell.style(this.params.itemStyle);
            return cell;
        }
        return super.createItemCell(dataItem);
    }
}
