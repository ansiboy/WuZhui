import { GridViewCell, DataControlFieldParams, DataControlField } from "./DataControlField";
export interface CustomFieldParams<T> extends DataControlFieldParams {
    createHeaderCell?: () => GridViewCell;
    createFooterCell?: () => GridViewCell;
    createItemCell: (dataItem: T) => GridViewCell;
}
export declare class CustomField<T> extends DataControlField<T, CustomFieldParams<T>> {
    createHeaderCell(): GridViewCell;
    createFooterCell(): GridViewCell;
    createItemCell(dataItem: any): GridViewCell;
}
