/// <reference path="DataControlField.d.ts" />
import { GridViewCell, DataControlField, DataControlFieldParams } from "./DataControlField";
export interface CommandFieldParams extends DataControlFieldParams {
    showEditButton?: boolean;
    showNewButton?: boolean;
    showDeleteButton?: boolean;
    cancelButtonHTML?: string;
    deleteButtonHTML?: string;
    editButtonHTML?: string;
    newButtonHTML?: string;
    updateButtonHTML?: string;
    insertButtonHTML?: string;
    cancelButtonClass?: string;
    deleteButtonClass?: string;
    editButtonClass?: string;
    newButtonClass?: string;
    updateButtonClass?: string;
    insertButtonClass?: string;
}
export declare class CommandField<T> extends DataControlField<T, CommandFieldParams> {
    constructor(params?: CommandFieldParams);
    readonly cancelButtonHTML: string;
    readonly deleteButtonHTML: string;
    readonly editButtonHTML: string;
    readonly updateButtonHTML: string;
    readonly newButtonHTML: string;
    readonly insertButtonHTML: string;
    readonly cancelButtonClass: string;
    readonly deleteButtonClass: string;
    readonly editButtonClass: string;
    readonly newButtonClass: string;
    readonly updateButtonClass: string;
    readonly insertButtonClass: string;
    createItemCell(dataItem: any): GridViewCell;
    private showReadStatusButtons;
    private createEditButton;
    private createDeleteButton;
    private createInsertButton;
    private createUpdateButton;
    private createCancelButton;
    private createNewButton;
    private hideButton;
    private showButton;
    private findParentCell;
    private on_editButtonClick;
    private on_cancelButtonClick;
    private on_insertOrUpdateButtonClick;
    private on_deleteButtonClick;
    private on_newButtonClick;
}
