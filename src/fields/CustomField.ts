/// <reference path="DataControlField.ts"/>
namespace wuzhui {

    export interface CustomFieldParams extends DataControlFieldParams {
        createHeaderCell?: () => GridViewCell,
        createFooterCell?: () => GridViewCell,
        createItemCell: (dataItem: any) => GridViewCell
    }

    export class CustomField extends DataControlField {
        constructor(params: CustomFieldParams) {
            super(params);
        }
        private params() {
            return <CustomFieldParams>this._params;
        }
        createHeaderCell(): GridViewCell {
            if (this.params().createHeaderCell) {
                let cell = this.params().createHeaderCell();
                cell.style(this.headerStyle);
                return cell;
            }

            return super.createHeaderCell();
        }
        createFooterCell(): GridViewCell {
            if (this.params().createFooterCell) {
                let cell = this.params().createFooterCell();
                cell.style(this.params().footerStyle);
                return cell;
            }

            return super.createFooterCell();
        }
        createItemCell(dataItem: any): GridViewCell {
            if (this.params().createItemCell) {
                let cell = this.params().createItemCell(dataItem);
                cell.style(this.params().itemStyle);
                return cell;
            }

            return super.createItemCell(dataItem);
        }
    }
}