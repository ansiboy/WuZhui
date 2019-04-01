import { GridViewCell, DataControlFieldParams, DataControlField } from "./DataControlField";
export interface CustomFieldParams extends DataControlFieldParams {
    createHeaderCell?: () => GridViewCell;
    createFooterCell?: () => GridViewCell;
    createItemCell: (dataItem: any) => GridViewCell;
}
export declare class CustomField<T> extends DataControlField<T> {
    constructor(params: CustomFieldParams);
    private params;
    createHeaderCell(): GridViewCell;
    createFooterCell(): GridViewCell;
    createItemCell(dataItem: any): GridViewCell;
}
